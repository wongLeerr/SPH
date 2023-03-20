// home模块小仓库
// 麻雀虽小五脏俱全
// 导入API接口统一管理文件(专门发请求的模块)
import { reqCategoryList, reqFloorList, reqGetBannerList } from '@/api/index'
const actions = {
    // 使用async和await,拿到的返回值即位promise成功状态的数据
    async categoryList({ commit }) {
        // 直接调用发请求的函数即可发出请求,返回一个promise对象
        let result = await reqCategoryList()
        if (result.code === 200) {
            commit('GETCATEGORYLIST', result.data)
        }
    },
    // 获取bannerList数据
    async getBannerList({ commit }) {
        let result = await reqGetBannerList()
        if (result.code === 200) {
            commit('GETBANNERLIST', result.data)
        }
    },
    // 获取floorList数据
    async getFloorList({ commit }) {
        let result = await reqFloorList()
        if (result.code === 200) {
            commit('GETFLOORLIST', result.data)
        }
    },
}
const mutations = {
    GETCATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    },
}
const state = {
    // state中的数据类型要根据服务器返回的数据类型赋予初始值
    categoryList: [],
    bannerList: [],
    floorList: [],
}
const getters = {}
// 导出小仓库
export default {
    actions,
    mutations,
    state,
    getters
}