<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/jupiter1.gif">
    <SideBarLinks msg="A Look At The Planets App"/>

    <p>
      For a guide and recipes on how to configure / customize this project,
      <br>check out the
      <a
        href="https://cli.vuejs.org"
        target="_blank"
        rel="noopener"
      >vue-cli documentation</a>.
    </p>
  </div>
</template>

<script>
// @ is an alias to /src
import SideBarLinks from "@/components/SideBarLinks.vue";

export default {
  name: "home",
  components: {
    SideBarLinks // components Home.vue use. This equals SideBarLinks: SideBarLinks
  }
};
</script>
