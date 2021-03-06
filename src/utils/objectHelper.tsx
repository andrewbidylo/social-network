export const updateUsersInArray = (items:any, itemsId:any, objPropName:any, newObjProps:any) => {
    return items.map((u:any) => {
        if (u[objPropName] === itemsId) {
            return { ...u, ...newObjProps }
        }
        return u
    })
}