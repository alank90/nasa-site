<template>
  <div>
    <b-form class="epicForm" v-if="show">
      <b-form-group id="input-group-1" label="Color Image:" label-for="input-1">
        <b-form-select id="input-1" v-model="epicForm.selected" :options="epicForm.options"></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-2" label="Pick a Date For Pictures" label-for="input-2">
        <!--  ref attribute allows us access to component datepicker's data object -->
        <datepicker else ref="datePicked" :value="getToday" format="YYYY-M-D" name="date2"></datepicker>
      </b-form-group>

      <b-button @click.prevent="onSubmit" variant="primary">Submit</b-button>
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
  computed: {
    getToday: function() {
      let today = new Date();
      let dd = String(today.getDate() - 1);
      let mm = String(today.getMonth() + 1); //January is 0!
      let yyyy = today.getFullYear();

      today = `${yyyy}-${mm}-${dd}`;

      return today;
    }
  },
  methods: {
    onSubmit(event) {
      let datePicked = this.$refs.datePicked.pickedValue;
      datePicked = this.convertDate(datePicked);
      this.noApiResults = false;

      // date needs format https://epic.gsfc.nasa.gov/api/natural/date/YYYYMMDD
      let url = `https://epic.gsfc.nasa.gov/api/${
        this.epicForm.selected
      }/date/${datePicked}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          const results = data;

          // Change View to epicSearchResults in Home.vue
          this.$eventBus.$emit("send-data", "epicSearchResults");

          if (this.displayBackToFront === false) {
            this.displayBackToFront = true;
          }

          // Send NASA Search Data for EPIC date results on event Bus to Home.vue
          this.$eventBus.$emit("nasa-data", results);
        });
    },
    convertDate(date) {
      let convertedDate = "";
      let d = date.split("-");

      d.forEach(element => {
        // Pad mm and dd w/zero if necessary
        if (element.length === 1) {
          element = "0" + element;
        }
        convertedDate += element;
      });

      return convertedDate;
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

.epicForm {
  border-radius: 5px;
  background-color: rgba(68, 124, 167, 0.8);
  color: skyblue;
  text-align: center;
  transition: all 0.2s linear;
}

.epicForm:hover {
  background-color: rgba(68, 124, 167, 0.6);
  color: #fff;
}

input[name="date2"] {
  width: 3vw;
}
</style>


