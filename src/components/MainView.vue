<template>
  <div class="container">
    <b-img :src="MainViewSaturn" fluid alt="Saturn Image"></b-img>
    <b-img :src="MainViewJupiter" fluid alt="Jupiter Image"></b-img>
  </div>
</template>

<script>
export default {
  name: "MainView",
  data() {
    return {
      MainViewSaturn: require("../assets/saturn.gif"),
      MainViewJupiter: require("../assets/jupiter1.gif")
    };
  }
};
</script>


<style scoped>
.container {
  position: relative;
}

.img-fluid {
  max-width: 65%;
  height: auto;
}

img[alt="Saturn Image"] {
  position:absolute;
  top: -100px;
  max-width: 30%;
}
</style>

