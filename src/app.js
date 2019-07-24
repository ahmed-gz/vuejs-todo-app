import Vue from 'vue'
import Vuetify from 'vuetify'
import 'babel-polyfill'
import TodoApp from './TodoApp.vue'

Vue.use(Vuetify)

const app = new Vue({
    el: '#todoApp',
    render: h => h(TodoApp)
})

console.log('TodoApp');
