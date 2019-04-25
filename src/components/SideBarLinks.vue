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
        v-on:click="sendDataMainView"
        href="#"
      >Back to Front</b-list-group-item>
      <b-list-group-item v-on:click="sendDataApod()" href="#">Astronomy Picture of the Day</b-list-group-item>
      <b-list-group-item v-b-toggle="'collapse-2'" class="m-1">NASA Images Library</b-list-group-item>
      <b-collapse id="collapse-2">
        <b-list-group-item href="#">
          <b-form v-if="show">
            <b-form-group id="input-group-1" label="Search NASA Library" label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="form.searchTerm"
                type="text"
                required
                placeholder="Enter Query"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Search Media Type" label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="form.mediaType"
                type="text"
                placeholder="Enter media-type e.g. image"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Search Start Year" label-for="input-3">
              <b-form-input
                id="input-3"
                v-model="form.yearStart"
                type="text"
                placeholder="optional"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" label="Search End Year" label-for="input-4">
              <b-form-input id="input-4" v-model="form.yearEnd" type="text" placeholder="optional"></b-form-input>
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
export default {
  name: "SideBarLinks",
  data() {
    return {
      displayGroupItem: false,
      form: {
        searchTerm: "",
        mediaType: "",
        yearStart: "",
        yearEnd: ""
      },
      show: true
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
    },
    onSubmit(evt) {
      evt.preventDefault();
      let formValues = this.form;
      console.log(formValues);
      // This is .reduce method for objects. If key value is empty
      // string delete it.
      Object.entries(formValues).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
        if (value === undefined) {
          delete formValues.key;
        }
      });
      Object.entries(formValues).forEach(([key, value]) =>
        console.log(`${key}: ${value}`)
      ); // "foo: bar", "baz: 42"
      /* const uri = `https://images-api.nasa.gov/search?q=${
        this.form.searchTerm
      }&media_type=${this.form.mediaType}&year_start=${
        this.form.yearStart
      }&year_end=${this.form.yearEnd}`;
      let uri = "https://images-api.nasa.gov/search?q=";
      for (var parameter in this.form) {
        if (parameter != "") {
          console.log(parameter);
          uri += parameter;
        }
      }

      const url = encodeURI(uri);
      console.log(url);
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const results = data.collection;
          console.log(results);
        }); */
    },
    onReset(evt) {
      evt.preventDefault();
      // reset for values
      this.form.searchTerm = "";
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
</style>
