// ======== /src/main.js - Main App Entry Point - ==================== //
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Vuelidate from "vuelidate";
import Carousel3d from "vue-carousel-3d";

import App from "./App.vue";
import router from "./router";


// By defining the EventBus globally you avoid having to import the
// EventBus in every component you would like to use it in.
Vue.prototype.$eventBus = new Vue();

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(Vuelidate);
Vue.use(Carousel3d);

new Vue({
  router,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
