import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Apod from "./components/Apod.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    /* {
      path: "/apod",
      name: "apod",
      beforeEnter: (to, from, next) => {
        console.log("Apod route called.");
        next();
      },
      component:Apod
    }, */
    {
      path: "/about",
      name: "about",
      component: About
    }
  ]
});
