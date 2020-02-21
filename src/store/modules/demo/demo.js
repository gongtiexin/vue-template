import request from '@utils/request';
import types from './types';

const demo = {
  state: {
    msg: 'Welcome to Your Vue.js App',
    news: [],
  },
  mutations: {
    [types.SET_NEWS](state, payload) {
      state.news = payload;
    },
  },
  actions: {
    async getNews({ commit }, params) {
      await request({
        config: { method: 'GET', url: '/api/news', params },
      }).then(({ data }) => commit(types.SET_NEWS, data));
    },
  },
};

export default demo;
