//引入vue
import Vue from 'vue';
// 引入插件
import VueRouter from 'vue-router';
// 导入路由数组
import routes from './routes'
// 引入store
import store from '@/store'
// 使用插件
Vue.use(VueRouter);
// 重写push和replace方法
// 第一步：保存VueRouter原型对象的push原汁原味的方法（因为我们不可能完全自己写出来这个方法，只是在人家的方法基础上一些改动）
let originPush = VueRouter.prototype.push;
//操作push
VueRouter.prototype.push = function (location, resolve, reject) {
    //如果用户处理成功或者失败的参数都传递了，那就使用人家的方法。
    if (resolve && reject) {
        //这里的call以及this可以理解为借用别人的方法(originPush以及属于window了)来处理自己家里的事情(this)
        originPush.call(this, location, resolve, reject);
    } else {
        //如果用户并没有传递resolve和 reject函数，那就用我指定的两个函数吧
        originPush.call(this, location, () => { }, () => { });
    }
}
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(location, () => { }, () => { })
    }
}

//创建VueRouter实例对象router
let router = new VueRouter({
    routes: routes,
    // 切换至新路由时控制滚动行为
    // x表示水平滚动条所在的位置
    // y表示垂直滚动条所在的位置
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})
// 全局前置守卫
router.beforeEach(async (to, from, next) => {
    // 获取仓库中的token，根据token的状态区分用户登录与否
    let token = store.state.user.token
    // 获取仓库中的用户名
    let name = store.state.user.userInfo.name
    // 用户处于登录状态
    if (token) {
        // 已经登陆了，访问的是登陆路由和注册路由
        if (to.path === "/login" || to.path === '/register') {
            next('/')
        } else {
            // 已经登陆了，访问的不是登陆路由和注册路由
            if (name) {
                // 如果有用户信息
                next();
            } else {
                // 没有用户信息
                try {
                    // 获取用户信息
                    await store.dispatch('getUserInfo')
                    // 放行
                    next()
                } catch (error) {
                    //token失效,那就清除一切信息，即与未登录没有区别，使其回到未登录的状态
                    await store.dispatch('userLogout')
                    // 放行至登陆路由
                    next('/login')
                }

            }
        }
    } else {
        // 用户处于未登录状态
        // 未登录：不能去与交易相关的页面和支付相关的以及个人中心
        let toPath = to.path;
        // 去往我们禁令去去往的地方
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            // 强制将其丢至登陆页面
            next('/login?redirect=' + toPath);
        } else {
            // 那就是去往我们允许其去往的地方
            next();
        }

        next()
    }
})
// 全局后置守卫
router.afterEach((to, from, next) => {

})

// 暴露router
export default router
