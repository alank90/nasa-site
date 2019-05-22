<template>
  <div class="results overflow-auto" v-cloak>
    <h3>EPIC Search Results</h3>
    <!-- ============================================================== -->
    <!-- =========== EPIC Search Results Output List ================== -->
    <!-- ============================================================== -->

    <!-- Limit output to 100 items -->
    <b-list-group
      class="search-results"
      id="my-list"
      :per-page="perPage"
      :current-page="currentPage"
    >
      <b-list-group-item v-if="propsResults.length === 0  || propsResults === undefined">
        <p>No Search Results</p>
      </b-list-group-item>
      <b-list-group-item
        v-else
        v-for="(item, index) in propsResults.slice(10*(currentPage-1),10*(currentPage))"
        :key="index"
      >
        {{ item.caption}}
        <span>
          <b-img
            thumbnail
            class="thumbnail"
            :src="'https://epic.gsfc.nasa.gov/archive/natural/'+ pictureDate(item.date) + '.png'"
          ></b-img>
        </span>
        <!-- <span>
          <b-img
            thumbnail
            class="thumbnail"
            :data-index="index + 10*(currentPage-1)"
            :src="item.links[0].href"
            alt="Fluid image"
            id="show-modal"
            v-on:click="imageModal"
          ></b-img>
        </span>-->
      </b-list-group-item>
    </b-list-group>
    <!-- ====================================================================== -->
    <!-- ============= End Search Results Output List  ======================== -->
    <!-- ====================================================================== -->

    <!-- ======== Pagination Markup  ============ -->

    <p class="mt-3">Current Page: {{ currentPage }}</p>

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-list"
    ></b-pagination>

    <!--======= End Pagination Markup =========== -->
  </div>
</template>


<script>
export default {
  name: "EpicSearchResults",
  props: ["propsResults"],
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
    pictureDate(date) {
      const dateArray = date.split(/[ -]+/gim);
      dateArray = dateArray.filter((item, index) => {
        if (index === dateArray.length - 1) {
          dateArray.slice(-1, 1);
        }
      });

      dateArray.forEach(function(item) {
        console.log("item is: " + item);
      });
    }
  }
};
</script>

<style scoped>
.row {
  justify-content: flex-start;
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
