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

/* Adding the empty validations object to main Vue instance 
   bootstraps Vuelidate’s $v throughout the project. This then allows
   you to use the $v object to gain information about the current
   state of your form within your Vue instance across all components.
 */
new Vue({
  router,
  validations: {},
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
