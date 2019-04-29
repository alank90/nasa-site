<template>
  <div class="searchResults" v-cloak>
    <h3>Search Results</h3>
    
    <!-- Limit output to 20 items -->
    <ul id="search-Results" v-for="(item, index) in propsResults.items.slice(0,20)" :key="index">
      <li>
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
  }
};
</script>

<style scoped>
h3 {
  font-size: 2rem;
}

.thumbnail {
  max-width: 10%;
}
</style>

