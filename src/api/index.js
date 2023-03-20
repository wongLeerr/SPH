// API接口统一管理文件 （可以认为此文件就是专门向外发请求的）
// 导入二次封装好的axios，当然它叫做requests（axios的实例对象）
import requests from "./request";
// 导入二次封装好的mock数据专用的axios
import mockRequests from './mockAjax'

// 三级联动的接口 (将这个请求函数暴露出去，方便其他地方发请求时直接调用此方法，且此方法应有返回值，
// 返回该函数的调用者，注意返回值是promise对象)
export const reqCategoryList = () => {
    return requests({
        // 请求的url地址
        url: '/product/getBaseCategoryList',
        // 请求类型
        method: 'get'
    })
}
// 请求mock数据的函数
// 获取banner数据
export const reqGetBannerList = () => {
    return mockRequests({
        // 请求的url地址
        url: '/banner',
        // 请求类型
        methods: 'get'
    })
}
// 获取floor数据
export const reqFloorList = () => {
    return mockRequests({
        // 请求的url地址
        url: '/floor',
        // 请求类型
        methods: 'get'
    })
}
// 获取search模块数据
// 注意：params至少是一个空对象，不能什么都不传，也不要传递其他的数据类型
export const reqGetSearchInfo = (params) => {
    return requests({
        url: '/list',
        method: 'post',
        data: params
    })
}
// 获取商品详情
export const reqGoodsInfo = (skuId) => {
    return requests({
        url: `/item/${skuId}`,
        method: 'get'
    })
}
// 向购物车中添加订单或者在购物车中修改商品的数量 URL:/api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
    return requests({
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        method: 'post'
    })
}
// 获取购物车列表数据   url:  /api/cart/cartList
export const reqCartList = () => {
    return requests({
        url: '/cart/cartList',
        method: 'get'
    })
}
// 删除购物车中某一产品的接口 url:/api/cart/deleteCart/{skuId} method:delete
export const reqDeleteCartById = (skuId) => {
    return requests({    //注意一定要将requests函数调用的结果返回出去
        url: `/cart/deleteCart/${skuId}`,
        method: 'delete'
    });
}
// 切换某一商品的选中状态  URL：/api/cart/checkCart/{skuID}/{isChecked}
export const reqUpdateCheckedById = (skuId, isChecked) => {
    return requests({
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        method: 'get'
    })
}
// 获取验证码  URL：/api/user/passport/sendCode/{phone} get
export const reqGetCode = (phone) => {
    return requests({
        url: `/user/passport/sendCode/${phone}`,
        method: 'get'
    })
}
// 用户注册接口 url:/api/user/passport/register post phone password code
export const reqUserRegister = (data) => {
    return requests({
        url: '/user/passport/register',
        method: 'post',
        data: data
    })
}
// 用户登录接口 URL：/api/user/passport/login phone password method:post
export const reqUserLogin = (data) => {
    return requests({
        url: '/user/passport/login',
        method: 'post',
        data: data
    })
}
// 获取用户信息（需要带着用户的token向服务器要用户的信息）URL:/api/user/passport/auth/getUserInfo 
export const reqUserInfo = () => {
    return requests({
        url: '/user/passport/auth/getUserInfo',
        method: 'get'
    })
}
// 退出登录 url：/api/user/passport/logout 
export const reqLogout = () => {
    return requests({
        url: '/user/passport/logout',
        method: 'get'
    })
}
// 获取用户地址信息 url：/api/user/userAddress/auth/findUserAddressList method：get
export const reqAddressInfo = () => {
    return requests({
        url: '/user/userAddress/auth/findUserAddressList',
        method: 'get'
    })
}
// 获取用户的商品清单
export const reqOrderInfo = () => {
    return requests({
        url: '/order/auth/trade',
        method: 'get'
    })
}
// 提交订单 url：/api/order/auth/submitOrder?tradeNo={tradeNo} method：post
export const reqSubmitOrder = (tradeNo, data) => {
    return requests({
        url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method: 'post',
        data: data
    })
}
// 获取支付信息  url：/api/payment/weixin/createNative/{orderId} method：get
export const reqPayInfo = (orderId) => {
    return requests({
        url: `/payment/weixin/createNative/${orderId}`,
        method: 'get'
    })
}
// 获取支付信息 url:/api/payment/weixin/createNative/{orderId} method:get
export const reqPayStatus = (orderId) => {
    return requests({
        url: `/payment/weixin/createNative/${orderId}`,
        method: 'get'
    })
}
//获取我的订单数据 url：/api/order/auth/{page}/{limit} method:get
export const reqMyOrderList = (page, limit) => {
    return requests({
        url: `/order/auth/${page}/${limit}`,
        method: 'get'
    })
}




