// 对axios进行二次封装
// 导入axios
import axios from "axios"
// 导入nprogress
import nprogress from "nprogress"
// 导入nprogress的样式
import "nprogress/nprogress.css"
// 导入store仓库
import store from '@/store'
// 创建axios实例 （可以认为requests就是axios，使用axios不就是为了发请求吗）
const requests = axios.create({
    // 基础路径（自动添加此前缀路径）
    baseURL: '/api',
    // 超时时间
    timeout: 5000
})

// 设置请求拦截器（发出请求之前做的事情）
requests.interceptors.request.use((config) => {
    // config配置对象，我们经常使用里面的属性Headers请求头
    // 如果detail小仓库中的uuid_token有值
    if (store.state.detail.uuid_token) {
        // 设置请求头,注意userTempId这个请求头字段是跟后台处理一一对应的,不能乱写
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // 如果user小仓库中的token有值
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    }
    // 进度条启动
    nprogress.start()
    return config
})
// 设置响应拦截器 （收到响应之前做的事情）
requests.interceptors.response.use((res) => {
    // 服务器响应成功的回调函数
    // 进度条结束
    nprogress.done()
    return res.data
}, (err) => {
    // 服务器响应失败的回调函数
    return Promise.reject(new Error('fail!!!终止promise链--响应拦截器'))//终止promise链
})

// 导出axios实例
export default requests