import Vue from 'vue';
import Vuex from 'vuex';
import example from './modules/example';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    example,
  },
});

if (module.hot) {
  // 使 action 和 mutation 成为可热重载模块
  module.hot.accept(['./modules/example'], () => {
    // 获取更新后的模块
    // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
    const newExample = require('./modules/example').default;
    // 加载新模块
    store.hotUpdate({
      modules: {
        example: newExample,
      },
    });
  });
}

export default store;
