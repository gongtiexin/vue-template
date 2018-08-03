import request from "../../utils/request";
import { demoTypes } from "../types";

const demo = {
  state: {
    msg: "Welcome to Your Vue.js App",
  },
  mutations: {
    [demoTypes.SET_MSG](state, payload) {
      state.msg = payload;
    },
  },
  actions: {
    getDemoMsg({ commit }, params) {
      request({
        config: { method: "GET", url: "/inapi/simulation/page", params },
      }).then(({ data }) => commit(demoTypes.SET_MSG, "Hello, Vue"));
    },
  },
};

export default demo;
