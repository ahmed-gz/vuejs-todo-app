<template>
    <v-app>
        <div v-if="errored">
            <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
        </div>
        <div v-else>
            <v-container v-if="loading">
                <div class="text-xs-center">
                    <v-progress-circular indeterminate :size="150" :width="8" color="green"> </v-progress-circular>
                </div>
            </v-container>
            <div v-else class="text-xs-center">
                <v-list>
                    <v-list-tile v-for="todo in currentTodos" :key="todo.id" @click="currentTodoId = todo.id">
                        <v-list-tile-content>
                            <v-list-tile-title v-text="todo.title" ></v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-icon :color="(currentTodoId == todo.id) ? 'teal' : 'grey'">chat_bubble</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
                <v-pagination v-model="currentPage" :length="nbPages" :total-visible="7" circle light ></v-pagination>
                <v-container>
                    <div class="text-xs-center">
                        <todo :id="currentTodoId"> </todo>
                    </div>
                </v-container>
            </div>
        </div>
    </v-app>
</template>

<script>
    import todoApi from './services/TodoApi'
    import Todo from './components/Todo.vue'

    export default {
        components: {
            Todo
        },
        data () {
            return {
                loading: true,
                errored: false,
                currentPage: 1,
                pagelength: 10,
                currentTodoId: 0,
                todos: []
            }
        },
        computed: {
            nbPages: function () {
                return this.todos.length/this.pagelength;
            },
            currentTodos: function () {
                return this.todos.slice((this.currentPage - 1) * this.pagelength, this.currentPage * this.pagelength);
            }
        },
        methods: {
            getTodos: function () {
                let delay = 3000;

                this.loading = true;

                todoApi.fetchTodoCollection().then(response => {
                    this.todos = response;
                    this.currentTodoId = this.todos[0].id;
                }).catch((error) => {
                    console.log(error);
                    this.errored = true;
                }).finally(() => {
                    setTimeout(() => {
                        this.loading = false;
                    }, delay);
                })
            }
        },
        created: function () {
            this.getTodos();
        },
        mounted: function () {
            console.log('mounted');
        }
    }
</script>
