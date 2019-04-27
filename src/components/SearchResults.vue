<template>
  <div class="searchResults" v-cloak>
    <h3>Search Results</h3>

    <p>{{ propsResults }}</p>
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
</style>

