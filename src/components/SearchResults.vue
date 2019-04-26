<template>
  <div class="searchResults" v-cloak>
    <div v-if="loading">
      Loading...
      <!--Loading spinner -->
      <i class="fas fa-spinner spin-it" aria-hidden="true"></i>
    </div>

    <h3>Search Results</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "SearchResults",
      loading: true
    };
  }
};
</script>

<style scoped>
h3 {
  font-size: 2rem;
}
</style>

