<template>
  <b-img :src="MainDisplayPicture" fluid alt="Planet logo"></b-img>
</template>

<script>
export default {
  name: "MainDisplay",
  data() {
    return {
      MainDisplayPicture: require("../assets/jupiter1.gif")
    };
  }
};
</script>
