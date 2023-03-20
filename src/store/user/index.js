// 用户模块小仓库 （包含注册与登录）
import { reqGetCode, reqUserInfo, reqUserLogin, reqUserRegister, reqLogout } from "@/api"
// 导入本地存储token的封装函数
import { setToken, getToken, removeToken } from "@/utils/token"
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code === 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 用户注册模块
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 用户登录模块
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        if (result.code == 200) {
            commit('USERLOGIN', result.data.token)
            // 持久化的存储token字符串
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 获取用户信息（携带token索要服务器数据）
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        if (result.code == 200) {
            commit('GETUSERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 退出登录
    async userLogout({ commit }) {
        let result = await reqLogout()
        if (result.code == 200) {
            commit('CLEAR')
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    }
}
const mutations = {
    // 存储验证码
    GETCODE(state, code) {
        state.code = code
    },
    // 存储token
    USERLOGIN(state, token) {
        state.token = token
    },
    // 存储用户信息
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    // 退出登录,清空所有与用户相关的数据
    CLEAR(state) {
        state.token = '';
        state.userInfo = {};
        // 清空本地存储的token字符串
        removeToken()
    }
}
const state = {
    // 验证码
    code: '',
    // token字符串
    token: getToken(),
    // 用户信息
    userInfo: {}
}
const getters = {}
export default {
    actions,
    mutations,
    state,
    getters
}