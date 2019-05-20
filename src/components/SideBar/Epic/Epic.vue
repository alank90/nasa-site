<template>
  <div>
    <b-form v-if="show">
      <b-form-group id="input-group-1" label="Color Image:" label-for="input-1">
        <b-form-select id="input-1" v-model="selected" :options="options">
          <b-card>Hello!</b-card>
        </b-form-select>
      </b-form-group>

      <b-button type="submit" @click.prevent="onSubmit" variant="primary">Submit</b-button>
      <b-button type="reset" @click.prevent="onReset" variant="danger">Reset</b-button>
    </b-form>

    <b-card class="mt-3" header="Form Data Result">
      <div class="mt-3">
        Selected:
        <strong>{{ selected }}</strong>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      epicForm: {
        test: "Test1"
      },
      selected: null,
      options: [
        { value: null, text: "Select One" },
        { value: "natural", text: "Natural Color Imagery" },
        { value: "enhanced", text: " Enhanced Color Imagery" }
      ],
      show: true
    };
  },
  methods: {
    onSubmit(event) {
      console.log(JSON.stringify(this.selected));
    },
    onReset(event) {
      // Reset our form values
      this.selected = null;
      console.log("Reset Button!");
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

