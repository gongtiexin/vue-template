import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import '@src/plugins';
import * as dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'normalize.css';

dayjs.locale('zh-cn');

Vue.config.productionTip = false;

Vue.prototype.$moment = dayjs;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#root');
