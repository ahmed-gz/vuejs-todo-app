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
                <p>{{ todo.title }}</p>
            </div>
        </div>
    </v-app>
</template>

<script>
    import todoApi from './../services/TodoApi'

    export default {
        props: ['id'],
        data () {
            return {
                loading: true,
                errored: false,
                todo: {}
            }
        },
        watch: {
            id: function () {
                console.log('id changed');
                this.getCurrentTodo();
            }
        },
        methods: {
            getCurrentTodo: function () {
                let delay = 3000;

                this.loading = true;

                todoApi.fetchSingleTodo(this.id).then(response => {
                    this.todo = response;
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
            this.getCurrentTodo();
        },
        mounted: function () {
            console.log('mounted');
        }
    }
</script>
