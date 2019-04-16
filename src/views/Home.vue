<template>
  <div class="home">
    <h2>{{ AppDescription }}</h2>
    <b-container class="bv-example-row" fluid>
      <b-row align-h="between">
        <b-col cols="3">
          <SideBarLinks/>
        </b-col>
        <b-col cols="9">
          <component :is="currentView"></component>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import SideBarLinks from "@/components/SideBarLinks.vue";
import MainView from "@/components/MainView.vue";
import Apod from "@/components/Apod.vue";

export default {
  name: "home",
  components: {
    SideBarLinks, // components Home.vue use. This equals SideBarLinks: SideBarLinks
    MainView,
    Apod
  },
  created() {
    this.$eventBus.$on("send-data", data => {
      // do something with the data
      this.currentView = data;
    });
  },
  data() {
    return {
      AppDescription: "Welcome To The Planets App",
      currentView: MainView
    };
  }
};
</script>

<style scoped>
h2 {
  margin-bottom: 40px;
}
</style>

