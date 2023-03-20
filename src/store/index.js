// 导入vue
import Vue from 'vue'
// 导入vuex
import Vuex from 'vuex'
// 使用插件
Vue.use(Vuex)
// 导入小仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'
// 创建并导出仓库实例
export default new Vuex.Store({
    // 模块化开发,注册小仓库
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})