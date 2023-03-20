// 导入mockjs插件
import Mock from "mockjs";
// 引入JSON数据
import banner from './banner.json'
import floor from './floor.json'
// mock数据
// Mock对象的mock方法，第一个参数请求的地址，第二个参数请求的数据 
// 模拟banner数据
Mock.mock("/mock/banner", {
    code: 200,
    data: banner
})
// 模拟floor数据
Mock.mock("/mock/floor", {
    code: 200,
    data: floor
})