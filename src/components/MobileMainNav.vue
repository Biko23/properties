<template>
  <v-list nav dense style="margin-left: 10px">
    <v-list-group :value="false">
      <template v-slot:activator>
        <v-list-item-title>Buy</v-list-item-title>
      </template>
      <v-list>
        <links title="Properties for sale" link="/properties-for-sale" />
        <!-- <links title="New Constructions" />
                    <links title="For sale by owner" />
                    <links link="/" title="Open houses" /> -->
      </v-list>
    </v-list-group>

    <v-list-group :value="false">
      <template v-slot:activator>
        <v-list-item-title>Sell</v-list-item-title>
      </template>
      <v-list>
        <links title="Sell A Property" link="/property-requirement" />
        <!-- <links title="Current market trends" /> -->
        <links title="Seller's guide" link="/learn" />
        <links title="Property Details" link="/property-details" />
        <!-- <links title="Price Conversion Calculator" /> -->
      </v-list>
    </v-list-group>

    <v-list-group :value="false">
      <template v-slot:activator>
        <v-list-item-title>Rent</v-list-item-title>
      </template>
      <v-list>
        <links link="/property" title="Houses for Rent" />
        <links link="/register" title="List A Rental" />
        <!-- <links link="/login" title="Apartments for Rent" />
                        <links link="/description" title="Your Rentals" /> -->
      </v-list>
    </v-list-group>

    <v-list-group :value="false">
      <template v-slot:activator>
        <v-list-item-title>Home Loan</v-list-item-title>
      </template>
      <v-list>
        <links title="Mortgage Lenders" link="/mortgage" />
        <links title="Mortgage Rates" link="/mortgage-rates" />
        <!-- <links title="Mortgage Refinancing" />
                    <links link="/" title="Mortgage Calculator" /> -->
      </v-list>
    </v-list-group>

    <v-list-group :value="false">
      <template v-slot:activator>
        <v-list-item-title>Find Service Provider</v-list-item-title>
      </template>
      <v-list>
        <template v-for="category in allVendorsCategories">
          <links
            :key="category.value"
            :link="`/provider/${category.value}`"
            :title="category.text"
          />
        </template>
      </v-list>
    </v-list-group>
    <v-list-group :value="false">
      <template v-slot:activator>
        <v-list-item-title>Get Started</v-list-item-title>
      </template>
      <v-list>
        <links title="Join Us As?" link="/getstarted" />
      </v-list>
    </v-list-group>
    <!-- <v-col class="hid-navbar">
        <v-btn
          color="primary"
          style="text-decoration: none"
          v-if="loginState"
          @click="logingOut"
          >Logout</v-btn
        >
        <router-link to="/login" style="text-decoration: none" v-else
          >Login</router-link
        >
      </v-col> -->
  </v-list>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Links from "@/components/Links";
export default {
  name: "MobileMainNav",
  components: {
    Links,
  },
  data: () => ({
    vendorCategories: [],
  }),
  computed: {
    ...mapGetters(["loginState", "allVendorsCategories"]),
  },
  created() {
    this.fetchVendorsCategories();
  },
  methods: {
    ...mapActions(["logout", "fetchVendorsCategories"]),
    async logingOut() {
      try {
        await this.logout().then(() => {
          this.$router.push("/");
        });
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
</script>