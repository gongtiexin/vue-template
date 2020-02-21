import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import moment from 'moment';
import 'normalize.css';

/**
 * moment时区设置为中国
 */
moment.locale('zh-cn');

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#root');
