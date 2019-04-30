<template>
  <div class="results" v-cloak>
    <h3>Search Results</h3>

    <!-- Limit output to 20 items -->

    <ul class="search-results" v-on:click="imageModal">
      <li v-for="(item, index) in propsResults.items.slice(0,20)" :key="index">
        {{ item.data[0].title}}
        <span>
          <b-img thumbnail class="thumbnail" :src="item.links[0].href" alt="Fluid image"></b-img>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["propsResults"],
  data() {
    return {
      name: "SearchResults"
    };
  },
  methods: {
    imageModal: function(event) {
      console.log(event.target);
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

