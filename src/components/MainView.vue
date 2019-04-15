<template>
  <b-img :src="MainViewPicture" fluid alt="Planet logo"></b-img>
</template>

<script>
export default {
  name: "MainView",
  data() {
    return {
      MainViewPicture: require("../assets/jupiter1.gif")
    };
  }
};
</script>
