<template>
  <div>
    <top-nav />
    <main-nav />
    <v-container>
      <v-row>
        <v-col style="text-align: center">
          <h1>List of trusted service providers</h1>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row id="main-property">
        <v-col
          cols="12"
          xl="2"
          lg="3"
          md="4"
          sm="6"
          xs="12"
          v-for="vendor in allVendors"
          :key="vendor.vendor_id"
        >
          <service-provider-card
            :vendor_name="vendor.vendor_name"
            :vendor_primary_phone_number="vendor.vendor_primary_phone_number"
            :vendorCategory="vendor.vendorCategory.vendor_category_name"
            :src="'http://localhost:8091/' + vendor.vendorCategory.snapshot"
            :points="vendor.points"
          >
            <div>
              <v-btn icon color="primary" @click="likingVendor(vendor)">
                <v-icon>mdi-thumb-up</v-icon>
              </v-btn>
              <v-btn icon @click="unlikingVendor(vendor)">
                <v-icon>mdi-thumb-down</v-icon>
              </v-btn>
            </div>
          </service-provider-card>
          <!-- C:\Users\A241901\Documents\project\stanbicproperties-marketplace\property-visuals\src\main\resources\uploads -->
        </v-col>
      </v-row>
    </v-container>
    <Footer />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Footer from "./Footer.vue";
import MainNav from "./MainNav.vue";
import TopNav from "./TopNav.vue";
import ServiceProviderCard from "./ServiceProviderCard.vue";
export default {
  components: {
    Footer,
    MainNav,
    TopNav,
    ServiceProviderCard,
  },
  name: "ServiceProviderComponent",
  props: ["vendor_category_id"],
  data: () => ({
    show: false,
    like: false,
    currentVendorCategoryId: this.vendorCategoryId || this.vendor_category_id,
  }),
  computed: {
    ...mapGetters(["allVendors", "currentLoggedinUser", "likeState", "vendorCategoryId"]),
  },
  created() {
    this.fetchVendors(this.vendor_category_id);
  },
  watch: {
      vendorCategoryId: async function(){
        try {
          await this.fetchVendors(this.vendorCategoryId);
        } catch (error) {
          console.log(error);
        }
      }
  },
  methods: {
    ...mapActions(["fetchVendors", "likeVendor", "unLikeVendor"]),
    async likingVendor(item) {
      const data = {
        vendor_id: item.vendor_id,
        liked_by: this.currentLoggedinUser.user_id,
      };
      try {
        const response = await this.likeVendor(data);
        console.log(response);
        // if (response.status === 201 || response.status === 200) {
        //  this.like = true;
        // }
      } catch (error) {
        console.log(error);
      }
    },

    async unlikingVendor(item) {
      const data = {
        vendor_id: item.vendor_id,
        disliked_by: this.currentLoggedinUser.user_id,
      };
      try {
        const response = await this.unLikeVendor(data);
        console.log(response);
        if (response.status === 201 || response.status === 200) {
          this.like = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>
