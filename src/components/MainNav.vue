

<template>
  <nav>
    <v-app-bar color="#f2f2f2" dark>
      <div style="">
        <v-img
          style="margin-left: auto; margin-right: auto; display: block"
          lazy-src="https://picsum.photos/id/11/10/6"
          max-height="45"
          max-width="45"
          src="https://res.cloudinary.com/diued7ugb/image/upload/v1625749459/Vector_pebqf0.png"
        ></v-img>
      </div>

      <a href="/" style="text-decoration: none">
        <v-toolbar-title
          style="color: #3b6ef3; margin-top: 8px; text-decoration: none"
          >Stanbic Properties</v-toolbar-title
        >
      </a>

      <v-spacer></v-spacer>
      <v-row justify="space-around" class="hid-navbar">
        <v-menu :key="text" :rounded="rounded" offset-y>
          <template v-slot:activator="{ attrs, on }">
            <a href="#"
              color="deep-purple accent-4"
              class="blue--text ma-7"
              v-bind="attrs"
              v-on="on" 
              style="text-decoration: none"
              icon @click="show = !show"
              >Buy
              <v-icon color="blue accent-3">
                {{show ? "mdi-chevron-up" : "mdi-chevron-down"}}
              </v-icon>
              </a>
          </template>

          <v-list>
            <links title="Homes for sale" />
            <links title="New Constructions" />
            <links title="For sale by owner" />
            <links link="/" title="Open houses" />
          </v-list>
        </v-menu>

        <v-menu :key="text" :rounded="rounded" offset-y>
          <template v-slot:activator="{ attrs, on }">
            <a href="#"
              color="deep-purple accent-4"
              class="blue--text ma-7"
              v-bind="attrs"
              v-on="on" 
              style="text-decoration: none"
              icon @click="show = !show"
              >Sell
              <v-icon color="blue accent-3">
                {{show ? "mdi-chevron-up" : "mdi-chevron-down"}}
              </v-icon>
              </a>
          </template>

          <v-list>
            <links title="Explore your options"/>
            <links title="Home values"/>
            <links title="Seller's guide"/>
          </v-list>
        </v-menu>

        <v-menu :key="text" :rounded="rounded" offset-y>
          <template v-slot:activator="{ attrs, on }">
            <a href="#"
              color="deep-purple accent-4"
              class="blue--text ma-7"
              v-bind="attrs"
              v-on="on" 
              style="text-decoration: none"
              icon @click="show = !show"
              >Rent
              <v-icon color="blue accent-3">
                {{show ? "mdi-chevron-up" : "mdi-chevron-down"}}
              </v-icon>
              </a>
          </template>
          <div style="display: flex; flex-direction: row;">
          <v-list>
            <links link="/register" title="Rental Buildings"/>
            <links link="/login" title="Apartments for Rent"/>
            <links link="/property" title="Houses for Rent"/>
            <links link="/description" title="Your Rentals" />
          </v-list>
          <v-divider :vertical="divider"></v-divider>
          <v-list>
            <links link="/signup" title="Rental Buildings"/>
            <links link="/signdown" title="Apartments for Rent"/>
            <links link="/" title="Houses for Rent"/>
            <links link="/users" title="Your Rentals" />
          </v-list>
          </div>
        </v-menu>

        <v-menu :key="text" :rounded="rounded" offset-y>
          <template v-slot:activator="{ attrs, on }">
             <a href="#"
              color="deep-purple accent-4"
              class="blue--text ma-7"
              v-bind="attrs"
              v-on="on" 
              style="text-decoration: none"
              icon @click="show = !show"
              >Home Loan
              <v-icon color="blue accent-3">
                {{show ? "mdi-chevron-up" : "mdi-chevron-down"}}
              </v-icon>
              </a>
          </template>

          <v-list>
            <links title="Mortgage Lenders"/>
            <links title="Mortgage Rates"/>
            <links title="Mortgage Refinancing"/>
            <links link="/" title="Mortgage Calculator" />
          </v-list>
        </v-menu>

        <v-menu :key="text" :rounded="rounded" offset-y>
          <template v-slot:activator="{ attrs, on }">
            <a href="#"
              color="deep-purple accent-4"
              class="blue--text ma-7"
              v-bind="attrs"
              v-on="on" 
              style="text-decoration: none"
              icon @click="show = !show"
              >Mortgage
              <v-icon color="blue accent-3">
                {{show ? "mdi-chevron-up" : "mdi-chevron-down"}}
              </v-icon>
              </a>
          </template>

          <v-list>
            <links title="Mortgage Lenders"/>
            <links title="Mortgage Rates"/>
            <links title="Mortgage Refinancing"/>
            <links link="/" title="Mortgage Calculator" />
          </v-list>
        </v-menu>
      </v-row>

      <v-col class="hid-navbar">
        <a href="/login" style="text-decoration: none">Login</a>
      </v-col>

      <v-spacer></v-spacer>
      <v-app-bar-nav-icon
        @click="drawer = true"
        style="color: #3b6ef3"
        class="toggle"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'
import Links from "@/components/Links";

export default {
  name: "MainNaigation",
  components: {
    Links,
  },
  data() {
    return {
      drawer: null,
      show: false,
      divider: false,
      btns: [
        ["Removed", "0"],
        ["Large", "lg"],
        ["Custom", "b-xl"],
      ],
      colors: ["deep-purple accent-4", "error", "teal darken-1"]
    };
  },
};
</script>

<style scoped>
.toggle {
  display: none;
}
@media only screen and (max-width: 768px) {
  .toggle {
    display: block;
  }
  .hid-navbar{
    display: none;
  }
}
</style>
