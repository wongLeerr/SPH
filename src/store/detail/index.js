// detail模块小仓库
import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api"
// 导入封装的游客身份模块-----(生成一次,就不能再变了)
import { getUUID } from '@/utils/uuid_token'
const actions = {
    // 获取产品数据
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code === 200) {
            commit('GETGOODINFO', result.data)
        }
    },
    // 向购物车中添加订单或者在购物车中修改商品的数量
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        // 此函数（addOrUpdateShopCart）返回（返回到哪里了？派发此actions函数的地方）一个promise对象
        // 加入购物车成功
        if (result.code === 200) {
            return "ok"
        } else {
            // 加入购物车失败(抛出错误)
            return Promise.reject(new Error('fail'))
        }
    }
}
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
}
const state = {
    goodInfo: {},
    // 游客身份标识,通过请求头带走
    uuid_token: getUUID(),
}
const getters = {
    categoryView(state) {
        return state.goodInfo.categoryView || {};
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || [];
    }


}
// 导出小仓库
export default {
    actions,
    mutations,
    state,
    getters
}