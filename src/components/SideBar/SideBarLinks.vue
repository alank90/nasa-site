/*    /src/components/SideBarLinks.vue 
 Note: The sendData Methods are used to emit an event on click
 that is wired up to a listener in the Home view which will display
 correct picture in MainView depending on currentView state */

<template>
  <div>
    <b-img src="../../assets/nasa.png" fluid alt="NASA Logo">NASA Links</b-img>

    <b-list-group>
      <b-list-group-item
        v-show="displayBackToFront"
        v-on:click="sendDataMainView"
        href="#"
        class="mt-3"
      >Back to Front</b-list-group-item>
      <b-list-group-item
        v-show="displayApod"
        v-on:click="sendDataApod()"
        href="#"
        class="mt-3"
      >Astronomy Picture of the Day</b-list-group-item>
      <b-list-group-item v-b-toggle="'collapse-2'" class="mt-2">NASA Images Library</b-list-group-item>
      <b-collapse id="collapse-2">
        <b-list-group-item href="#">
          <!-- ==================================================================== -->
          <!-- =========== Form Markup NASA Image Library ========================= -->
          <!-- ==================================================================== -->
          <b-form v-if="show">
            <b-form-group id="input-group-1" label="* Enter Query" label-for="input-1">
              <!-- The :class directive determines the presence of the classes "error"
              and "dirty". The status() method assigns true or false values to error and 
              dirty objects determining presenece or absence of these classes.-->
              <b-form-input
                :class="status($v.formResponses.q)"
                id="input-1"
                v-model.lazy="$v.formResponses.q.$model"
                type="text"
                placeholder="e.g. apollo 11 landing"
              ></b-form-input>

              <!-- Validation for q  -->
              <span
                class="checkmark"
                v-if="!$v.formResponses.q.$error && $v.formResponses.q.$dirty"
              >&#128504;</span>
              <div v-if="$v.formResponses.q.$error">
                <p class="error-message" v-if="!$v.formResponses.q.required">Query is required</p>
                <p
                  class="error-message"
                  v-if="!$v.formResponses.q.minLength"
                >Query must have at least {{$v.formResponses.q.$params.minLength.min}} letters.</p>
              </div>
            </b-form-group>

            <b-form-group id="input-group-2" label="*Media Type" label-for="input-2">
              <b-form-select
                v-model="formResponses.media_type"
                :class="status($v.formResponses.media_type)"
                id="input-2"
                v-model.lazy="$v.formResponses.media_type.$model"
              >
                <option :value="null">Please select an option</option>
                <option value="image">Image</option>
                <option value="audio">Audio</option>
              </b-form-select>
              <!-- Validation for media_type  -->
              <span
                class="checkmark"
                v-if="!$v.formResponses.media_type.$error && $v.formResponses.media_type.$dirty"
              >&#128504;</span>
              <div v-if="$v.formResponses.media_type.$error">
                <p
                  class="error-message"
                  v-if="!$v.formResponses.media_type.required"
                >*A Media Type is required</p>
              </div>
            </b-form-group>

            <b-form-group id="input-group-3" label="Search Start Year" label-for="input-3">
              <b-form-input
                :class="status($v.formResponses.year_start)"
                id="input-3"
                v-model.lazy="$v.formResponses.year_start.$model"
                type="text"
                placeholder="optional"
              ></b-form-input>
              <!-- Validation for year_start ----- -->
              <span
                class="checkmark"
                v-if="!$v.formResponses.year_start.$error && $v.formResponses.year_start.$dirty"
              >&#128504;</span>
              <div v-if="$v.formResponses.year_start.$error">
                <p
                  class="error-message"
                  v-if="!$v.formResponses.year_start.between"
                >Year Range is 1959 thru 2019</p>
              </div>
            </b-form-group>

            <b-form-group id="input-group-4" label="Search End Year" label-for="input-4">
              <b-form-input
                :class="status($v.formResponses.year_end)"
                id="input-4"
                v-model.lazy="$v.formResponses.year_end.$model"
                type="text"
                placeholder="optional"
              ></b-form-input>
              <!-- Validation for year_end ----- -->
              <span
                class="checkmark"
                v-if="!$v.formResponses.year_end.$error && $v.formResponses.year_end.$dirty"
              >&#128504;</span>
              <div v-if="$v.formResponses.year_end.$error">
                <p
                  class="error-message"
                  v-if="!$v.formResponses.year_end.between"
                >Year Range is 1959 thru 2019</p>
                <p
                  class="error-message"
                  v-if="!$v.formResponses.year_end.checkYearEnd"
                >Recheck End Year.</p>
              </div>
            </b-form-group>

            <b-button
              v-on:click="onSubmit"
              variant="primary"
              :class="buttonState"
              :disabled="$v.formResponses.$invalid"
            >Submit</b-button>
            <b-button v-on:click="onReset" variant="danger">Reset</b-button>
          </b-form>

          <!-- ==================================================================== -->
          <!-- =========== End Form Markup NASA Image Library ===================== -->
          <!-- ==================================================================== -->
        </b-list-group-item>
      </b-collapse>

      <!-- ==================================================================== -->
      <!-- ==============EPIC Markup ========================================== -->
      <!-- ==================================================================== -->

      <b-list-group-item v-b-toggle="'collapse-3'" class="mt-2">EPIC</b-list-group-item>
      <b-collapse id="collapse-3">
        <Epic/>
      </b-collapse>

      <!-- ==================================================================== -->
      <!-- ============== End of EPIC Markup ================================== -->
      <!-- ==================================================================== -->

      <!-- ====================================================================== -->
    </b-list-group>
  </div>
</template>

<script>
import { required, minLength, between } from "vuelidate/lib/validators";
import Epic from "@/components/SideBar/Epic/Epic.vue";

export default {
  name: "SideBarLinks",
  components: { Epic },
  data() {
    // ========= Component Data Here ===================== //
    return {
      displayBackToFront: false,
      displayApod: true,
      formResponses: {
        q: "",
        media_type: null,
        year_start: "",
        year_end: ""
      },
      show: true
    };
  },
  validations: {
    // ====== Vuelidate Options Object Declaration ========== //
    // Note that custom validations are functions that return //
    // true or false ======================================== //
    formResponses: {
      q: {
        required,
        minLength: minLength(2)
      },
      media_type: {
        required
      },
      year_start: {
        between: between(1959, 2019)
      },
      year_end: {
        between: between(1959, 2019),
        checkYearEnd() {
          if (this.formResponses.year_end == "") {
            return true;
          } else {
            return (
              parseInt(this.formResponses.year_end) >=
              parseInt(this.formResponses.year_start)
            );
          }
        }
      }
    }
  },
  computed: {
    // ====== Toggle Submit button disabled state ============= //
    buttonState: function() {
      let theClass = "button-disabled";
      if (!this.$v.formResponses.$invalid) {
        theClass = "button-enabled";
      }
      return theClass;
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
    }, // =========== Submit Form QueryLogic for Nasa Images Library Here =========== //
    onSubmit(evt) {
      evt.preventDefault();

      let uri = `https://images-api.nasa.gov/search?`;
      // This is .reduce method for objects. If key value is empty
      // string delete it.
      Object.entries(this.formResponses).forEach(([key, value]) => {
        if (value === "" || this.formResponses[key] === "options") {
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

          // Change View to nasaImagesSearchResults in Home.vue
          this.$eventBus.$emit("send-data", "nasaImagesSearchResults");
          if (this.displayBackToFront === false) {
            this.displayBackToFront = true;
          }

          // Send NASA Search Data results on event Bus to Home.vue
          this.$eventBus.$emit("nasa-data", results);
        });
    }, // ======================= Reset Form Logic Here ============================= //
    onReset(evt) {
      evt.preventDefault();

      // reset formResponses values
      this.formResponses.q = "";
      this.formResponses.media_type = null;
      this.formResponses.year_start = "";
      this.formResponses.year_end = "";
      this.$v.$reset();
      // Trick to reset/clear native browser formResponses validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }, // ======================= Vuelidate Logic Here ============================================ //
    status(validation, e) {
      // Check if $v.formResponses.$form-name.$error || $dirty are true and return objects for class to show or not
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
.list-group-item {
  border-radius: 5px;
  background-color: rgba(68, 124, 167, 0.8);
  color:skyblue;
}

.list-group-item-action:hover,
.list-group-item:hover {
  background-color: rgba(68, 124, 167, 0.6);
  cursor: pointer;
  color: #fff;
}

.img-fluid {
  max-width: 70%;
}

.form-group {
  /* creates a reference block for the checkmark absolute position */
  position: relative;
}

input {
  border: 1px solid silver;
  border-radius: 4px;
  background: white;
  padding: 5px 10px;
}

input.dirty {
  display: inline-block;
  max-width: 70%;
}

span.checkmark {
  position: absolute;
  top: 10px;
  color: green;
  font-size: 45px;
  margin-left: 10px;
}

.btn-primary {
  margin-right: 5px;
  margin-bottom: 5px;
}

.button-disabled {
  cursor: not-allowed;
}
.button-enabled {
  cursor: pointer;
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