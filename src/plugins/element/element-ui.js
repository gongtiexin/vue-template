/**
 * 按需引入element-ui
 */

import Vue from 'vue';
import { Button, Input, Select, Option, Checkbox, Popover } from 'element-ui';
import './element-variables.scss';

Vue.use(Button);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Checkbox);
Vue.use(Popover);
