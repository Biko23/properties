<template>
  <div class="main-div">
    <top-nav />
    <main-nav />

    <v-container>
      <div style="text-align: center">
        <h3 style="color: white">Add A property</h3>
        <h4 style="color: #b9cbdb">Final Step 3/3</h4>
      </div>
      <br />

      <v-row id="form-row">
        <h3 style="margin: 0.7em">Add Nearby Landmark</h3>
        <v-col cols="12" md="12">
          <v-row>
            <v-col class="d-flex" cols="12" sm="6">
              <v-text-field
                v-model="property.landmark_name"
                class="custom-label-color"
                label="Landmark Name"
                color="blue"
                solo
              ></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6">
              <v-text-field
                v-model="property.distance_from_property"
                class="custom-label-color"
                label="Distance from property"
                color="blue"
                solo
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <br />

        <v-col cols="12" md="12">
          <v-row>
            <v-col class="d-flex" cols="12" sm="6">
              <v-select
                v-model="property.landmark_type_id"
                :items="allPropertyLandmarkTypes"
                label="Select Landmark Type"
                solo
              ></v-select>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6">
              <v-text-field
                v-model="property.description"
                class="custom-label-color"
                label="Description"
                color="blue"
                solo
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row style="margin: 0 5px">
            <v-col cols="12" sm="12">
              <h3>Add Landmark Photos</h3>
              <v-row>
                <v-col cols="12" md="12">
                  <UploadImages
                    style="background-color: #e7f0ff"
                    :max="4"
                    uploadMsg="click or drag n' drop images"
                    fileError="images files only accepted"
                    clearAll="Clear"
                    @changed="handleImages"
                  />
                </v-col>
              </v-row>
              <p style="font-size: 12px; margin-right: 100px">
                Each picture must not exceed 5 Mb Supported formats are *.jpg,
                *.gif and *.png
              </p>
            </v-col>
          </v-row>
        </v-col>
        <br />
        <v-row>
          <v-col
            class="mb-3 mr-3"
            style="
              display: flex;
              flex-direction: row;
              justify-content: flex-end;
            "
          >
            <v-btn
              style="background-color: #3b6ef3; width: 200px"
              @click="submitFinalData"
            >
              <span
                style="
                  color: #ffffff;
                  font-size: 18px;
                  font-style: normal;
                  font-weight: 300;
                  line-height: 30px;
                  letter-spacing: 0em;
                  text-align: center;
                  text-transform: capitalize;
                "
              >
                Submit</span
              >
            </v-btn>
          </v-col>
        </v-row> </v-row
      ><br />
    </v-container>
    <botton-nav />
  </div>
</template>

<script>
import TopNav from "@/components/TopNav.vue";
import MainNav from "@/components/MainNav.vue";
import BottonNav from "../components/BottonNav.vue";
import { mapGetters, mapActions } from "vuex";
import UploadImages from "vue-upload-drop-images";

export default {
  name: "RegisterProperty3",
  data: () => ({
    rules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        "Avatar size should be less than 2 MB!",
    ],
    property: {
      landmark_name: "",
      distance_from_property: "",
      landmark_type_id: 0,
      description: "",
      landmarkVisuals: [],
    },
  }),
  components: {
    TopNav,
    MainNav,
    BottonNav,
    UploadImages,
  },
  created() {
    this.fetchPropertyLandmarkTypes();
  },
  methods: {
    ...mapActions([
      "fetchPropertyLandmarkTypes",
      "addPropertyDataFromPageThird",
      "submitAllPropertyData"
    ]),
    handleImages(files) {
      this.property.landmarkVisuals.splice(
        0,
        this.property.landmarkVisuals.length
      );
      this.property.landmarkVisuals.push(...files);
    },
    submitFinalData() {
      this.addPropertyDataFromPageThird(this.property).then(() => {
        this.submitAllPropertyData();
        this.$router.push("/register");
      });
    },
  },
  computed: {
    ...mapGetters(["allPropertyLandmarkTypes"]),
  },
};
</script>

<style scoped>
.main-div {
  background-color: #3b6ef3;
}

#form-row {
  background-color: #e7f0ff;
  width: 1000px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 6px;
}

.custom-placeholer-color input::placeholder {
  color: red !important;
  opacity: 1;
}

.custom-label-color .v-label .solo {
  color: blue;
  opacity: 1;
}

@media only screen and (max-width: 768px) {
  .main-div {
    background-color: #3b6ef3;
    height: auto;
  }

  #form-row {
    background-color: #e7f0ff;
    width: auto;
    margin-left: auto;
    margin-right: auto;
    border-radius: 6px;
  }
}
</style>
