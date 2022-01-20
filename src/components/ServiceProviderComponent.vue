<template>
  <div>
    <base-dialog :message="message" :title="title" :dialogState="state">
      <template v-slot:button>
        <v-btn text @click="state = !state">close</v-btn>
      </template>
    </base-dialog>
    <v-container>
      <v-row>
        <v-col style="text-align: center">
          <h1>
            List of certified
            {{ vendorCategory()[0] }}
          </h1>
        </v-col>
        <v-col id="search-field" style="position: relative">
          <v-btn
            @click="resetSelection"
            color="primary"
            rounded
            class="mr-2 mt-1"
            >All</v-btn
          >
          <v-combobox
            v-model="fullName"
            :items="sortedProviderName()"
            label="Full Name"
            outlined
            dense
            @click="phoneNumber == null"
          ></v-combobox>

          <v-combobox
            v-model="phoneNumber"
            :items="sortedProviderNumber()"
            label="Phone Number"
            outlined
            dense
            @click="fullName == null"
          ></v-combobox>
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
          v-for="(vendor, index) in filteredProviders()"
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
                  >mdi-thumb-down</v-icon
                >
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
    <!-- footer only -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ServiceProviderCard from "./ServiceProviderCard.vue";
export default {
  data() {
    return {
      currentVendorCategoryId: this.vendorCategoryId || this.vendor_category_id,
      fullName: null,
      phoneNumber: null,
      message: '',
      title: '',
      state: false
    };
  },
  components: {
    ServiceProviderCard,
  },
  name: "ServiceProviderComponent",
  props: ["vendor_category_id"],
  computed: {
    ...mapGetters([
      "currentLoggedinUser",
      "loginState",
      "vendorCategoryId",
      "allLikedVendors",
      "allUnlikedVendors",
      "allVendors",
    ]),
    filteredProviders() {
      if (
        (this.fullName == null || this.fullName == "") &&
        (this.phoneNumber === null || this.phoneNumber === "")
      ) {
        return () => this.allVendors;
      }
      if (this.fullName !== null && this.phoneNumber == null) {
        this.phoneNumber = null;
        return () =>
          (this.allVendors = this.allVendors.filter(
            (vendors) => vendors.vendor_name == this.fullName
          ));
      }
      if (this.phoneNumber !== null && this.fullName == null) {
        this.fullName = null;
        return () =>
          (this.allVendors = this.allVendors.filter(
            (vendors) => vendors.vendor_primary_phone_number == this.phoneNumber
          ));
      }
    },
    sortedProviderNumber() {
      return () =>
        this.allVendors.map(
          (vendorPhone) => vendorPhone.vendor_primary_phone_number
        );
    },

    sortedProviderName() {
      return () => this.allVendors.map((vendorName) => vendorName.vendor_name);
    },
    vendorCategory() {
      return () =>
        this.allVendors.map(
          (vendor) => vendor.vendorCategory.vendor_category_name
        );
    },
  },
  watch: {
    vendorCategoryId: async function () {
      try {
        const response = await this.fetchVendors(this.vendorCategoryId);
        if(response.data.hasOwnProperty('status')){
          this.defaultResponse(response.data.message, 'Error', true);
        }
      } catch (error) {
        this.defaultResponse(error.message, 'Error', true);
      }
    },
  },
  created() {
    this.postAUserLog({
      activity: `Visited Service Provider Page`,
      button_clicked: "View Providers(Vendor) Page",
    });
    this.fetchVendors(this.vendor_category_id);
    this.fetchAllLikedVendorsByUserId();
    this.fetchAllUnlikedVendorsByUserId();
  },
  methods: {
    ...mapActions([
      "fetchVendors",
      "likeVendor",
      "unLikeVendor",
      "fetchAllLikedVendorsByUserId",
      "fetchAllUnlikedVendorsByUserId",
      "postAUserLog",
    ]),
    resetSelection() {
      if (this.fullName != null || this.phoneNumber != null) {
        this.phoneNumber = null;
        this.fullName = null;
      }
    },
    defaultResponse(msg, heading, status) {
      this.message = msg
      this.title = heading
      this.state = status
      setTimeout(() => {
        this.message = ""
        this.title = ""
        this.state = false
      }, 2000);
    },
    // searchCurrentKeyword() {
    //   if (this.searchKeyword === null) {
    //     return this.allVendors;
    //   } else {
    //     const mySearchArray = Array.from(this.allVendors)
    //     const result = mySearchArray.filter(
    //       (vendor) =>
    //         vendor.vendor_name == this.searchKeyword ||
    //         vendor.vendor_primary_phone_number == this.searchKeyword
    //     );
    //     return this.allVendors = [...result];
    //   }
    // },
    async likingVendor(vendor_id) {
      const data = {
        vendor_id: vendor_id,
        liked_by: this.currentLoggedinUser.user_id,
      };
      this.postAUserLog({
        activity: `Liked Vendor with id ${vendor_id}`,
        button_clicked: "Like Button",
      });
      try {
        const response = await this.likeVendor(data);
        if(response.data.hasOwnProperty('status')){
          this.defaultResponse(response.data.message, '', true);
        }
      } catch (error) {
        this.defaultResponse(error.message, '', true);
      }
    },
    async unlikingVendor(vendor_id) {
      const data = {
        vendor_id: vendor_id,
        disliked_by: this.currentLoggedinUser.user_id,
      };
      this.postAUserLog({
        activity: `Unliked Vendor with id ${vendor_id}`,
        button_clicked: "Unlike Button",
      });
      try {
        const response = await this.unLikeVendor(data);
        if(response.data.hasOwnProperty('status')){
          this.defaultResponse(response.data.message, '', true);
        }
      } catch (error) {
        this.defaultResponse(error.message, '', true);
      }
    },
    vendorAlreadyLikedOrDisliked(check) {
      if (check === 1) {
        this.defaultResponse("You liked this provider already", '', true);
      } else {
        this.defaultResponse("You disliked this provider already", '', true);
      }
    },
    loginRequired(value) {
      if (value === 1) {
        this.defaultResponse("Please login to add a like to this provider", '', true);
      } else {
        this.defaultResponse("Please login to dislike this provider", '', true);
      }
    }
  },
};
</script>
<style>
#search-field {
  flex: 1;
  display: flex;
  justify-content: flex-start;
}
@media only screen and (max-width: 768px) {
  #search-field {
    order: 1;
  }
}
</style>
