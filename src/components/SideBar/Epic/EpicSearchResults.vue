<template>
  <!-- ============================================================== -->
  <!-- =========== EPIC Search Results Output Carousel ============== -->
  <!-- ============================================================== -->

  <div v-if="propsResults.length === 0  || propsResults === undefined" v-cloak>
    <p class="noResults">No Pictures Available for this Date.</p>
  </div>

  <!-- Else output slides -->
  <b-container v-else v-cloak>
    <h3>EPIC Search Results</h3>
    <div v-b-toggle.collapse-3>
      <span class="carousel-chevron" title="Hide">&#xbb;</span>
      <p class="carousel-title">
        <b-collapse visible id="collapse-3">
          Pictures from DSCOVR's Earth Polychromatic Imaging Camera (EPIC) instrument, uniquely positioned at the
          <a
            href="https://solarsystem.nasa.gov/resources/754/what-is-a-lagrange-point/"
          >Earth-Sun Lagrange point</a>, EPIC provides full disc imagery of the Earth and captures unique perspectives
          of certain astronomical events such as lunar transits.
        </b-collapse>
      </p>
    </div>
    <carousel-3d
      :controls-visible="true"
      :controls-prev-html="'&#10092;'"
      :controls-next-html="'&#10093;'"
      :controls-width="60"
      :controls-height="100"
      :clickable="false"
      :height="370"
      :border="5"
      :autoplay="startSlides"
    >
      <slide v-for="(slide, index) in propsResults" :index="index" :key="index">
        <p class="image-title">Image {{ index + 1 }} of {{propsResults.length}}</p>
        <figure>
          <img fluid-grow :src="urlMaker(slide.date,slide.image)">
          <figcaption>{{ slide.caption }}</figcaption>
        </figure>
      </slide>
    </carousel-3d>

    <!-- ========= Slides Play Button Markup ========== -->
    <b-img
      @click="playSlides"
      class="play-button"
      src="@/assets/play-pause.png"
      v-b-tooltip.hover
      title="Click and hover mouse enter/leave to begin/end slide show"
    ></b-img>
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
      startSlides: false
    };
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
    },
    playSlides() {
      this.startSlides = !this.startSlides;
      console.log(this.startSlides);
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
  border: 5px solid rgba(13, 103, 219, 0.608);
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

.carousel-chevron {
  font-size: 2.4rem;
  cursor: pointer;
}

.carousel-title {
  margin-top: -10px;
}

.play-button {
  margin-top: -10px;
}

.noResults {
  font-size: 1.5rem;
  font-weight: 600;
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
