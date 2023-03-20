// shopcart小仓库
import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from '@/api'
const actions = {
    // 获取购物车数据
    async getCartList({ commit }) {
        let result = await reqCartList();
        if (result.code === 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    // 删除购物车某一商品
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'));
        }
    },
    // 切换商品的选中状态 (注意这里使用解构对象的方法得到两个属性，意味着那边调用这个函数也得传递一个对象)
    // acition函数第一个参数必定是commit占位
    async UpdateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 删除选中的商品
    deleteAllCheckedCart({ dispatch, getters }) {
        // context里面的内容非常多，不仅有commit还有dispatch、state、getters
        // 这里只需要context中的dispatch和getters
        // getters.cartList.cartInfoList是购物车产品的数组
        // 盛装所有promise对象的数组
        let promises = []
        getters.cartList.cartInfoList.forEach((item) => {
            if (item.isChecked === 1) {
                // 将每次返回的promise对象都放到数组当中
                let promise = dispatch('deleteCartListBySkuId', item.skuId)
                promises.push(promise)
            }
        })
        // 返回一个promise对象，如果promises数组中所有promise对象都为真则返回真，否则返回假
        return Promise.all(promises)
    },
    // 全选按钮的点击操作
    updateAllCheckedCartOperation({ dispatch, getters }, isChecked) {
        // promises用于存放全部选中或者全部不选中的promise结果
        let promises = []
        getters.cartList.cartInfoList.forEach((item) => {
            let promise = dispatch('UpdateCheckedById', { skuId: item.skuId, isChecked: isChecked })
            promises.push(promise)
        })
        return Promise.all(promises)


    }


}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const state = {
    cartList: []
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }
}
export default {
    actions,
    mutations,
    state,
    getters
}