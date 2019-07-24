import Vue from 'vue'
import VueRouter from 'vue-router'
import TodoApp from '@/components/TodoApp.vue'
import Todo from '@/components/Todo.vue'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'TodoApp',
            component: TodoApp
        },
        {
            path: '/todo/:id',
            name: 'Todo',
            props: true,
            component: Todo
        }
    ],
    mode: 'history'
})
