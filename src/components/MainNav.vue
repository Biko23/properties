<template>
  <nav>
    <v-app-bar color="#f2f2f2" dark>
      <router-link to="/" style="text-decoration: none">
        <div style="">
          <v-img
            style="margin-left: auto; margin-right: auto; display: block"
            max-height="40"
            max-width="35"
            src="../assets/ssss.png"
          ></v-img>
        </div>
      </router-link>

      <router-link to="/" style="text-decoration: none">
        <v-toolbar-title
          style="
            color: #3b6ef3;
            margin-top: 8px;
            text-decoration: none;
            padding-left: 5px;
          "
          >Stanbic Properties</v-toolbar-title
        >
      </router-link>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
    
      <v-row class="hid-navbar">
        <v-menu :key="text" :rounded="rounded" offset-y>
          <template v-slot:activator="{ attrs, on }">
            <a
              href="#"
              color="deep-purple accent-4"
              v-bind="attrs"
              v-on="on"
              style="text-decoration: none"
              icon
              @click="show1 = !show1"
              >Buy
              <v-icon color="blue accent-3">
                {{ show1 ? "mdi-chevron-up" : "mdi-chevron-down" }}
              </v-icon>
            </a>
          </template>

          <v-list>
            <links title="Properties for sale" link="/properties-for-sale" />
            <!-- <links title="New Constructions" />
                    <links title="For sale by owner" />
                    <links link="/" title="Open houses" /> -->
          </v-list>
        </v-menu>
        <v-spacer></v-spacer>
        <v-menu :key="text" :rounded="rounded" offset-y>
          <template v-slot:activator="{ attrs, on }">
            <a
              href="#"
              color="deep-purple accent-4"
              v-bind="attrs"
              v-on="on"
              style="text-decoration: none"
              icon
              @click="show2 = !show2"
              >Sell
              <v-icon color="blue accent-3">
                {{ show2 ? "mdi-chevron-up" : "mdi-chevron-down" }}
              </v-icon>
            </a>
          </template>

          <v-list>
            <links title="Sell A Property" link="/property-requirement" />
            <!-- <links title="Current market trends" /> -->
            <links title="Seller's guide" link="/learn" />
            <links
              v-if="iAmACertifiedSeller"
              title="Property Details"
              link="/property-details"
            />
            <!-- <links title="Price Conversion Calculator" /> -->
          </v-list>
        </v-menu>
        <v-spacer></v-spacer>
        <v-menu :key="text" :rounded="rounded" offset-y>
          <template v-slot:activator="{ attrs, on }">
            <a
              href="#"
              color="deep-purple accent-4"
              v-bind="attrs"
              v-on="on"
              style="text-decoration: none"
              icon
              @click="show3 = !show3"
              >Rent
              <v-icon color="blue accent-3">
                {{ show3 ? "mdi-chevron-up" : "mdi-chevron-down" }}
              </v-icon>
            </a>
          </template>
          <div style="display: flex; flex-direction: row">
            <v-list>
              <links link="/properties-for-rent" title="Houses for Rent" />
              <!-- Work on logic to return rentals only and its screen to display them -->
              <links link="/rental-requirement" title="List A Rental" />
              <!-- <links link="/login" title="Apartments for Rent" />
                        <links link="/description" title="Your Rentals" /> -->
            </v-list>
          </div>
        </v-menu>
        <v-spacer></v-spacer>
        <v-menu :key="text" :rounded="rounded" offset-y>
          <template v-slot:activator="{ attrs, on }">
            <a
              href="#"
              color="deep-purple accent-4"
              v-bind="attrs"
              v-on="on"
              style="text-decoration: none"
              icon
              @click="show4 = !show4"
              >Home Loan
              <v-icon color="blue accent-3">
                {{ show4 ? "mdi-chevron-up" : "mdi-chevron-down" }}
              </v-icon>
            </a>
          </template>

          <v-list>
            <links title="Mortgage Lenders" link="/mortgage" />
            <links title="Mortgage Rates" link="/mortgage-rates" />
            <!-- <links title="Mortgage Refinancing" />
                    <links link="/" title="Mortgage Calculator" /> -->
          </v-list>
        </v-menu>
        <v-spacer></v-spacer>
        <v-menu :key="text" :rounded="rounded" offset-y>
          <template v-slot:activator="{ attrs, on }">
            <a
              href="#"
              color="deep-purple accent-4"
              v-bind="attrs"
              v-on="on"
              style="text-decoration: none"
              icon
              @click="show4 = !show4"
              >Find service providers
              <v-icon color="blue accent-3">
                {{ show4 ? "mdi-chevron-up" : "mdi-chevron-down" }}
              </v-icon>
            </a>
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
        </v-menu>
        <v-spacer></v-spacer>
        <v-menu :key="text" :rounded="rounded" offset-y>
          <template v-slot:activator="{ attrs, on }">
            <a
              href="#"
              color="deep-purple accent-4"
              v-bind="attrs"
              v-on="on"
              style="text-decoration: none"
              icon
              @click="show5 = !show5"
              >Get Started
              <v-icon color="blue accent-3">
                {{ show5 ? "mdi-chevron-up" : "mdi-chevron-down" }}
              </v-icon>
            </a>
          </template>
          <v-list>
            <links title="Join Us As?" link="/getstarted" />
          </v-list>
        </v-menu>
      </v-row>
 <v-spacer></v-spacer>
  <v-spacer></v-spacer>
      <v-col class="hid-navbar">
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
      </v-col>

      <v-spacer></v-spacer>
      <v-app-bar-nav-icon
        @click="drawer = true"
        style="color: #3b6ef3"
        class="toggle"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      style="
        margin-left: 10px;
        z-index: 100;
        margin-top: 5px;
        border-radius: 6px;
      "
    >
      <mobile-main-nav />
    </v-navigation-drawer>
  </nav>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'
import Links from "@/components/Links";
import MobileMainNav from "./MobileMainNav";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MainNaigation",
  components: {
    Links,
    MobileMainNav,
  },
  data: () => ({
    vendorCategories: [],
    drawer: null,
    show1: false,
    show2: false,
    show3: false,
    show4: false,
    show5: false,
    divider: false,
    btns: [
      ["Removed", "0"],
      ["Large", "lg"],
      ["Custom", "b-xl"],
    ],
    colors: ["deep-purple accent-4", "error", "teal darken-1"],
  }),
  computed: {
    ...mapGetters([
      "loginState",
      "allVendorsCategories",
      "iAmACertifiedSeller",
    ]),
  },
  created() {
    this.fetchVendorsCategories();
  },
  methods: {
    ...mapActions(["logout", "fetchVendorsCategories"]),
    // ...mapActions(["logout", "fetchVendorsCategories", "changeVendorTypeId"]),
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
  // watch: {
  //     gb(value) {
  //         this.mb = value * 1024;
  //     },
  //     mb(value) {
  //         this.gb = value / 1024;
  //     }
  // }
};
</script>

<style scoped>
.toggle {
  display: none;
}
.hid-navbar {
  padding: 30px;
}

@media only screen and (max-width: 768px) {
  .toggle {
    display: block;
  }

  .hid-navbar {
    display: none;
  }
}
@media only screen and (max-width: 1080) {
  .toggle {
    display: block;
  }

  .hid-navbar {
    display: block;
    color: red;
  }
}
</style>
