<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex text-center>
            <div v-if="errored">
              <p>
                We're sorry, we're not able to retrieve this information at the
                moment, please try back later
              </p>
            </div>
            <div v-else>
              <v-container v-if="loading">
                <div class="text-xs-center">
                  <v-progress-circular
                    indeterminate
                    :size="150"
                    :width="8"
                    color="green"
                  >
                  </v-progress-circular>
                </div>
              </v-container>
              <div v-else class="text-xs-center">
                <v-list>
                  <v-list-tile
                    v-for="todo in currentTodos"
                    :key="todo.id"
                    @click=""
                  >
                    <v-list-tile-content>
                      <v-list-tile-title
                        v-text="todo.title"
                      ></v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action class="mr-5">
                      <v-btn icon ripple @click="currentTodoId = todo.id">
                        <v-icon
                          :color="
                            currentTodoId == todo.id
                              ? 'grey darken-3'
                              : 'grey lighten-1'
                          "
                          >info</v-icon
                        >
                      </v-btn>
                    </v-list-tile-action>
                    <v-list-tile-action>
                      <v-btn color="info" @click="navigateToTodo(todo.id)"
                        >Navigate</v-btn
                      >
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
                <v-pagination
                  v-model="currentPage"
                  :length="nbPages"
                  :total-visible="7"
                  circle
                  light
                ></v-pagination>
                <todo :id="currentTodoId"></todo>
              </div>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import todoApi from "@/services/TodoApi";

export default {
  components: {
    Todo: () => import(/* webpackPrefetch: true */ "./Todo.vue")
  },
  data() {
    return {
      loading: true,
      errored: false,
      currentPage: 1,
      pagelength: 10,
      currentTodoId: 0,
      dataTest: {},
      todos: []
    };
  },
  computed: {
    nbPages: function() {
      return this.todos.length / this.pagelength;
    },
    currentTodos: function() {
      return this.todos.slice(
        (this.currentPage - 1) * this.pagelength,
        this.currentPage * this.pagelength
      );
    }
  },
  watch: {
    currentTodos: function() {
      this.currentTodoId = this.currentTodos[0].id;
    }
  },
  methods: {
    navigateToTodo: function(id) {
      this.$router.push("/todo/" + id);
    },
    getTodos: function() {
      let delay = 3000;

      this.loading = true;

      todoApi
        .fetchTodoCollection()
        .then(response => {
          this.todos = response;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => {
          setTimeout(() => {
            this.loading = false;
          }, delay);
        });
    }
  },
  mounted: function() {
    this.getTodos();
  }
};
</script>
