<template>
  <div>
    <b-form class="epicForm" v-if="show">
      <b-form-group id="input-group-1" label="Color Image:" label-for="input-1">
        <b-form-select id="input-1" v-model="epicForm.selected" :options="epicForm.options"></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-2" label="Pick a Date For Pictures" label-for="input-2">
        <b-form-input
          else
          id="datePicked"
          :value="getToday"
          type="date"
          format="yyyymmdd"
          name="date2"
        ></b-form-input>
        <!-- Validation for selectedDate ----- -->
        <span
          class="checkmark"
          v-if="!$v.epicForm.selectedDate.$error && $v.epicForm.selectedDate.$dirty"
        >&#128504;</span>
        <div v-if="$v.epicForm.selectedDate.$error">
          <p
            class="error-message"
            v-if="!$v.epicForm.selectedDate.between"
          >EPIC Database Pictures between July 2015 thru Present</p>
        </div>
      </b-form-group>

      <b-button @click.prevent="onSubmit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import { required, minLength, between } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      epicForm: {
        selected: null,
        options: [
          { value: null, text: "Select One" },
          { value: "natural", text: "Natural Color Imagery" },
          { value: "enhanced", text: " Enhanced Color Imagery" }
        ],
        selectedDate: ""
      },
      show: true
    };
  },
  validations: {
    epicForm: {
      selectedDate: {
        between: between(2015, 2019)
      }
    }
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
      let datePicked = document.getElementById("datePicked").value;
      console.log(datePicked);
      // date needs format https://epic.gsfc.nasa.gov/api/natural/date/YYYYMMDD
      datePicked = this.convertDate(datePicked);
      this.noApiResults = false;

      let url = `https://epic.gsfc.nasa.gov/api/${this.epicForm.selected}/date/${datePicked}`;

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

<style>
select#input-1 {
  max-width: 60%;
  margin: 0 auto;
}

input[name="date2"] {
  max-width: 60%;
  margin: 0 auto;
}
</style>


<style scoped>
.btn-primary {
  margin: 5px 5px;
}

#input-group-1,
#input-group-2 {
  margin-top: 5px;
  font-size: 1.3rem;
}

.epicForm {
  width: 85%;
  border-radius: 7px;
  margin: 0 auto;
  background-color: rgba(68, 124, 167, 0.8);
  color: skyblue;
  text-align: center;
  transition: all 0.2s linear;
}

.epicForm:hover {
  background-color: rgba(68, 124, 167, 0.6);
  color: #fff;
}

span.checkmark {
  position: absolute;
  top: 10px;
  color: green;
  font-size: 45px;
  margin-left: 10px;
}

/*  ================== Vuelidate Error Stylings ================ */
.dirty {
  border-color: #5a5;
  background: #efe;
}

.dirty:focus {
  outline-color: #8e8;
}

.error {
  border-color: red;
  color: red;
  background: #fdd;
}
p.error {
  font-weight: 600;
  border-radius: 5px;
}
.error-message {
  color: red;
  font-size: 12px;
  font-weight: 200;
  margin-top: 2px;
}

.error:focus {
  outline-color: #f99;
}
/* ============== End Vuelidate Error Stylings ============ */
</style>


