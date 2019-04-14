<template>
  <div class="home">
    <h2>{{ AppDescription }}</h2>
    <b-container class="bv-example-row" fluid>
      <b-row align-h="between">
        <b-col cols="3">
          <SideBarLinks/>
        </b-col>
        <b-col cols="9">
          <MainDisplay/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import SideBarLinks from "@/components/SideBarLinks.vue";
import MainDisplay from "@/components/MainDisplay.vue";
import Apod from "@/components/Apod.vue";

export default {
  name: "home",
  components: {
    SideBarLinks, // components Home.vue use. This equals SideBarLinks: SideBarLinks
    MainDisplay,
    Apod
  },
  data() {
    return {
      AppDescription: "Welcome To The Planets App"
    };
  }
};
</script>

<style scoped>
h2 {
  margin-bottom: 40px;
}
</style>

