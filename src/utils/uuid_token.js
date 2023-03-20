import { v4 as uuidv4 } from 'uuid';
// 首先要生成一个随机字符串,且每次执行不能发生变化,游客身份要持久存储
export const getUUID = () => {
    // 首先获取本地存储是否含有UUID
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    // 本地存储没有此内容
    if (!uuid_token) {
        // 生成uuidtoken字符串
        uuid_token = uuidv4()
        // 存入本地存储
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    // 导出此uuidtoken字符串
    return uuid_token
}
// 此行为成为单例行为.何为单例:本质上只为你生成了一个uuidtoken字符串用于标识你的身份