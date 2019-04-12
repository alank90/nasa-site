<template>
  <b-img :src="JupiterGif" fluid alt="Planet logo"></b-img>
</template>

<script>
export default {
  data() {
    return {
      JupiterGif: require("../assets/jupiter1.gif")
    };
  }
};
</script>
