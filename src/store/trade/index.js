import { reqAddressInfo, reqOrderInfo } from "@/api"

const actions = {
    // 获取用户地址信息
    async getUserAddress({ commit }) {
        let result = await reqAddressInfo();
        if (result.code == 200) {
            commit('GETUSERADDRESS', result.data)
        }
    },
    // 获取用户订单信息
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo();
        if (result.code == 200) {
            commit('GETORDERINFO', result.data);
        }
    }
}
const mutations = {
    // 获取用户地址信息
    GETUSERADDRESS(state, address) {
        state.address = address
    },
    // 获取用户订单信息
    GETORDERINFO(state, order) {
        state.order = order
    }
}
const state = {
    // 用户地址信息
    address: [],
    // 用户订单信息
    order: {}
}
const getters = {}
export default {
    actions,
    mutations,
    state,
    getters
}