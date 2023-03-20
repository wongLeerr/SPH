// 此文件专门用于建立路由与组件的对应关系（即建立key-value关系）
//引入路由组件
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'
// 路由懒加载的组件函数(可以简写到路由内)
// const foo = () => {
//     // 动态加载一个组件
//     console.log(111);
//     return import('@/pages/Home')
// }
// 将路由数组暴露,供index模块注册信息
export default [
    {
        path: '/home',
        // 路由懒加载(这意味着无需直接将组件引入，下面的这种动态引入方式即可)
        component: () => import('@/pages/Home'),
        meta: {
            show: true
        }
    },
    {
        path: '/register',
        component: Register,
        meta: {
            show: false
        }
    },
    {
        path: "/search/:keyword?",
        component: Search,
        name: 'search',
        meta: {
            show: true
        }
    },
    {
        path: '/login',
        component: Login,
        meta: {
            show: false
        }
    },
    {
        path: '/detail/:skuId',
        component: Detail,
        meta: {
            show: true
        }
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: AddCartSuccess,
        meta: {
            show: true
        }
    },
    {
        path: '/shopcart',
        name: 'shopcart',
        component: ShopCart,
        meta: {
            show: true
        }
    },
    {
        path: '/trade',
        name: 'trade',
        component: Trade,
        meta: {
            show: true
        },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 从购物车跳到交易页面
            if (from.path == '/shopcart') {
                next();
            } else {
                // 原路返回，即从哪来滚到哪里去
                next(false)
            }
        }
    },
    {
        path: '/pay',
        name: 'pay',
        component: Pay,
        meta: {
            show: true
        },
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/paysuccess',
        name: 'paysuccess',
        component: PaySuccess,
        meta: {
            show: true
        }
    },
    {
        path: '/center',
        name: 'center',
        component: Center,
        meta: {
            show: true
        },
        children: [
            {
                path: 'myorder',
                name: 'myorder',
                component: MyOrder
            },
            {
                path: 'grouporder',
                name: 'grouporder',
                component: GroupOrder
            },
            // 重定向，当访问/center时，定位到/center/myorder
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },

    // 重定向，在项目跑起来的时候，访问/，立马让它定向到首页
    {
        path: '*',
        redirect: '/home'
    }

]