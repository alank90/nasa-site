<template>
  <div class="results overflow-auto" v-cloak>
    <h3>Search Results</h3>

    <modal v-if="showModal" @close="showModal = false">
      <!--
      you can use custom content here to overwrite
      default content
      -->
      <template v-slot:header>
        <h1>NASA Image</h1>
      </template>

      <template v-slot:body>
        <b-img class="modal-image" v-bind:src="attribute"></b-img>
      </template>
    </modal>

    <!-- Limit output to 100 items -->

    <b-list-group
      class="search-results"
      id="my-list"
      :per-page="perPage"
      :current-page="currentPage"
    >
      <b-list-group-item
        v-for="(item, index) in propsResults.items.slice(10*(currentPage-1),10*(currentPage))"
        :key="index"
      >
        {{ item.data[0].title}}
        <span>
          <b-img
            thumbnail
            class="thumbnail"
            :src="item.links[0].href"
            alt="Fluid image"
            id="show-modal"
            v-on:click="imageModal"
          ></b-img>
        </span>
      </b-list-group-item>
    </b-list-group>

    <!-- ======== Pagination Markup  ============ -->

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-list"
    ></b-pagination>

    <p class="mt-3">Current Page: {{ currentPage }}</p>

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

      console.log(this.$props.propsResults.items.length);
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

img#show-modal {
  cursor: pointer;
}

.search-results {
  list-style: none;
  font-size: 18px;
  font-weight: 700;
}

.list-group-item {
  margin-bottom: 15px;
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
  max-width: 6vw;
  max-height: 6vh;
  vertical-align: text-bottom;
  margin-left: 20px;
}
</style>

