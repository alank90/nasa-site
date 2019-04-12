<template>
  <div class="apod">
    <b-img :src="url" fluid alt="Planet logo"></b-img>
  </div>
</template>

<script>
export default {
  name: "Apod",
  data() {
    return {
      url: "../assets/neptune.jpg"
    };
  }
};
</script>

