<template>
  <div>
    <top-nav />
    <main-nav />
    <v-container>
      <v-row>
        <v-col style="text-align: center">
          <h1>Recent Activities</h1>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row id="main-property">
        <v-col cols="12" xl="2" lg="3" md="4" sm="6" xs="12">
          <v-card class="mx-auto" max-width="344">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              height="200px"
            ></v-img>

            <v-card-title> Searched property </v-card-title>

            <v-card-subtitle> 2 days ago </v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12" xl="2" lg="3" md="4" sm="6" xs="12">
          <v-card class="mx-auto" max-width="344">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              height="200px"
            ></v-img>

            <v-card-title> Updated profile </v-card-title>

            <v-card-subtitle> 2 days ago </v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12" xl="2" lg="3" md="4" sm="6" xs="12">
          <v-card class="mx-auto" max-width="344">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              height="200px"
            ></v-img>

            <v-card-title> Listed property </v-card-title>

            <v-card-subtitle> 2 days ago </v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12" xl="2" lg="3" md="4" sm="6" xs="12">
          <v-card class="mx-auto" max-width="344">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              height="200px"
            ></v-img>

            <v-card-title> Rented property </v-card-title>

            <v-card-subtitle> 2 days ago </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <Footer />
  </div>
</template>

<script>
import Footer from "./Footer.vue";
import MainNav from "./MainNav.vue";
import TopNav from "./TopNav.vue";

export default {
  components: { Footer, MainNav, TopNav },
  name: "RecentActivities",

  data: () => ({
    show: false,
    like: false,
    vendors: [],
    // vendor_category_id_to_search_by: this.vendor_category_id,
  }),
};
</script>

<style>
</style>