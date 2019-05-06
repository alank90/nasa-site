/*    /src/components/SideBarLinks.vue 
 Note: The sendData Methods are used to emit an event on click
 that is wired up to a listener in the Home view which will display
 correct picture in MainView depending on currentView state */

<template>
  <div>
    <b-img src="../assets/nasa.png" fluid alt="NASA Logo">NASA Links</b-img>

    <b-list-group>
      <b-list-group-item
        v-show="displayBackToFront"
        v-on:click="sendDataMainView"
        href="#"
      >Back to Front</b-list-group-item>
      <b-list-group-item v-show="displayApod" v-on:click="sendDataApod()" href="#">Astronomy Picture of the Day</b-list-group-item>
      <b-list-group-item v-b-toggle="'collapse-2'" class="m-1">NASA Images Library</b-list-group-item>
      <b-collapse id="collapse-2">
        <b-list-group-item href="#">
          <b-form v-if="show">
            <b-form-group id="input-group-1" label="Search NASA Library" label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="form.q"
                type="text"
                required
                placeholder="Enter Query"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Search Media Type" label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="form.media_type"
                type="text"
                placeholder="Enter media-type e.g. image"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Search Start Year" label-for="input-3">
              <b-form-input
                id="input-3"
                v-model="form.year_start"
                type="text"
                placeholder="optional"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" label="Search End Year" label-for="input-4">
              <b-form-input id="input-4" v-model="form.year_end" type="text" placeholder="optional"></b-form-input>
            </b-form-group>

            <b-button v-on:click="onSubmit" variant="primary">Submit</b-button>
            <b-button v-on:click="onReset" variant="danger">Reset</b-button>
          </b-form>
        </b-list-group-item>
      </b-collapse>
      <b-list-group-item href="#">Action links are easy</b-list-group-item>
      <b-list-group-item href="#foobar" disabled>Disabled link</b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';

export default {
  name: "SideBarLinks",
  data() {
    return {
      displayBackToFront: false,
      displayApod: true,
      form: {
        q: "",
        media_type: "",
        year_start: "",
        year_end: ""
      },
      show: true
    };
  },
  methods: {
    sendDataMainView() {
      this.$eventBus.$emit("send-data", "MainView");
      if (this.displayBackToFront === true) {
        this.displayBackToFront = false;
        this.displayApod =true;
      }
    },
    sendDataApod() {
      this.$eventBus.$emit("send-data", "Apod");
      if (this.displayBackToFront === false) {
        this.displayBackToFront = true;
        this.displayApod = false;
      }
    },
    onSubmit(evt) {
      evt.preventDefault();
      let formValues = this.form;
      let uri = `https://images-api.nasa.gov/search?`;
      // This is .reduce method for objects. If key value is empty
      // string delete it.
      Object.entries(formValues).forEach(([key, value]) => {
        if (value === "") {
          delete formValues[key];
        } else {
          uri += `${key}=${formValues[key]}&`; // Build the url request
        }
      });
      uri = uri.substring(0, uri.length - 1); // Delete trailing &
      const url = encodeURI(uri); // Encode url request for http transport to server

      // Send off API request to NASA
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const results = data.collection;
          console.log(results);

          // Change View to SearchResults
          this.$eventBus.$emit("send-data", "SearchResults");
          if (this.displayBackToFront === false) {
            this.displayBackToFront = true;
          }

          // Send NASA Search Data results on event Bus to Home.vue
          this.$eventBus.$emit("nasa-data", results);
        });
    },
    onReset(evt) {
      evt.preventDefault();

      // reset form values
      this.form.q = "";
      this.form.media_type = "";
      this.form.year_start = "";
      this.form.year_end = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-group-item-action:hover,
.list-group-item:hover {
  background-color: #0065b34b;
  cursor: pointer;
}
.img-fluid {
  max-width: 60%;
}

.btn-primary  {
  margin-right: 5px;
}
</style>
