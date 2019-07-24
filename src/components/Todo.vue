<template>
    <v-app>
        <v-content>
            <v-container>
                <v-layout align-center justify-center >
                    <v-flex text-center>
                        <v-card>
                            <v-card-title>
                                <div v-if="errored">
                                    <p class="mb-0">We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
                                </div>
                                <v-container v-else>
                                    <div v-if="loading" class="text-xs-center">
                                        <v-progress-circular indeterminate :size="150" :width="8" color="green"> </v-progress-circular>
                                    </div>
                                    <div v-else class="text-xs-center">
                                        <p class="mb-0">{{ todo.title }}</p>
                                    </div>
                                </v-container>
                            </v-card-title>
                            <v-card-actions v-if="$route.name == 'Todo'">
                                <v-btn flat color="green" @click="back">back</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import todoApi from '@/services/TodoApi'

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
            },
            back () {
                this.$router.push('/')
            }
        },
        mounted: function () {
            this.getCurrentTodo();
        }
    }
</script>
