import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo: {},
  },
  getters: {},
  mutations: {
    updateUserInfo(state, value) {
      state.userInfo = value
    },
  },
  actions: {},
  modules: {},
  strict: process.env.NODE_ENV !== 'production',
})
