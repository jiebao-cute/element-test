import Auth from '@/apis/auth'
import router from '@/router'

window.router = router
const state = {
  user: null
}

const getters = {
  username: state => state.user === null ? '未登录' : state.user.username,

  slug: state => state.user === null ? '未' : state.user.username.charAt(0)
}

const mutations = {
  setUser(state, payload) {
    state.user = payload.user
  }
}

const actions = {
  login({ commit }, { username, password }) {
    return Auth.login({ username, password })
      .then(res => {
        console.log('登录请求成功了')
        console.log(res)
        commit('setUser', { user: res.data })
      })
  },
  logout({commit}, payload = { path: '/login' }){
    return Auth.logout()
      .then( res => {
        commit ('setUser',{user: null})
        router.push(payload)
      }
    )
  },
  register({ commit }, { username, password }) {
    return Auth.register({ username, password })
      .then(res => {
        console.log('注册请求成功了')
        commit('setUser', { user: res.data })
      })
  },

  checkLogin({ commit, state }, payload= { path: '/' }) {
    console.group("---check");
    console.log(payload);
    console.log(state.user);
    console.log(state.user  !== null);
    if(state.user !== null) return Promise.resolve()
    return Auth.getInfo()
      .then(res => {
        console.log('验证user')
        console.log(res)
        if(!res.isLogin) {
          router.push(payload)
        } else {
          commit('setUser', { user: res.data })
        }
      })
  }

}


export default {
  state,
  getters,
  mutations,
  actions
}
