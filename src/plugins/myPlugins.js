// 封装自定义插件
// 插件必须暴露一个对象，且此对象身上必须要有install方法
let myPlugins = {};
// install方法什么时候调用，use的时候
// install方法有两个参数Vue和options（在main.js文件中Vue.use(插件,{xxx})）xxx的内容
myPlugins.install = function (Vue, options) {
    // 有了Vue构造函数，有了传入的配置对象，这里可以做任何想做的事情
    // Vue.prototype.$xxx:任意组件均可使用
    // Vue.directive:自定义指令
    // Vue.component全局注册组件
    // ......
    // 定义自定义指令即v-xxx，第一个参数是xxx，可以在Vue.use的第二个参数中指定传过来
    // 第二个参数是一个回调函数，此回调函数第一个参数是拿到v-xxx自定义指令作用的DOM元素，
    // obj中有很多数据，可以拿到v-xxx依赖的数据
    Vue.directive(options.name, (element, obj) => {

    })
}
// 暴露对象
export default myPlugins;