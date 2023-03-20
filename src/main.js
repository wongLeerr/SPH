import Vue from 'vue'
import App from './App.vue'
//全局注册三级联动组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav);
// 全局注册轮播图组件
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name, Carousel)
// 全局注册分页器组件
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name, Pagination)
//引入路由
import router from './router'
// 导入vuex仓库store
import store from './store'
// 导入mockServe文件----模拟数据(让其中的js代码执行)
import "@/mock/mockServe"
// 引入Swiper样式
import "swiper/css/swiper.css"
// 统一引入api文件夹里面全部的请求函数
import * as API from '@/api'
// 引入ElementUI组件库
import { Button, MessageBox } from 'element-ui';
// 按需注册(注册全局组件)
Vue.component(Button.name, Button);
// elementUI 组件注册的另一种写法，还可以挂载至Vue原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入懒加载插件
import VueLazyLoad from 'vue-lazyload'
// 引入图片
import atm from '@/assets/aoteman1.png'
// 注册插件并配置
Vue.use(VueLazyLoad, {
  // 懒加载默认的图片
  loading: atm
});
// 调用表单验证的插件(内部已经使用插件，这里只需调用那个js文件让其执行一次即可)
import '@/plugins/validate'
new Vue({
  render: h => h(App),
  // 注册路由,写下这句话以后，路由组件身上都拥有了$route,$router属性
  router,
  // 注册仓库
  store,
  beforeCreate() {
    // 安装全局事件总线
    Vue.prototype.$bus = this
    // 在Vue原型身上追加一个对象$API（此对象身上含有api文件中全部的接口函数）
    Vue.prototype.$API = API
  }
}).$mount('#app')
