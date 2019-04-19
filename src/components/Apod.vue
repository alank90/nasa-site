<template>
  <div class="apod">
    <b-img :src="imgSrc" fluid alt="Planet logo"></b-img>
  </div>
</template>

<script>
import axios from "axios";
import api from "../nasaKey.js";

console.log(api.key);

export default {
  name: "apod",
  data() {
    return {
      imgSrc: require("../assets/Neptune.jpg")
    };
  },
  mounted() {
    this.getApod();
  },
  methods: {
    getApod() {
      const url = `https://api.nasa.gov/planetary/apod?api_key=${api.key}`;
      console.log("url is: " + url);
      axios.get(url).then(response => {
        console.log(response);
      });
    }
  }
};
</script>

<style>
img.img-fluid {
  max-width: 800px;
}
</style>

