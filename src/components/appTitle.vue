<template>
  <div class="container">
    <h2 class="app-title">
      Welc
      <b-img :src="earthPic" class="earth"></b-img>
    </h2>

    <h2 class="app-title">me To The NASA App</h2>

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
  margin: 0 0 0 -15px;
  color: rgba(242, 202, 39, 0.609);
  margin-bottom: 40px;
  font-weight: 600;
  transition: all 0.5s linear;
}

.earth {
  width: 6.5rem;
  margin-left: -25px;
}

.moon {
  width: 10%;
  position: absolute;
  top: 6.7%;
  left: 18.35%;
  animation: orbit 10s linear infinite;
}
.moon:hover {
  animation-play-state: paused;
}

@keyframes orbit {
  0% {
    transform: rotate(0deg) translateX(120px) scale(1);
  }

  25% {
    transform: rotate(90deg) translateX(120px) scale(1.2);
  }
  50% {
    transform: rotate(180deg) translateX(120px) scale(.8);
  }
  75% {
    transform: rotate(270deg) translateX(120px) scale(0.4);
  }
  100% {
    transform: rotate(360deg) translateX(120px) scale(.8);
  }
}

/* Media Queries */
@media screen and (max-width: 850px) {
  .app-title {
    font-size: 1.5rem;
  }
}

@media screen and (max-width: 600px) {
  .app-title {
    font-size: 0.9rem;
  }
  .earth {
    width: 5rem;
    margin-right: -2px;
    margin-left: -20px;
  }

  @keyframes orbit {
    0% {
      transform: rotate(0deg) translateX(60px) scale(1);
    }

    25% {
      transform: rotate(90deg) translateX(60px) scale(1.4);
    }
    50% {
      transform: rotate(180deg) translateX(60px) scale(1);
    }
    75% {
      transform: rotate(270deg) translateX(60px) scale(0.6);
    }
    100% {
      transform: rotate(360deg) translateX(60px) scale(1);
    }
  }
}
</style>

