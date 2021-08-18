<template>
  <div>
    <v-app-bar color="#3B6EF3" dense dark>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title class="toolbar-title"
        >Mon - Sat 8.00 - 18.00. Sunday CLOSED</v-toolbar-title
      >
      <a href="http://" class="about-us">About Us</a>

      <v-spacer></v-spacer>

      <v-toolbar-title class="telephone"
        >Tel No. (+256) 782-456-789</v-toolbar-title
      >

      <v-spacer></v-spacer>

      <v-toolbar-title class="telephone"
        >Welcome
        <span style="font-size: 1rem; text-transform: capitalize">
          {{ currentLoggedinUser.username }}</span
        >
      </v-toolbar-title>
      <!-- <v-container
    fluid
    style="height: 300px"
  >
    <v-row justify="center"> -->
      <v-menu bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-avatar color="#3B6EF3" size="38">
              <img
                alt="Avatar"
                src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
              />
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar color="brown">
                <span class="white--text text-h5">{{ user.initials }}</span>
              </v-avatar>
              <h3>{{ currentLoggedinUser.vendor_name }}</h3>
              <p class="text-caption mt-1">
                {{ currentLoggedinUser.vendor_primary_email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <router-link to="/editprofile" style="text-decoration:none;">
              <v-btn depressed rounded text> Edit Account </v-btn>
              </router-link>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text> Disconnect </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
      <!-- </v-row>
  </v-container> -->
      <!-- <a href="http://" class="sign-in">Sign In</a> -->
      <v-col class="hid-navbar sign-in">
        <router-link
          color="primary"
          style="text-decoration: none; color: white"
          v-if="loginState"
          @click="logingOut"
          >Logout</router-link
        >
        <router-link
          to="/login"
          style="text-decoration: none; color: white"
          v-else
          >Login</router-link
        >
      </v-col>
    </v-app-bar>
  </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'
import { mapActions, mapGetters } from "vuex";
export default {
  name: "TopNav",
  data: () => ({
    user: {
      initials: "PP",
      fullName: "John Doe",
      email: "john.doe@doe.com",
    },
  }),
  computed: {
    ...mapGetters(["loginState", "currentLoggedinUser"]),
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
<style scoped>
.toolbar-title {
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
}
.about-us {
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  color: white;
  text-decoration: none;
  display: none;
}
.telephone {
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
}
.sign-in {
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  color: white;
  text-decoration: none;
  display: none;
}
@media only screen and (max-width: 1080px) {
  .toolbar-title {
    display: none;
  }
  .about-us {
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
    color: white;
    text-decoration: none;
    display: block;
  }
  .telephone {
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: center;
    margin-left: auto;
    margin-right: 65px;
  }
  .sign-in {
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
    color: white;
    text-decoration: none;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
