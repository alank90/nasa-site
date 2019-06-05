<template>
<div class="jupiter-img">
  <b-img :src="MainViewPicture" fluid alt="Planet logo"></b-img>
</div>
</template>

<script>
export default {
  name: "MainView",
  data() {
    return {
      MainViewPicture: require("../assets/jupiter1.gif")
    };
  }
};
</script>



