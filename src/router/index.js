import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// Async component
const TodoApp = () => ({
  component: import("@/components/TodoApp.vue"),
  loading: "loading...",
  error: "Error!",
  // The error component will be displayed if a timeout is
  // provided and exceeded. Default: Infinity.
  timeout: 3000
});

export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "TodoApp",
      component: TodoApp
    },
    {
      path: "/todo/:id",
      name: "Todo",
      props: true,
      component: () =>
        import(/* webpackPrefetch: true */ "@/components/Todo.vue")
    }
  ]
});
