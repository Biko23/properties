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
      <v-row
        id="form-row"
      >
        <v-col class="d-flex" cols="12" sm="6">
          <v-text-field
            class="custom-label-color"
            label="What's your price?"
            color="blue"
            solo
          ></v-text-field>
        </v-col>

        <v-col class="d-flex" cols="12" sm="6">
          <v-select :items="items" label="Negotiable?" solo></v-select>
        </v-col>

        <v-col class="d-flex" cols="12" sm="6">
          <v-text-field
            class="custom-label-color"
            label="Property Size"
            color="blue"
            solo
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            class="custom-label-color"
            label="Your Contact"
            color="blue"
            solo
          ></v-text-field>
        </v-col>
        <v-col class="d-flex" cols="12" sm="6">
          <v-text-field
            class="custom-label-color"
            label="Property Ownership"
            color="blue"
            solo
          ></v-text-field> </v-col
        ><br />
        <v-col class="d-flex" cols="12" sm="6">
          <h5 style="color: #3b6ef3">
            This Information helps us and customers to compare products so we
            encourange you to be precise as possible.
          </h5>
        </v-col>
        <v-col class="d-flex" cols="12" sm="6"></v-col>
        <v-col>
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
              Final Step</span
            >
          </v-btn>
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
  name: "RegisterProperty2",
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
.main-div{
    background-color: #3b6ef3;
    height: 100vh;
    
}
  #form-row{
         background-color: #e7f0ff;
          width: 1000px;
          margin-left: auto;
          margin-right: auto;
          border-radius:6px;
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
    .main-div{
    background-color: #3b6ef3;
    height: auto;
    
}
    #form-row{
         background-color: #e7f0ff;
          width: auto;
          margin-left: auto;
          margin-right: auto;
          border-radius:6px;
    }
}
</style>