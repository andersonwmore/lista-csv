import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({

  state: {
    loading: false,
   },
 
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
  },

  actions: {
    setLoading ({commit}, payload) {
      commit('setLoading', payload)
    },
  },   

  getters: {
    loading (state) {
      return state.loading
    },
 }

})
