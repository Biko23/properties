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
        <v-col class="d-flex" cols="12" sm="6">
          <v-select :items="items" label="Select Category" solo></v-select>
        </v-col>

        <v-col class="d-flex" cols="12" sm="6">
          <v-text-field class="custom-label-color" solo></v-text-field>
        </v-col>

        <v-col class="d-flex" cols="12" sm="6">
          <v-select
            :items="items"
            label="Select Property Location"
            solo
          ></v-select>
        </v-col>

        <v-col cols="12" sm="6">
          <h3>Add A Photo</h3>
          <p style="font-size: 12px; margin-right: 100px; font-style: normal">
            Add at least 4 photos for this category. First picture - is the
            title picture. You can change the order of photos: just grab your
            photos and drag
          </p>
          <v-file-input
            style="border-radius: 60%; width: 100px; height: 70px"
            :rules="rules"
            accept="image/png, image/jpeg, image/bmp"
            prepend-icon="mdi-camera"
            solo
          />
          <span style="margin-left: 56px; margin-top: -100px">
            <button>
              <img
                src="https://res.cloudinary.com/diued7ugb/image/upload/v1625948824/lvqxdmbxghuf81nqey5p.png"
                alt=""
                width="20"
                srcset=""
                style="margin-top: -71px; position: absolute"
              />
            </button>
          </span>

          <p style="font-size: 12px; margin-right: 100px">
            Each picture must not exceed 5 Mb Supported formats are *.jpg, *.gif
            and *.png
          </p>
        </v-col>
        <v-col class="d-flex" cols="12" sm="6" id="description">
          <v-textarea
            solo
            name="input-7-5"
            label="Property Description"
            rows="8"
          ></v-textarea>
        </v-col>
        
        <v-col><a href="/register2" style="text-decoration:none;">
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
              Next Step</span
            >
          </v-btn>
          </a>
        </v-col> </v-row
      ><br />
    </v-container>

    <botton-nav />

   
  </div>
</template>

<script>
import TopNav from "@/components/TopNav.vue";
import MainNav from "@/components/MainNav.vue";
import BottonNav from '../components/BottonNav.vue';

export default {
  name: "RegisterProperty",
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
#col-hidden{
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
  #col-hidden{
    display: block;
}
}
</style>