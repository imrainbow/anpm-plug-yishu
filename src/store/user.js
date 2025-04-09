// 从本地存储中获取token
const getToken = () => {
    return sessionStorage.getItem('token') || ''
}

const state = {
    token: getToken()
}

const mutations = {
    // 设置token
    SET_TOKEN: (state, token) => {
        state.token = token
        // 同时存储到本地
        if (token) {
            sessionStorage.setItem('token', token)
        } else {
            sessionStorage.removeItem('token')
        }
    }
}
export default {
    namespaced: true,
    state,
    mutations,

}

