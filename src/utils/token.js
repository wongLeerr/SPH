// 封装本地存储token的函数
// 存储Token
export const setToken = (token) => {
    window.localStorage.setItem('TOKEN', token)
}
// 获取Token
export const getToken = () => {
    return window.localStorage.getItem('TOKEN')
}
// 清空本地存储的token字符串
export const removeToken = () => {
    localStorage.removeItem('TOKEN')
}