// search模块小仓库
// 麻雀虽小五脏俱全
import { reqGetSearchInfo } from "@/api/index"
const actions = {

    async getSearchList({ commit }, params) {
        // 当前这个reqGetSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
        // params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params)
        if (result.code === 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
}
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}
const state = {
    searchList: {}
}
// 计算属性，为简化数据而生
const getters = {
    // 为什么返回时的数据后面要加一个空数组，这是因为在某些情况下searchList可能没有获取到服务器的数据，
    // 这样的话searchList就是空对象，空对象里面的goodsList就是undefined，这样组件中在遍历goodsList时
    // 就会出现问题，可能会导致项目中断，因此必须考虑这种情况，如果search中无数据，则直接给其空数组。
    goodsList(state) {
        return state.searchList.goodsList || [];
    },
    attrsList(state) {
        return state.searchList.attrsList || [];
    },
    trademarkList(state) {
        return state.searchList.trademarkList || [];
    },

}
// 导出小仓库
export default {
    actions,
    mutations,
    state,
    getters
}