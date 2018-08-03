// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import moment from "moment";
import App from "./App";
import router from "./router";
import store from "./store";
import "normalize.css";

/**
 * moment时区设置为中国
 */
moment.locale("zh-cn");

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>",
});
