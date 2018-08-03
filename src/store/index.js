import Vue from "vue";
import Vuex from "vuex";
import demo from "./modules/demo";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    demo,
  },
});

if (module.hot) {
  // 使 action 和 mutation 成为可热重载模块
  module.hot.accept(["./modules/demo"], () => {
    // 获取更新后的模块
    // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
    const newDemo = require("./modules/demo").default;
    // 加载新模块
    store.hotUpdate({
      modules: {
        demo: newDemo,
      },
    });
  });
}

export default store;
