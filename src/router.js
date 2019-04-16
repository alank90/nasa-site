import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    }
  ]
});

router.afterEach((to, from) => {
  if (to.name === "home") {
    console.log("afterRoute am in");
    router.app.$eventBus.$emit("send-data", "Home");
    //$this.$eventBus.$emit("send-data", "home");
  }
});

export default router;
