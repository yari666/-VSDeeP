import Vue from 'vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import App from './App';

import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(Antd);

// require('./mock')

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
