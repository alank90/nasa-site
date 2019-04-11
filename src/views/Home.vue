<template>
  <div class="home">
    <h1>{{ AppDescription }}</h1>
    <b-container class="bv-example-row" fluid>
      <b-row align-h="between">
        <b-col cols="3">
          <SideBarLinks/>
        </b-col>
        <b-col cols="9">
          <b-img src="../assets/jupiter1.gif" fluid alt="Planet logo"></b-img>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import SideBarLinks from "@/components/SideBarLinks.vue";

export default {
  name: "home",
  components: {
    SideBarLinks // components Home.vue use. This equals SideBarLinks: SideBarLinks
  },
  data() {
    return {
      AppDescription: "Welcome To The Planets App"
    };
  }
};
</script>
