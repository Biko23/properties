<template>
  <div id="main-div">
    <top-nav />
    <main-nav />

    <v-container>
      <div style="text-align: center">
        <h3 style="color: white">Add A property</h3>
        <h4 style="color: #b9cbdb">Step 1/3</h4>
      </div>
      <br />
      <v-row id="form-row">
        <v-col cols="12" md="12">
          <v-row>
            <v-col class="d-flex" cols="12" sm="6">
              <v-select
                v-model="property.type"
                :items="allPropertyTypes"
                label="Select Property Type"
                solo
              ></v-select>
            </v-col>

            <v-col class="d-flex" cols="12" sm="6">
              <!-- Type as you search -->
              <v-text-field
                v-model="property.location"
                class="custom-label-color"
                label="Property Location"
                solo
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex" cols="12" sm="12">
              <v-combobox
                v-model="property.features"
                :items="allPropertyFeatures"
                label="Select Feature"
                multiple
                solo
              ></v-combobox>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <h3>Add Property Photo</h3>
              <p
                style="font-size: 12px; margin-right: 100px; font-style: normal"
              >
                Add at least 4 photos for this category. First picture - is the
                title picture. You can change the order of photos: just grab
                your photos and drag
              </p>
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
          <v-row>
            <v-col
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
          </v-row>
        </v-col>
      </v-row>
      <br />
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
  name: "RegisterProperty",
  data: () => ({
    // rules: [
    //   (value) =>
    //     !!value ||
    //     value.size < 5000000 ||
    //     "Avatar size should be less than 5 MB!",
    // ],
    property: {
      type: "",
      location: "",
      description: "",
      features: [],
      visuals: [],
    },
    hide: true,
  }),
  components: {
    TopNav,
    MainNav,
    BottonNav,
    UploadImages,
  },
  methods: {
    ...mapActions([
      "fetchPropertyTypes",
      "fetchPropertyFeatures",
      "addPropertyDataFromPageOne",
    ]),
    handleImages(files) {
      this.property.visuals.splice(0, this.property.visuals.length);
      this.property.visuals.push(...files);
    },
    storePropertyData() {
      this.addPropertyDataFromPageOne(this.property).then(() =>
        this.$router.push("/register2")
      );
    },
  },
  computed: { ...mapGetters(["allPropertyTypes", "allPropertyFeatures"]) },
  created() {
    this.fetchPropertyTypes();
    this.fetchPropertyFeatures();
  },
};
</script>

<style scoped>
#main-div {
  background-color: #3b6ef3;
}

#form-row {
  background-color: #e7f0ff;
  width: 1000px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 6px;
}

#description {
  margin-top: -200px;
}

.custom-placeholer-color input::placeholder {
  color: red !important;
  opacity: 1;
}

.custom-label-color .v-label .solo {
  color: blue;
  opacity: 1;
}

#col-hidden {
  display: none;
}

@media only screen and (max-width: 768px) {
  #main-div {
    background-color: #3b6ef3;
  }

  #form-row {
    background-color: #e7f0ff;
    width: auto;
    margin-left: auto;
    margin-right: auto;
    border-radius: 6px;
  }

  #description {
    margin-top: auto;
  }

  #col-hidden {
    display: block;
  }
}
</style>