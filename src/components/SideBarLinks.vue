/*    /src/components/SideBarLinks.vue 
 Note: The sendData Methods are used to emit an event on click
 that is wired up to a listener in the Home view which will display
 correct picture in MainView depending on currentView state */

<template>
  <div>
    <b-img src="../assets/nasa.png" fluid alt="NASA Logo">NASA Links</b-img>

    <b-list-group>
      <b-list-group-item
        v-show="displayGroupItem"
        v-on:click="sendDataMainView()"
        href="#"
      >Back to Front</b-list-group-item>
      <b-list-group-item v-on:click="sendDataApod()" href="#">Astronomy Picture of the Day</b-list-group-item>
      <b-list-group-item href="#">Link with active state</b-list-group-item>
      <b-list-group-item href="#">Action links are easy</b-list-group-item>
      <b-list-group-item href="#foobar" disabled>Disabled link</b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  name: "SideBarLinks",
  data() {
    return {
      displayGroupItem: false
    };
  },
  methods: {
    sendDataMainView() {
      this.$eventBus.$emit("send-data", "MainView");
      if (this.displayGroupItem === true) {
        this.displayGroupItem = false;
      }
    },
    sendDataApod() {
      this.$eventBus.$emit("send-data", "Apod");
      if (this.displayGroupItem === false) {
        this.displayGroupItem = true;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-group-item-action:hover {
  background-color:#0065b34b;
}
.img-fluid {
  max-width: 60%;
}
</style>
