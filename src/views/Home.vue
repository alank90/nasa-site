<template>
  <div class="home">
    <h2>{{ AppDescription }}</h2>
    <b-container class="bv-example-row bv-example-row-flex-cols" fluid>
      <b-row align-h="start">
        <b-col cols="3">
          <SideBarLinks/>
        </b-col>
        <b-col cols="9">
          <!-- propsResults used on SearchResults component to render search results -->
          <component :propsResults="nasaData" :is="currentView"></component>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import SideBarLinks from "@/components/SideBar/SideBarLinks.vue";
import MainView from "@/components/MainView.vue";
import Apod from "@/components/SideBar/Apod.vue";
import SearchResults from "@/components/SideBar/NasaImagesLibrary/SearchResults.vue";

export default {
  name: "home",
  components: {
    SideBarLinks, // components Home.vue use. This equals SideBarLinks: SideBarLinks
    MainView,
    Apod,
    SearchResults
  },
  created() {
    this.$eventBus.$on("send-data", data => {
      // Assign data on eventBus to currentView
      this.currentView = data;
    });
    this.$eventBus.$on("nasa-data", data => {
      // Assign data on eventBus from SideBarLinks search form to nasaData
      this.nasaData = data;
    });
  },
  data() {
    return {
      AppDescription: "Welcome To The Planets App",
      currentView: MainView,
      nasaData: {}
    };
  }
};
</script>

<style scoped>
h2 {
  font-size: 2.5rem;
  margin-bottom: 40px;
  font-weight: 600;
}
</style>

