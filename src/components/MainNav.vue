

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
      <v-row justify="space-around">
        <v-menu :key="text" :rounded="rounded" offset-y>
          <template v-slot:activator="{ attrs, on }">
            <v-btn
              :color="colors[index]"
              class="white--text ma-5"
              v-bind="attrs"
              v-on="on"
            >
             Buy
            </v-btn>
          </template>

          <v-list>
            <v-list-item link to="/">
              <v-list-item-title> Buy </v-list-item-title>
            </v-list-item>

            <v-list-item link to="/">
              <v-list-item-title> Buy Another property </v-list-item-title>
            </v-list-item>
            <v-list-item link to="/">
              <v-list-item-title> Buy Another property </v-list-item-title>
            </v-list-item>
            <v-list-item link to="/">
              <v-list-item-title> Buy Another property </v-list-item-title>
            </v-list-item>
            <v-list-item link to="/">
              <v-list-item-title> Buy Another property </v-list-item-title>
            </v-list-item>
            <v-list-item link to="/">
              <v-list-item-title> Buy Another property </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu :key="text" :rounded="rounded" offset-y>
          <template v-slot:activator="{ attrs, on }">
            <v-btn
              :color="colors[index]"
              class="white--text ma-5"
              v-bind="attrs"
              v-on="on"
            >
             Sell
            </v-btn>
          </template>

          <v-list>
            <v-list-item link to="/">
              <v-list-item-title> Buy </v-list-item-title>
            </v-list-item>

            <v-list-item link to="/">
              <v-list-item-title> Buy Another property </v-list-item-title>
            </v-list-item>
            <v-list-item link to="/">
              <v-list-item-title> Buy Another property </v-list-item-title>
            </v-list-item>
            <v-list-item link to="/">
              <v-list-item-title> Buy Another property </v-list-item-title>
            </v-list-item>
            <v-list-item link to="/">
              <v-list-item-title> Buy Another property </v-list-item-title>
            </v-list-item>
            <v-list-item link to="/">
              <v-list-item-title> Buy Another property </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu :key="text" :rounded="rounded" offset-y>
          <template v-slot:activator="{ attrs, on }">
            <v-btn
              :color="colors[index]"
              class="white--text ma-5"
              v-bind="attrs"
              v-on="on"
            >
             Rent
            </v-btn>
          </template>

          <v-list>
            <links />
            <links />
            <links />
            <links link="/" title="Home" />
          </v-list>
        </v-menu>

        <v-menu :key="text" :rounded="rounded" offset-y>
          <template v-slot:activator="{ attrs, on }">
            <v-btn
              :color="colors[index]"
              class="white--text ma-5"
              v-bind="attrs"
              v-on="on"
            >
             Home Loan
            </v-btn>
          </template>

          <v-list>
            <links />
          </v-list>
        </v-menu>

        <v-menu :key="text" :rounded="rounded" offset-y>
          <template v-slot:activator="{ attrs, on }">
            <v-btn
              :color="colors[index]"
              class="white--text ma-5"
              v-bind="attrs"
              v-on="on"
            >
             Mortgage
            </v-btn>
          </template>

          <v-list>
            <v-list-item link to="/">
              <v-list-item-title> Buy </v-list-item-title>
            </v-list-item>

            <v-list-item link to="/">
              <v-list-item-title> Buy Another property </v-list-item-title>
            </v-list-item>
            <v-list-item link to="/">
              <v-list-item-title> Buy Another property </v-list-item-title>
            </v-list-item>
            <v-list-item link to="/">
              <v-list-item-title> Buy Another property </v-list-item-title>
            </v-list-item>
            <v-list-item link to="/">
              <v-list-item-title> Buy Another property </v-list-item-title>
            </v-list-item>
            <v-list-item link to="/">
              <v-list-item-title> Buy Another property </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>

      <v-col>
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
      items: [
        { title: "Home", icon: "mdi-view-dashboard" },
        { title: "About", icon: "mdi-forum" },
      ],
      btns: [
        ["Removed", "0"],
        ["Large", "lg"],
        ["Custom", "b-xl"],
      ],
      colors: ["deep-purple accent-4", "error", "teal darken-1"],
      items: [...Array(4)].map((_, i) => `Item ${i}`),
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
}
</style>
