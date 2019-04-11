<template>
  <div>
    <h2>NASA Links</h2>
    <b-list-group>
      <b-list-group-item href="https://apod.nasa.gov/apod/astropix.html" target="_blank">Astronomy Picture of the Day</b-list-group-item>
      <b-list-group-item href="#">Link with active state</b-list-group-item>
      <b-list-group-item href="#">Action links are easy</b-list-group-item>
      <b-list-group-item href="#foobar" disabled>Disabled link</b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  name: "SideBarLinks"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-group-item-action:hover {
  background-color: #42b983;
}
</style>
