<template>
  <div class="main-div">
    <top-nav />
    <main-nav />

    <v-container>
      <div style="text-align: center">
        <h3 style="color: white">Add A property</h3>
        <h4 style="color: #b9cbdb">Almost there Step 3/3</h4>
      </div>
      <br />

      <v-row id="form-row">
        <h3 style="margin: 0.7em">Add Nearby Landmark</h3>
        <v-col cols="12" md="12">
          <v-row>
            <v-col class="d-flex" cols="12" sm="6">
              <v-text-field
                class="custom-label-color"
                label="Landmark Name"
                color="blue"
                solo
              ></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6">
              <v-text-field
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
                :items="items"
                label="Select Landmark Type"
                solo
              ></v-select>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6">
              <v-text-field
                class="custom-label-color"
                label="Description"
                color="blue"
                solo
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row style="margin: 0 5px;">
                <v-col cols="12" sm="12">
                    <h3>Add Landmark Photos</h3>
                    <v-row>
                        <v-col cols="12" md="10">
                            <v-row>
                                <v-col cols="12" md="3">
                                    <v-img src="../assets/houseview1.png" :lazy-src="`https://picsum.photos/10/6?image=${
                            n * 5 + 10
                          }`" aspect-ratio="1" class="grey lighten-2" height="200"></v-img>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-img src="../assets/houseview1.png" :lazy-src="`https://picsum.photos/10/6?image=${
                            n * 5 + 10
                          }`" aspect-ratio="1" class="grey lighten-2" height="200"></v-img>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-img src="../assets/houseview1.png" :lazy-src="`https://picsum.photos/10/6?image=${
                            n * 5 + 10
                          }`" aspect-ratio="1" class="grey lighten-2" height="200"></v-img>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-img src="../assets/houseview1.png" :lazy-src="`https://picsum.photos/10/6?image=${
                            n * 5 + 10
                          }`" aspect-ratio="1" class="grey lighten-2" height="200"></v-img>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" md="2">
                            <div style="margin-left: 50px; margin-top: 80px;">
                                <v-file-input style="border-radius: 50%; width: 90px; height: 90px" :rules="rules" accept="image/png, image/jpeg, image/bmp" prepend-icon="mdi-camera" solo />
                                <img src="https://res.cloudinary.com/diued7ugb/image/upload/v1625948824/lvqxdmbxghuf81nqey5p.png" alt="" width="50" style="
                  position: absolute;
                  margin-top: -91px;
                  margin-left: 36px;
                  background: white;
                  padding: 10px;
                  border-radius: 50%;
                  cursor: pointer;
                " srcset="" />
                            </div>
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
            <v-btn style="background-color: #3b6ef3; width: 200px">
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

export default {
  name: "RegisterProperty3",
  data: () => ({
    rules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        "Avatar size should be less than 2 MB!",
    ],
  }),
  components: {
    TopNav,
    MainNav,
    BottonNav,
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
