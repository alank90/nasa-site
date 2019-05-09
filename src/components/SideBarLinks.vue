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
      <b-list-group-item
        v-show="displayApod"
        v-on:click="sendDataApod()"
        href="#"
      >Astronomy Picture of the Day</b-list-group-item>
      <b-list-group-item v-b-toggle="'collapse-2'" class="m-1">NASA Images Library</b-list-group-item>
      <b-collapse id="collapse-2">
        <b-list-group-item href="#">
          <!--=============== Vuelidate Markup ========================== -->
          <div v-if="$v.formResponses.q.$error">
            <p class="error" v-if="!$v.formResponses.q.required">Query is required</p>
            <p
              class="error"
              v-if="!$v.formResponses.q.minLength"
            >Query must have at least {{$v.formResponses.q.$params.minLength.min}} letters.</p>
          </div>

          <!-- Validation for media_type  -->

          <div v-if="$v.formResponses.media_type.$error">
            <p class="error" v-if="!$v.formResponses.media_type.required">Media Type is required</p>
          </div>

          <!-- ================ End Vuelidate  Markup ============== -->

          <!-- ==================================================================== -->
          <!-- =========== Form Markup ============================================ -->
          <!-- ==================================================================== -->

          <b-form v-if="show">
            <b-form-group id="input-group-1" label="* Enter Query" label-for="input-1">
              <b-form-input
                :class="status($v.formResponses.q)"
                id="input-1"
                v-model.lazy="$v.formResponses.q.$model"
                type="text"
                required
                placeholder="e.g. apollo 11 landing"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Search Media Type" label-for="input-2">
              <b-form-input
                :class="status($v.formResponses.media_type)"
                id="input-2"
                v-model.lazy="$v.formResponses.media_type.$model"
                type="text"
                placeholder="Enter media-type e.g. image"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Search Start Year" label-for="input-3">
              <b-form-input
                id="input-3"
                v-model="formResponses.year_start"
                type="text"
                placeholder="optional"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" label="Search End Year" label-for="input-4">
              <b-form-input
                id="input-4"
                v-model="formResponses.year_end"
                type="text"
                placeholder="optional"
              ></b-form-input>
            </b-form-group>

            <b-button
              v-on:click="onSubmit"
              variant="primary"
              :disabled="submitStatus === 'PENDING'"
            >Submit</b-button>
            <b-button v-on:click="onReset" variant="danger">Reset</b-button>
          </b-form>

          <!-- ==================================================================== -->
          <!-- =========== End Form Markup ======================================== -->
          <!-- ==================================================================== -->
        </b-list-group-item>
      </b-collapse>
      <b-list-group-item href="#">Action links are easy</b-list-group-item>
      <b-list-group-item href="#foobar" disabled>Disabled link</b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "SideBarLinks",
  data() {
    // ========= Component Data Here ===================== //
    return {
      displayBackToFront: false,
      displayApod: true,
      formResponses: {
        q: "",
        media_type: "",
        year_start: "",
        year_end: ""
      },
      submitStatus: null,
      validMediaTypeValues: ["image", "audio"],
      show: true
    };
  },
  validations: {
    // ====== Vuelidate Options Object Declaration ========= //
    formResponses: {
      q: {
        required,
        minLength: minLength(2)
      },
      media_type: {
        required
      }
    }
  },
  methods: {
    //  ============== Event Bus Logic Here ============================ //
    sendDataMainView() {
      this.$eventBus.$emit("send-data", "MainView");
      if (this.displayBackToFront === true) {
        this.displayBackToFront = false;
        this.displayApod = true;
      }
    },
    sendDataApod() {
      this.$eventBus.$emit("send-data", "Apod");
      if (this.displayBackToFront === false) {
        this.displayBackToFront = true;
        this.displayApod = false;
      }
    }, // ============== Submit Form QueryLogic Here ============================ //
    onSubmit(evt) {
      evt.preventDefault();

      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        let uri = `https://images-api.nasa.gov/search?`;
        // This is .reduce method for objects. If key value is empty
        // string delete it.
        Object.entries(this.formResponses).forEach(([key, value]) => {
          if (value === "") {
            delete this.formResponses[key];
          } else {
            uri += `${key}=${this.formResponses[key]}&`; // Build the url request
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
      }
    }, // ======================= Reset Form Logic Here ============================= //
    onReset(evt) {
      evt.preventDefault();

      // reset formResponses values
      this.formResponses.q = "";
      this.formResponses.media_type = "";
      this.formResponses.year_start = "";
      this.formResponses.year_end = "";
      // Trick to reset/clear native browser formResponses validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }, // ======================= Vuelidate Logic Here ============================================ //
    status(validation) {
      console.log(validation.$error);
      console.log(validation.$dirty);
      // Check if $v.formResponses.q.$error || $dirty are true and return objects for class to show or not
      return {
        error: validation.$error,
        dirty: validation.$dirty
      };
    } // ==================== End of Vuelidate Logic ====================================== //
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

input {
  border: 1px solid silver;
  border-radius: 4px;
  background: white;
  padding: 5px 10px;
}

.btn-primary {
  margin-right: 5px;
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

.error:focus {
  outline-color: #f99;
}
/* ============== End Vuelidate Error Stylings ============ */
</style>