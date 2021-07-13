
  
//      <!-- <v-app-bar color="#f2f2f2" dense dark>
//       <div style="">
//         <v-img
//           style="margin-left: auto; margin-right: auto; display: block"
//           lazy-src="https://picsum.photos/id/11/10/6"
//           max-height="45"
//           max-width="45"
//           src="https://res.cloudinary.com/diued7ugb/image/upload/v1625749459/Vector_pebqf0.png"
//         ></v-img>
//       </div>

//       <v-toolbar-title style="color: #3b6ef3; margin-top: 8px"
//         >Stanbic Properties</v-toolbar-title
//       >
//       <v-spacer></v-spacer>
//      </v-app-bar> -->





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

      <v-toolbar-title style="color: #3b6ef3; margin-top: 8px"
        >Stanbic Properties</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <div>
        <!-- <v-tooltip bottom color="white">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on" expand-on-hover>
              Button
            </v-btn>
          </template>
          <span>
            <v-card class="mx-auto" color="white">
              <v-card-text color="white">
                <div>Word of the Day</div>
                <p class="text-h4 text--primary">be•nev•o•lent</p>
                <p>adjective</p>
                <div class="text--primary">
                  well meaning and kindly.<br />
                  "a benevolent smile"
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="deep-purple accent-4"> Learn More </v-btn>
              </v-card-actions>
            </v-card>
          </span>
        </v-tooltip> -->
      </div>
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

export default {
  name: "MainNaigation",
  data() {
    return {
      drawer: null,
      items: [
        { title: "Home", icon: "mdi-view-dashboard" },
        { title: "About", icon: "mdi-forum" },
      ],
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
