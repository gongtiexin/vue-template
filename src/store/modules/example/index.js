import { query } from '@src/services/example';
import types from './types';

const example = {
  namespaced: true,
  state: {
    msg: '',
  },
  mutations: {
    [types.SET_MSG](state, payload) {
      state.msg = payload;
    },
  },
  actions: {
    getMsg({ commit }, params) {
      query(params).then((data) => commit(types.SET_MSG, data.msg));
    },
  },
};

export default example;
