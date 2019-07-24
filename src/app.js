import Vue from 'vue'
import Vuetify from 'vuetify'
import 'babel-polyfill'
import App from './App.vue'
import router from './router'

Vue.use(Vuetify)

const app = new Vue({
    el: '#app',
    render: h => h(App),
    router
})
