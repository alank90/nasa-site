<template>
  <div>
    <b-form v-if="show">
      <b-form-group id="input-group-1" label="Color Image:" label-for="input-1">
        <b-form-select id="input-1" v-model="epicForm.selected" :options="epicForm.options"></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-2" label="Pick a Date For Pictures" label-for="input-2">
        <datepicker value="2019-5-28" format="YYYY-M-D" name="date1"></datepicker>
      </b-form-group>

      <b-button @click.prevent="onSubmit" variant="primary">Submit</b-button>
      <b-button @click.prevent="onReset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import datepicker from "vue-date-picker";
export default {
  components: {
    datepicker
  },
  data() {
    return {
      epicForm: {
        selected: null,
        options: [
          { value: null, text: "Select One" },
          { value: "natural", text: "Natural Color Imagery" },
          { value: "enhanced", text: " Enhanced Color Imagery" }
        ]
      },
      show: true
    };
  },
  updated() {
    // Send EPIC form select state on $eventbus to Home component
    // for url formation
    this.$eventBus.$emit("epic-form-select-data", this.epicForm.selected);
  },
  methods: {
    onSubmit(event) {
      let url = `https://epic.gsfc.nasa.gov/api/${this.epicForm.selected} `;
      console.log(pickedValue);
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const results = data;

          // Change View to epicSearchResults in Home.vue
          this.$eventBus.$emit("send-data", "epicSearchResults");

          if (this.displayBackToFront === false) {
            this.displayBackToFront = true;
          }

          // Send NASA Search Data results on event Bus to Home.vue
          this.$eventBus.$emit("nasa-data", results);
        });
    },
    onReset(event) {
      // Reset our form values
      this.selected = null;

      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

<style scoped>
.btn-primary {
  margin: 5px 5px;
}

#input-group-1 {
  margin-top: 5px;
}
</style>


