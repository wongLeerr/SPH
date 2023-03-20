// 对axios进行二次封装
// 导入axios
import axios from "axios"
// 导入nprogress
import nprogress from "nprogress"
// 导入nprogress的样式
import "nprogress/nprogress.css"
// 创建axios实例 （可以认为requests就是axios，使用axios不就是为了发请求吗）
const requests = axios.create({
    // 基础路径（自动添加此前缀路径）
    baseURL: '/mock',
    // 超时时间
    timeout: 5000
})

// 设置请求拦截器（发出请求之前做的事情）
requests.interceptors.request.use((config) => {
    // config配置对象，我们经常使用里面的属性Headers请求头
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
    return Promise.reject(new Error('fail!!!'))//终止promise链
})

// 导出axios实例
export default requests