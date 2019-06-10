<template>
  <div class="container">
    <h2 class="app-title">Welc</h2>
    <b-img :src="earthPic" class="earth"></b-img>
    <h2 class="app-title">me To The Planets App</h2>

    <b-img :src="moonPic" class="moon"></b-img>
  </div>
</template>

<script>
export default {
  name: "appDescription",
  data() {
    return {
      earthPic: require("@/assets/earth.png"),
      moonPic: require("@/assets/moon.png")
      // pageSubHeading:
      //   "<h2>Welc</h2><img src='/src/assets/earth.png'/><h2>me To The Planets App</h2>"
    };
  }
};
</script>

<style scoped>
.container {
  position: relative;
  width: 80%;
  max-width: 800px;
}

.app-title {
  font-size: 2.5rem;
  display: inline-block;
  position: relative;
  color: rgba(242, 202, 39, 0.609);
  margin-bottom: 40px;
  font-weight: 600;
}

.earth {
  width: 5.5rem;
}

.moon {
  width: 12%;
  position: absolute;
  top: 0;
  left: 65px;
  animation: orbit 10s linear infinite;
}
.moon:hover {
  animation-play-state: paused;
}

@keyframes orbit {
  0% {
    transform: rotate(0deg) translateX(5px) translateY(120px) rotate(0deg)
      scale(1);
  }

  25% {
    transform: rotate(90deg) translateX(5px) translateY(120px) rotate(-90deg)
      scale(0.75);
  }
  50% {
    transform: rotate(180deg) translateX(5px) translateY(120px) rotate(-180deg)
      scale(0.6);
  }
  75% {
    transform: rotate(270deg) translateX(5px) translateY(120px) rotate(-270deg)
      scale(0.75);
  }
  100% {
    transform: rotate(360deg) translateX(5px) translateY(120px) rotate(-360deg)
      scale(1);
  }
}
</style>

