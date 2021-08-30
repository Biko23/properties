<template>
  <div>
    <top-nav />
    <main-nav />
    <v-container>
      <!-- Like Dialog -->
      <v-dialog
        transition="dialog-top-transition"
        persistent
        v-model="likeDialog"
        max-width="600"
      >
        <template>
          <v-card>
            <v-toolbar color="blue" dark>Alert</v-toolbar>
            <v-card-text class="pt-5">
              <p style="font-size: 16px">{{ alertMessage }}</p>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="closeLikedDialog">ok</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
      <!-- end Like Dialog -->
      <v-row>
        <v-col style="text-align: center">
          <h1>
            List of trusted
            {{ allVendors[0].vendorCategory.vendor_category_name }}
          </h1>
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
          v-for="(vendor, index) in allVendors"
          :key="index"
        >
          <service-provider-card
            :vendor_name="vendor.vendor_name"
            :vendor_primary_phone_number="vendor.vendor_primary_phone_number"
            :vendorCategory="vendor.vendorCategory.vendor_category_name"
            :src="'http://localhost:8091/' + vendor.vendorCategory.snapshot"
            :points="vendor.points"
          >
            <template v-if="loginState">
              <!--  -->
              <template>
              <v-icon
                v-if="allLikedVendors.includes(vendor.vendor_id)"
                medium
                class="mr-2"
                color="primary"
                style="margin: 0 0 10px 10px"
                @click="vendorAlreadyLikedOrDisliked(1)"
                >mdi-thumb-up</v-icon
              >
              <v-icon
                v-else
                medium
                class="mr-2"
                style="margin: 0 0 10px 10px"
                @click="likingVendor(vendor.vendor_id)"
                >mdi-thumb-up</v-icon
              >
            </template>
              <!--  -->
              <!--  -->
              <template>
              <v-icon
                v-if="allUnlikedVendors.includes(vendor.vendor_id)"
                medium
                class="mr-2"
                color="primary"
                style="margin: 0 0 10px 10px"
                @click="vendorAlreadyLikedOrDisliked(2)"
                >mdi-thumb-down</v-icon
              >
              <v-icon
                v-else
                medium
                class="mr-2"
                style="margin: 0 0 10px 10px"
                @click="unlikingVendor(vendor.vendor_id)"
                >mdi-thumb-down</v-icon>
              </template>
              <!--  -->
            </template>
            <template v-else>
              <!--  -->
              <v-icon
                medium
                class="mr-2"
                style="margin: 0 0 10px 10px"
                @click="loginRequired(1)"
                >mdi-thumb-up</v-icon
              >
              <v-icon
                medium
                class="mr-2"
                style="margin-bottom: 5px"
                @click="loginRequired(2)"
                >mdi-thumb-down</v-icon
              >
              <!--  -->
            </template>
          </service-provider-card>
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
  data() {
    return {
      likeDialog: false,
      alertMessage: "",
      currentVendorCategoryId: this.vendorCategoryId || this.vendor_category_id,
    };
  },
  components: {
    Footer,
    MainNav,
    TopNav,
    ServiceProviderCard,
  },
  name: "ServiceProviderComponent",
  props: ["vendor_category_id"],
  computed: {
    ...mapGetters([
      "allVendors",
      "currentLoggedinUser",
      "loginState",
      "vendorCategoryId",
      "allLikedVendors",
      "allUnlikedVendors",
    ]),
  },
  created() {
    this.fetchVendors(this.vendor_category_id);
    this.fetchAllLikedVendorsByUserId();
    this.fetchAllUnlikedVendorsByUserId();
  },
  watch: {
    vendorCategoryId: async function () {
      try {
        await this.fetchVendors(this.vendorCategoryId);
      } catch (error) {
        console.log(error);
      }
    },
  },
  methods: {
    ...mapActions([
      "fetchVendors",
      "likeVendor",
      "unLikeVendor",
      "fetchAllLikedVendorsByUserId",
      "fetchAllUnlikedVendorsByUserId",
    ]),
    async likingVendor(vendor_id) {
      const data = {
        vendor_id: vendor_id,
        liked_by: this.currentLoggedinUser.user_id,
      };
      try {
        await this.likeVendor(data);
      } catch (error) {
        console.log(error);
      }
    },
    async unlikingVendor(vendor_id) {
      const data = {
        vendor_id: vendor_id,
        disliked_by: this.currentLoggedinUser.user_id,
      };
      try {
        await this.unLikeVendor(data);
      } catch (error) {
        console.log(error);
      }
    },
    vendorAlreadyLikedOrDisliked(check) {
      this.likeDialog = true;
      if (check === 1) {
        this.alertMessage = "You liked this provider already";
      } else {
        this.alertMessage = "You disliked this provider already";
      }
      setTimeout(() => {
        this.likeDialog = false;
        this.alertMessage = "";
      }, 1500);
    },
    loginRequired(value) {
      this.likeDialog = true;
      if (value === 1) {
        this.alertMessage = "Please login to add a like to this provider";
      } else {
        this.alertMessage = "Please login to dislike this provider";
      }
      setTimeout(() => {
        this.likeDialog = false;
        this.alertMessage = "";
      }, 1500);
    },
    closeLikedDialog() {
      this.likeDialog = false;
      this.alertMessage = "";
    },
  },
};
</script>

<style>
</style>
