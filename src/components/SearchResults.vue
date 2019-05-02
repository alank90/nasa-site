<template>
  <div class="results" v-cloak>
    <h3>Search Results</h3>

    <modal v-if="showModal" @close="showModal = false">
      <!--
      you can use custom content here to overwrite
      default content
      -->
      <h3>default header</h3>

      <template v-slot:body>
        <b-img class="modal-image" v-bind:src="attribute"></b-img>
      </template>
    </modal>

    <!-- Limit output to 20 items -->

    <ul class="search-results">
      <li v-for="(item, index) in propsResults.items.slice(0,20)" :key="index">
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
      </li>
    </ul>
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
      attribute: ""
    };
  },
  components: {
    modal
  },
  methods: {
    imageModal: function(event) {
      console.log(event.target);
      this.attribute = event.target.getAttribute("src");

      console.log(this.attribute);
      this.showModal = true;
    }
  }
};
</script>

<style scoped>
h3 {
  font-size: 2rem;
  text-decoration: underline;
  margin-bottom: 30px;
}

.modal-image {
  max-width: 50vw;
  max-height: 65vh;
  margin-top: -30px;
}

.search-results {
  list-style: none;
  font-size: 18px;
  font-weight: 700;
}

li {
  margin-bottom: 15px;
  line-height: 1.33;
  color: #1a0dab;
  font-family: Arial, Helvetica, sans-serif;
}
li:hover {
  text-decoration: underline;
  cursor: pointer;
}
li:visited {
  color: #660099;
}

.thumbnail {
  max-width: 8%;
  vertical-align: text-bottom;
  margin-left: 20px;
}

</style>

