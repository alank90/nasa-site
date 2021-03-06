<template>
  <div class="results overflow-auto" v-cloak>
    <h3>Search Results</h3>

    <!-- ====== Modal Markup implemented with slots. The slots are tied to the 
         ImageModal component via named slots e.g. v-slot:header 
    ============================================-->
    <modal v-if="showModal" @close="showModal = false">
      <!--
      you can use custom content here to overwrite
      default content
      -->
      <template v-slot:header>
        <b-container class="bv-example-row" fluid>
          <b-row>
            <b-col cols="3" class="modal-center">Image From:</b-col>
            <b-col cols="1" class="modal-center">{{propsResults.items[resultsIndex].data[0].center}}</b-col>
            <b-col cols="3" class="modal-date-created">Date Created:</b-col>
            <b-col
              cols="2"
              class="modal-date-created"
            >{{ propsResults.items[resultsIndex].data[0].date_created.substring(0,10) }}</b-col>
            <b-col class="modal-keywords">Keywords:</b-col>
            <b-col
              cols="3"
              md="auto"
              class="modal-keywords"
              v-for="(item, index) in propsResults.items[resultsIndex].data[0].keywords"
              :key="index"
            >{{ item }}</b-col>
          </b-row>
        </b-container>
      </template>

      <template v-slot:body>
        <b-img class="modal-image" v-bind:src="attribute" title="Right click to enlarge"></b-img>
        <p class="modal-description">{{ propsResults.items[resultsIndex].data[0].description }}</p>
      </template>
    </modal>

    <!-- =============== End ImageModal markup ======================== -->

    <!-- ============================================================== -->
    <!-- ====== NASA Images Library Search Results Output List  ======= -->
    <!-- ============================================================== -->

    <!-- ========== Begin Markup for Video Links =================== -->
    <ul
      class="search-results"
      v-else-if="propsResults.href.includes('media_type=video')"
      @click.prevent="retrieveMediaSrcLinkHandler($event)"
      :per-page="perPage"
      :current-page="currentPage"
    >
      <b-list-group-item
        v-for="(item, index) in propsResults.items.slice(10*(currentPage-1),10*(currentPage))"
        :key="index"
      >
        <li
          v-b-toggle.collapse-1
          :data-json-url="item.href"
          class="media-link"
        >{{ item.data[0].title }}</li>
        <b-collapse id="collapse-1" class="mt-2">
          <li v-if="item.href === mediaFilesJSONLink ">
            <video width="800" height="600" controls :src="mediaUrl"></video>
            <p class="description">{{ item.data[0].description }}</p>
          </li>
        </b-collapse>
      </b-list-group-item>
    </ul>

    <!-- ========== End  Markup for Video Links ==================== -->

    <!-- =============== Begin Markup for an Image Link =============-->
    <b-list-group
      class="search-results"
      id="my-list"
      :per-page="perPage"
      :current-page="currentPage"
    >
      <b-list-group-item v-if="propsResults.items.length === 0  || propsResults === undefined">
        <p>No Search Results</p>
      </b-list-group-item>

      <b-list-group-item
        v-else-if="propsResults.href.includes('media_type=image')"
        v-for="(item, index) in propsResults.items.slice(10*(currentPage-1),10*(currentPage))"
        :key="index"
      >
        {{ item.data[0].title}}
        <span>
          <b-img
            thumbnail
            class="thumbnail"
            :data-index="index + 10*(currentPage-1)"
            :src="item.links[0].href"
            alt="Fluid image"
            id="show-modal"
            v-on:click="imageModal"
          ></b-img>
        </span>
      </b-list-group-item>
      <!-- ========== End Image Link Markup ================ -->

      <!-- ========= Begin Markup for Audio Links ============== -->
      <ul
        class="search-results"
        v-else-if="propsResults.href.includes('media_type=audio')"
        @click.prevent="retrieveMediaSrcLinkHandler($event)"
        :per-page="perPage"
        :current-page="currentPage"
      >
        <b-list-group-item
          v-for="(item, index) in propsResults.items.slice(10*(currentPage-1),10*(currentPage))"
          :key="index"
        >
          <li
            v-b-toggle.collapse-1
            :data-json-url="item.href"
            class="media-link"
          >{{ item.data[0].title }}</li>
          <b-collapse id="collapse-1" class="mt-2">
            <li v-if="item.href === mediaFilesJSONLink ">
              <audio controls :src="mediaUrl"></audio>
              <p class="description">{{ item.data[0].description }}</p>
            </li>
          </b-collapse>
        </b-list-group-item>
      </ul>
    </b-list-group>
    <!-- ========= End Audio Link Markup ================= -->

    <!-- ============================================================== -->
    <!-- ================ End Search Results Output List  ============= -->
    <!-- ============================================================== -->

    <!-- ======== Pagination Markup  ============ -->

    <p class="mt-3">Current Page: {{ currentPage }}</p>

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-list"
    ></b-pagination>

    <!-- ==========End Pagination Markup ======== -->
  </div>
</template>

<script>
import modal from "@/components/SideBar/NasaImagesLibrary/ImageModal.vue";
import retrieveMediaLink from "@/assets/js/retrieveMediaLink.js";

export default {
  name: "nasaImagesSearchResults",
  props: ["propsResults"],
  data() {
    return {
      showModal: false,
      attribute: "",
      resultsIndex: null,
      perPage: 15,
      currentPage: 1,
      mediaFilesJSONLink: "",
      mediaUrl: ""
    };
  },
  computed: {
    rows() {
      return this.$props.propsResults.items.length;
    }
  },
  components: {
    modal
  },
  methods: {
    imageModal: function(event) {
      this.attribute = event.target.getAttribute("src");
      this.resultsIndex = event.target.getAttribute("data-index");
      this.showModal = true;
    },
    retrieveMediaLink,
    retrieveMediaSrcLinkHandler: async function(event) {
      /* On click of Search Results <li> element we retrieve the 
         value in data-json-url attribute and submit this to retrieveMediaLink
         module to return the actual media file link fo an audio or video file
         to be used in <video/audio>'s src= link
      */
      const el = event.target;
      const mediaFilesJSON = el.getAttribute("data-json-url");
      this.mediaFilesJSONLink = mediaFilesJSON;
      this.mediaUrl = await this.retrieveMediaLink(mediaFilesJSON);
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 1.3rem;
  text-decoration: underline;
  margin-bottom: 30px;
}

.row {
  justify-content: flex-start;
}

h3,
.h3 {
  font-size: 2.2rem;
}

p.mt-3 {
  color: whitesmoke;
}

.search-results {
  list-style: none;
  font-size: 18px;
  font-weight: 700;
}
.results h3 {
  color: whitesmoke;
  font-weight: 600;
  height: 50px;
}

.list-group-item {
  background-color: rgba(47, 123, 223, 0.2);
  border: none;
  margin-bottom: 5px;
  line-height: 1.33;
  color: rgba(255, 255, 255, 0.8);
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 1.3rem;
}

.list-group-item:visited {
  color: #660099;
}

img.thumbnail {
  max-width: 8vw;
  max-height: 8vh;
  vertical-align: text-bottom;
  margin-left: 20px;
}

ul {
  list-style-type: none;
}

li.media-link:hover {
  text-decoration: underline;
}

ul.pagination {
  justify-content: center;
}

.media-link {
  cursor: pointer;
}

p.description {
  font-size: 0.9rem;
}

/* ======== Modal Stylings ============ */

.modal-image {
  max-width: 50vw;
  max-height: 65vh;
  margin-top: -30px;
}

.modal-footer {
  margin-top: 0;
}

.modal-description {
  font-size: 0.75rem;
  overflow: auto;
  scrollbar-width: none;
}

.modal-center {
  font-size: 1rem;
}

.modal-date-created {
  font-size: 1rem;
}
.modal-keywords.col {
  font-size: 1rem;
  font-style: normal;
}
.modal-keywords {
  font-size: 0.8rem;
  font-style: italic;
}

.modal-footer {
  border-top: 0 solid #fff;
}

#show-modal {
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
#show-modal:hover {
  transform: scale(2.5);
  z-index: 99;
}
/* ======== End of Modal Stylings =========== */
</style>

