<template>
  <div class="home">
    <appTitle></appTitle>
    <b-container class="bv-example-row bv-example-row-flex-cols" fluid>
      <b-row align-h="start">
        <b-col md="3">
          <SideBarLinks/>
        </b-col>
        <b-col md="9">
          <!-- propsResults used on nasaImagesSearchResults component to render search results  -->
          <!-- propsSelectState used with EpicSearchResults component to pass along the select Color Image state  -->
          <component :propsResults="nasaData" :is="currentView" :propsSelectState="formSelectState"></component>
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
import nasaImagesSearchResults from "@/components/SideBar/NasaImagesLibrary/nasaImagesSearchResults.vue";
import EpicSearchResults from "@/components/SideBar/Epic/EpicSearchResults.vue";
import appTitle from "@/components/appTitle.vue";

export default {
  name: "home",
  components: {
    SideBarLinks, // components Home.vue use. This equals SideBarLinks: SideBarLinks
    MainView,
    Apod,
    nasaImagesSearchResults,
    EpicSearchResults,
    appTitle
  },
  created() {
    this.$eventBus.$on("send-data", data => {
      // Assign data on eventBus to currentView
      this.currentView = data;
    });

    this.$eventBus.$on("nasa-data", data => {
      // Assign data on eventBus from SideBarLinks,EpicSearchresults search form to nasaData
      this.nasaData = data;
    });

    // Send EPIC form select state on $eventbus to Home component
    // for url formation in EpicSearchResults
    this.$eventBus.$on("epic-form-select-data", data => {
      this.formSelectState = data;
    });
  },
  data() {
    return {
      currentView: MainView,
      nasaData: {},
      formSelectState: ""
    };
  }
};
</script>

<style>
.col-3 {
  max-width: 400px;
}
</style>
