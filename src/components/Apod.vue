<template>
  <div class="apod" v-cloak>
    <div v-if="loading">
      Loading...
      <!--Loading spinner -->
      <i class="fas fa-spinner spin-it" aria-hidden="true"></i>
    </div>

    <b-jumbotron v-bind:header="title">
      <b-img v-if="validPicture" :src="imgSrc" fluid></b-img>
      <b-embed v-else-if="validVideo" type="iframe" aspect="16by9" :src="imgSrc" allowfullscreen></b-embed>
      <p v-else-if="noImage">
        <b-img src="../assets/astronaut_in_space.jpg" fluid></b-img>Sorry. No Image Available
      </p>
      <p>{{ explanation }}</p>
    </b-jumbotron>
  </div>
</template>

<script>
import api from "../nasaKey.js";

export default {
  name: "apod",
  data() {
    return {
      imgSrc: "",
      title: "",
      explanation: "",
      validPicture: false,
      validVideo: false,
      loading: true
    };
  },
  mounted() {
    this.getApod();
  },
  computed: {
    noImage: function() {
      if (this.imgSrc === null || this.imgSrc === undefined) {
        return true;
      }
    }
  },
  methods: {
    getApod() {
      const url = `https://api.nasa.gov/planetary/apod?api_key=${api.key}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.title = data.title;
          this.explanation = data.explanation;
          this.imgSrc = data.url;
          this.validPicure = /\.bmp|\.gif|\.png|\.jpg|\.jpeg\.tiff/gim.test(
            this.imgSrc
          );
          this.validVideo = /http/gim.test(this.imgSrc);
          this.loading = false;
        })
        .catch(error => {
          console.log("error is", error);
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

