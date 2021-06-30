import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    onLoad: false,
  },
  mutations: {
    SET_ONLOAD(state, data) {
      state.onLoad = data;
    },
  },
  actions: {
    handleLoad({ commit }, isLoading) {
      commit('SET_ONLOAD', isLoading);
    },
  },
});
