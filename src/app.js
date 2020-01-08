import Vue from "vue";
import Vuetify from "vuetify";
import "babel-polyfill";
import App from "./App.vue";
import router from "./router";

Vue.use(Vuetify);

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
