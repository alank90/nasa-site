<template>
  <div class="apod">
    <div v-if="loading">
      Loading...
      <!--Loading spinner -->
      <i class="fas fa-spinner spin-it" aria-hidden="true"></i>
    </div>

    <b-jumbotron v-bind:header="title">
      <b-img :src="imgSrc" fluid alt=""></b-img>
      <p>{{ explanation }}</p>
    </b-jumbotron>
  </div>
</template>

<script>
import axios from "axios";
import api from "../nasaKey.js";

export default {
  name: "apod",
  data() {
    return {
      imgSrc: "",
      title: "",
      explanation: "",
      loading: true
    };
  },
  mounted() {
    this.getApod();
  },
  methods: {
    getApod() {
      const url = `https://api.nasa.gov/planetary/apod?api_key=${api.key}`;

      axios.get(url).then(response => {
        const data = response.data;
        console.log(data);
        this.title = data.title;
        this.explanation = data.explanation;
        this.imgSrc = data.url;
        this.loading = false;
      });
    }
  }
};
</script>

<style>
h1.display-3 {
  font-size: 2rem;
}

p {
  margin-top: 30px;
}

img.img-fluid {
  max-width: 800px;
}

.jumbotron {
  background-color: aliceblue;
}
</style>

