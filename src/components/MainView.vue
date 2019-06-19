<template>
  <div class="container">
    <b-img :src="MainViewNeptune" fluid alt="Neptune Image"></b-img>
    <b-img :src="MainViewSaturn" fluid alt="Saturn Image"></b-img>
    <b-img :src="MainViewJupiter" fluid alt="Jupiter Image"></b-img>
  </div>
</template>

<script>
export default {
  name: "MainView",
  data() {
    return {
      MainViewNeptune: require("../assets/neptune.png"),
      MainViewSaturn: require("../assets/saturn.png"),
      MainViewJupiter: require("../assets/jupiter1.gif")
    };
  }
};
</script>


<style scoped>
.container {
  position: relative;
  width: auto;
}

img[alt="Jupiter Image"] {
  max-width: 65%;
  bottom: 0;
  transition: all 0.5s linear;
}

img[alt="Saturn Image"] {
  position: absolute;
  top: -120%;
  right: -25%;
  max-width: 60%;
  transition: all 0.5s linear;
}

img[alt="Neptune Image"] {
  position: absolute;
  top: -80%;
  right: 80%;
  max-width: 15%;
  z-index: -99;
  transition: all 0.5s linear;
}

@media screen and (max-width: 600px) {
  img[alt="Saturn Image"] {
    top: -175%;
  }

  @media screen and (max-width: 600px) {
    img[alt="Neptune Image"] {
      top: -170%;
    }
  }
}

@media screen and (min-width: 900px) {
  img[alt="Saturn Image"] {
    top: -105%;
  }

  img[alt="Neptune Image"] {
    top: -45%;
  }
}
</style>

