<template>
  <div class="apod">
    <b-img :src="url" fluid alt="Planet logo"></b-img>
  </div>
</template>

<script>
export default {
  name: "apod",
  data() {
    return {
      url: require("../assets/Neptune.jpg")
    };
  }
};
</script>

<style>
  img.img-fluid {
    max-width: 800px;
  }
</style>

