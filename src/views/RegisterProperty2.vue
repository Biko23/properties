<template>
  <div class="main-div">
    <top-nav />
    <main-nav />

    <v-container>
      <div style="text-align: center">
        <h3 style="color: white">Add A property</h3>
        <h4 style="color: #b9cbdb">Almost there Step 2/3</h4>
      </div>
      <br />
      <v-row id="form-row">
        <v-col class="d-flex" cols="12" sm="6">
          <v-text-field
            class="custom-label-color"
            label="Expected Value"
            color="blue"
            v-model="property.expected_value"
            solo
          ></v-text-field>
        </v-col>
        <br />
        <!--  -->
        <v-row style="margin: 0 5px">
          <v-col cols="12" sm="12">
            <h3>Add Neighborhood Photos</h3>
            <v-row>
              <v-col cols="12" md="12">
                 <v-row>
                    <v-col cols="12" md="12">
                      <v-text-field
                        v-model="property.description"
                        class="custom-label-color"
                        label="Visual description"
                        solo
                      ></v-text-field>
                    </v-col>
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
              </v-col>
            </v-row>

            <p style="font-size: 12px; margin-right: 100px">
              Each picture must not exceed 5 Mb Supported formats are *.jpg,
              *.gif and *.png
            </p>
          </v-col>
        </v-row>

        <!--  -->
        <v-col class="d-flex" cols="12" sm="6">
          <h5 style="color: #3b6ef3">
            This Information helps us and customers to compare products so we
            encourange you to be precise as possible.
          </h5>
        </v-col>
        <v-col class="d-flex" cols="12" sm="6"></v-col>
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
              @click="storePropertyData"
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
                Next Step</span
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
import UploadImages from "vue-upload-drop-images";
import { mapActions } from 'vuex';

export default {
  name: "RegisterProperty2",
  data: () => ({
    rules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        "Avatar size should be less than 2 MB!",
    ],
    property: {
      expected_value: "",
      description: "",
      neighborhoodVisuals: [],
    },
  }),
  components: {
    TopNav,
    MainNav,
    BottonNav,
    UploadImages,
  },
  methods: {
    ...mapActions(["addPropertyDataFromPageTwo"]),
    handleImages(files) {
      this.property.neighborhoodVisuals.splice(
        0,
        this.property.neighborhoodVisuals.length
      );
      this.property.neighborhoodVisuals.push(...files);
    },
    storePropertyData() {
      this.addPropertyDataFromPageTwo(this.property).then(() =>
        this.$router.push("/register3")
      );
    },
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
