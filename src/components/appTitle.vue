<template>
  <div class="container">
    <h2>{{ appTitle }}</h2>
    <b-img :src="imgSrc" class="planet"></b-img>
  </div>
</template>

<script>
export default {
  name: "appDescription",
  data() {
    return {
      appTitle: "Welcome To The Planets App",
      imgSrc: require("@/assets/moon.png")
    };
  }
};
</script>

<style scoped>
.container {
  position:relative;
}

h2 {
  font-size: 2.5rem;
  color: rgba(242, 202, 39, 0.609);
  margin-bottom: 40px;
  font-weight: 600;
}

.planet {
  width: 12%;
  position: absolute;
  top: 0;
  left: 0;

  animation: orbit 4s linear infinite;
}
.planet:hover {
  animation-play-state: paused;
}

/* @keyframes orbit {
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
}*/
</style>

