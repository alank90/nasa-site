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
  max-width: 55%;
  transition: all 0.5s linear;
}

img[alt="Saturn Image"] {
  position: absolute;
  top: -45%;
  left: 60%;
  max-width: 40%;
  transition: all 0.5s linear;
}

img[alt="Neptune Image"] {
  position: absolute;
  top: -80%;
  right: 85%;
  max-width: 10%;
  z-index: -99;
  transition: all 0.5s linear;
}

/* ========== Media Queries =============== */

@media screen and (max-width: 400px) {
  img[alt="Saturn Image"] {
    top: -350%;
    left: 70%;
    z-index: -99;
    max-width: 30vw;
  }

  img[alt="Neptune Image"] {
    top: -350%;
  }

  img[alt="Jupiter Image"] {
    margin-top: 5px;
  }
}

@media screen and (min-width: 401px) and (max-width: 768px) {
  img[alt="Saturn Image"] {
    top: -300%;
    left: 70%;
    z-index: -99;
    max-width: 30vw;
  }

  img[alt="Neptune Image"] {
    top: -300%;
  }

  img[alt="Jupiter Image"] {
    margin-top: 5px;
  }
}

@media screen and (min-width: 900px) {
  img[alt="Neptune Image"] {
    top: -45%;
  }
}
</style>

