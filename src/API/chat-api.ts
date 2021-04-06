let ws: WebSocket | null = null
type eventNameType = 'messages-received' | 'status-changed'
let subscribers = {
    'messages-received': [] as MessagesReceivedSubscribersType[],
    'status-changed':[] as StatusChengedSubscribersType[]
}

// Reconnect 
const closeHandler = () => {
    notifySubscribersAboutStatus('pending')
    setTimeout(createChannel, 3000)
}
const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers["messages-received"].forEach(s => s(newMessages))
}
const openHandler = () => {
    notifySubscribersAboutStatus('ready')
}
const errorHandler = () => {
    notifySubscribersAboutStatus('error')
    console.error('Refresh page')
}

const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}

const notifySubscribersAboutStatus = (status: StatusType) => {
subscribers['status-changed'].forEach(s=>s(status))
}

// Create WebSocket channel and reconect if server doesn't answer  
function createChannel() {
    cleanUp ()

    ws?.close()

    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribersAboutStatus('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}

export const ChatAPI = {
    start () {
    createChannel()
    },
    stop () {
        subscribers ['messages-received'] = []
        subscribers ['status-changed'] = []
        cleanUp ()
        ws?.close()
        
    },
    subscribeOnNewMessages(eventName: eventNameType ,callback: MessagesReceivedSubscribersType | StatusChengedSubscribersType ) {
        // @ts-ignore
        subscribers[eventName].push(callback)
        return () => {
// @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribeFromNewMessages(eventName: eventNameType, callback: MessagesReceivedSubscribersType | StatusChengedSubscribersType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
  
    sendMessage(message: string) {
       ws?.send(message)
    }

}
export type StatusType = 'pending' | 'ready' | 'error'
export type MessagesReceivedSubscribersType = (messages: ChatMessageAPIType[]) => void
export type StatusChengedSubscribersType = (status: StatusType) => void
export type ChatMessageAPIType = {
    message: string
    photo: string
    userId: number
    userName: string
}