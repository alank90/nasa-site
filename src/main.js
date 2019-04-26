// ======== /src/main.js - Main App Entry Point - ==================== //
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";

// By defining the EventBus globally you avoid having to import the
// EventBus in every component you would like to use it in.
Vue.prototype.$eventBus = new Vue();

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

new Vue({
  router,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
