<template>
  <div>
    <v-app-bar color="#3B6EF3" dense dark>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title
        class="toolbar-title"
        >Mon - Sat 8.00 - 18.00. Sunday CLOSED</v-toolbar-title
      >
      <a href="http://" class="about-us">About Us</a>

      <v-spacer></v-spacer>

      <v-toolbar-title
        class="telephone"
        >Tel No. (+256) 782-456-789</v-toolbar-title
      >
     <!-- <a href="http://" class="sign-in">Sign In</a> -->
      <v-col class="hid-navbar sign-in">
        <router-link
        
          color="primary"
          style="text-decoration: none;color:white;"
          v-if="loginState"
          @click="logingOut"
          >Logout</router-link
        >
        <router-link to="/login" style="text-decoration: none; color:white;" v-else
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
<style scoped>
.toolbar-title{
          font-size: 13px;
          font-style: normal;
          font-weight: 400;
          line-height: 18px;
          letter-spacing: 0em;
          text-align: left;
}
.about-us{
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
.telephone{
          font-size: 13px;
          font-style: normal;
          font-weight: 400;
          line-height: 18px;
          letter-spacing: 0em;
          text-align: left;
}
.sign-in{
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
  .toolbar-title{
          display: none;
}
.about-us{
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
.telephone{
          font-size: 13px;
          font-style: normal;
          font-weight: 400;
          line-height: 18px;
          letter-spacing: 0em;
          text-align: center;
          margin-left: auto;
          margin-right: 65px;
}
.sign-in{
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
