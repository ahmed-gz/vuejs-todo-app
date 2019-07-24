import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

import 'babel-polyfill'
import TodoApp from './TodoApp.vue'

const app = new Vue({
    el: '#todoApp',
    render: h => h(TodoApp)
})

console.log('TodoApp');
