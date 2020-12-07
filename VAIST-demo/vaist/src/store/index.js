import Vue from 'vue'
import Vuex from 'vuex'

//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
var token = window.localStorage.getItem('token');
var uuid = window.localStorage.getItem('uuid');

const store = new Vuex.Store({
    state: {
        uuid,
        token,
    },
    mutations: {
        setToken(state, params) {
            state.token = params.token;
            state.uuid = params.uuid;
        }
    }
})

export default store