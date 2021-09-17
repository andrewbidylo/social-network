import { ApiResponseType, ResultCodeEnum } from "../API/api"
import { usersAPI } from "../API/users-api"
import { follow, actions, unfollow } from "./../redux/usersPageReducer"


jest.mock("../API/users-api")
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const result:ApiResponseType = {
    resultCode: ResultCodeEnum.Success,
    messages: [],
    data: {}
}
const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    usersAPIMock.follow.mockClear()
    usersAPIMock.unfollow.mockClear()
    
})

test('follow thunk success', async () => {
    usersAPIMock.follow.mockReturnValue(Promise.resolve(result))
    const thunk = follow(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3  )
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingInProgress(true, 1))

})

test('unfollow thunk success', async () => {
    usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result))
    const thunk = unfollow(1)
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingInProgress(true, 1))
})