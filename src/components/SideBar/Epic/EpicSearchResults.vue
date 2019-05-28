<template>
  <!-- ============================================================== -->
  <!-- =========== EPIC Search Results Output Carousel ============== -->
  <!-- ============================================================== -->

  <!-- Limit output to 100 items -->
  <b-container v-cloak>
    <h3>EPIC Search Results</h3>
    <p>
      Pictures from DSCOVR's Earth Polychromatic Imaging Camera (EPIC) instrument, uniquely positioned at the
      <a
        href="https://solarsystem.nasa.gov/resources/754/what-is-a-lagrange-point/"
      >Earth-Sun Lagrange point</a>, EPIC provides full disc imagery of the Earth and captures unique perspectives
      of certain astronomical events such as lunar transits.
    </p>
    <carousel-3d
      :controls-visible="true"
      :controls-prev-html="'&#10092;'"
      :controls-next-html="'&#10093;'"
      :controls-width="60"
      :controls-height="100"
      :clickable="false"
      :height="370"
      :border="5"
    >
      <slide v-if="propsResults.length === 0  || propsResults === undefined">
        <p>No Search Results</p>
      </slide>
      <slide v-else v-for="(slide, index) in propsResults" :index="index" :key="index">
        <p class="image-title">Image {{ index + 1 }} of {{propsResults.length + 1}}</p>
        <figure>
          <img fluid-grow :src="urlMaker(slide.date,slide.image)">
          <figcaption>{{ slide.caption }}</figcaption>
        </figure>
      </slide>
    </carousel-3d>
  </b-container>
  <!-- ====================================================================== -->
  <!-- ============= End Search Results Output Carousel  ==================== -->
  <!-- ====================================================================== -->
</template>


<script>
import { Carousel3d, Slide } from "vue-carousel-3d";

export default {
  name: "EpicSearchResults",
  props: ["propsResults", "propsSelectState"],
  components: {
    Carousel3d,
    Slide
  },
  data() {
    return {
      year: null,
      month: null,
      day: null,
      perPage: 15,
      currentPage: 1
    };
  },
  computed: {
    rows() {
      return this.$props.propsResults.length;
    }
  },
  methods: {
    urlMaker(date, image) {
      // Regex to split array on a space or dash
      let dateArray = date.split(/[ -]+/gim);
      // Last item time stamp not needed
      dateArray.pop();

      // Iterate thru dateArray
      dateArray.forEach((item, index) => {
        if (index === 0) this.year = item;
        if (index === 1) this.month = item;
        if (index === 2) this.day = item;
      });

      const urlQuery = `https://epic.gsfc.nasa.gov/archive/${
        this.propsSelectState
      }/${this.year}/${this.month}/${this.day}/png/${image}.png`;

      return urlQuery;
    }
  }
};
</script>

/* The Unscoped CSS overrides the Vue-Carousel-3d CSS rules */
<style>
.carousel-3d-slide {
  content: "";
  display: block;
  position: absolute;
  min-width: 100%;
  min-height: 370px;
  border-radius: 10px;
  border: 5px solid rgba(13, 103, 219, 0.808);
  box-shadow: inset 0 50px rgba(255, 255, 255, 0.2),
    inset 0 -15px 30px rgba(0, 0, 0, 0.4), 0 5px 10px rgba(0, 0, 0, 0.5);
  -moz-transform: translate(-15px, -285px);
  -webkit-transform: translate(-15px, -285px);
  -o-transform: translate(-15px, -285px);
  -ms-transform: translate(-15px, -285px);
  transform: translate(-15px, -385px);
}

.next span,
.prev span {
  color: #fff;
  font-size: 5rem;
  font-weight: 700;
  text-shadow: 5px 0px 4px rgba(0, 2, 10, 0.92);
}
</style>


<style scoped>
[v-cloak] {
  display: none;
}

/* Carousel Stylings */

.carousel-3d-container figure {
  margin: 0;
}

.carousel-3d-container figcaption {
  position: absolute;
  background-color: rgba(75, 117, 196, 0.5);
  color: #fff;
  bottom: 0;
  padding: 5px;
  font-size: 14px;
  min-width: 100%;
  box-sizing: border-box;
}

.image-title {
  margin: 0;
  background-color: rgba(75, 117, 196, 0.5);
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  text-align: center;
}
</style>
