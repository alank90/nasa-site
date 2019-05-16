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
            <b-col class="modal-center">Image From:</b-col>
            <b-col class="modal-date-created">Date Created:</b-col>
            <b-col class="modal-keywords">Keywords:</b-col>
          </b-row>
          <b-row class="justify-content-md-center">
            <b-col class="modal-center">{{propsResults.items[resultsIndex].data[0].center}}</b-col>
            <b-col
              class="modal-date-created"
            >{{ propsResults.items[resultsIndex].data[0].date_created.substring(0,9) }}</b-col>
            <b-col
              cols="12"
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

    <!-- =================== Search Results Output List  ================== -->

    <!-- Limit output to 100 items -->

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
        v-else
        v-for="(item, index) in propsResults.items.slice(10*(currentPage-1),10*(currentPage))"
        :key="index"
      >
        {{ item.data[0].title}}
        <span>
          <b-img
            thumbnail
            class="thumbnail"
            :data-index="index"
            :src="item.links[0].href"
            alt="Fluid image"
            id="show-modal"
            v-on:click="imageModal"
          ></b-img>
        </span>
      </b-list-group-item>
    </b-list-group>
    <!-- =================== End Search Results Output List  ======================== -->

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
import modal from "@/components/ImageModal.vue";

export default {
  name: "SearchResults",
  props: ["propsResults"],
  data() {
    return {
      showModal: false,
      attribute: "",
      resultsIndex: null,
      perPage: 15,
      currentPage: 1
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
      console.log(this.resultsIndex);
      this.showModal = true;
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

.modal-image {
  max-width: 50vw;
  max-height: 65vh;
  margin-top: -30px;
}

h1.modal-center {
  font-size: 1.2rem;
}
h2.modal-date-created {
  font-size: 0.9rem;
}
h3.modal-keywords {
  font-size: 0.6rem;
}

.modal-description {
  font-size: 1.2rem;
  overflow: auto;
}

#show-modal {
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
#show-modal:hover {
  transform: scale(2);
}

.search-results {
  list-style: none;
  font-size: 18px;
  font-weight: 700;
}

.list-group-item {
  border: none;
  margin-bottom: 5px;
  line-height: 1.33;
  color: #1a0dab;
  font-family: Arial, Helvetica, sans-serif;
}
.list-group-item:hover {
  text-decoration: underline;
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

ul.pagination {
  justify-content: center;
}
</style>

