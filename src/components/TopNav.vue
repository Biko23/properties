<template>
  <div>
    <base-dialog :message="message" :title="title" :dialogState="state">
      <template v-slot:button>
        <v-btn text @click="state = !state">close</v-btn>
      </template>
    </base-dialog>
    <v-app-bar color="#3B6EF3" dense dark>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title class="toolbar-title"
        >Open 24/7 a week</v-toolbar-title
      >

      <v-spacer></v-spacer>
      <v-spacer></v-spacer>

      <v-btn icon 
        v-if="loginState && currentUserFavoriteTotalCount > 0" 
        @click="navigateToFavoriteScreen" 
        title="favorites" 
        style="margin-right: 10px;"
      >
        <v-badge color="red" :content="currentUserFavoriteTotalCount" overlap>
          <v-icon small class="mr-2" style="font-size: 24px; color: white;">
            mdi-heart
          </v-icon>
        </v-badge>
      </v-btn>

      <v-toolbar-title v-if="loginState" class="telephone2"
        >
        <!-- Welcome -->
        <span style="font-size: 1rem; text-transform: capitalize">
          {{ currentLoggedinUser.username }}</span
        >
      </v-toolbar-title>

      <v-menu
        v-if="loginState"
        bottom
        min-width="200px"
        rounded
        offset-y
        class="av"
      >
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-avatar color="#3B6EF3" size="38">
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-card style="z-index: 500;">
          <v-list-item-content class="justify-center" style="z-index: 600;">
            <div class="mx-auto text-center">
              <v-avatar color="brown">
                <span class="white--text text-h5">{{ userIntials() }}</span>
              </v-avatar>
              <h3>{{ currentLoggedinUser.vendor_name }}</h3>
              <p class="text-caption mt-1">
                {{ currentLoggedinUser.vendor_primary_email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <router-link to="/user-settings" style="text-decoration: none">
                <v-btn depressed rounded text>View Profile</v-btn>
              </router-link>
              <v-divider class="my-3"></v-divider>
              <router-link to="/editprofile" style="text-decoration: none">
                <v-btn depressed rounded text> Edit Account </v-btn>
              </router-link>
              <v-divider class="my-3"></v-divider>
              <router-link to="/user-interest-properties" style="text-decoration: none">
                <v-btn depressed rounded text>Interested Properties</v-btn>
              </router-link>
              <v-divider class="my-3"></v-divider>
              <router-link to="/recentactivities" style="text-decoration: none">
                <v-btn depressed rounded text> Recent Activities </v-btn>
              </router-link>
              <v-divider class="my-3"></v-divider>
              <router-link to="/logs" style="text-decoration: none">
                <v-btn depressed rounded text> Activity Logs </v-btn>
              </router-link>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
      <!-- </v-row>
  </v-container> -->
      <!-- <a href="http://" class="sign-in">Sign In</a> -->
      <v-col class="hid-navbar sign-in">
        <v-btn
          color="primary"
          style="text-decoration: none; color: white"
          v-if="loginState"
          @click="logingOut"
          >Logout</v-btn>
        <router-link
          to="/login"
          style="text-decoration: none; color: white"
          v-else
          >Login</router-link>
      </v-col>
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "TopNav",
  data() {
    return {
        message: '',
        title: '',
        state: false
    };
  },
  computed: {
    ...mapGetters(["loginState", "currentLoggedinUser", "currentUserFavoriteTotalCount"]),
    userIntials(){
      const secondName = this.currentLoggedinUser.vendor_name.split(' ')[1] || '';
      return () => this.currentLoggedinUser.vendor_name[0] + secondName[0];
    }
  },
  created() {
    this.fetchVendorsCategories();
    this.fetchUserFavoriteCount();
  },
  methods: {
    ...mapActions(["logout", "fetchVendorsCategories", "fetchTotalFavoriteCount", "postAUserLog"]),
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
    async fetchUserFavoriteCount(){
      try {
        if(this.loginState == true){
          const response = await this.fetchTotalFavoriteCount();
          if(response.data.status == 0){
            this.defaultResponse(response.data.message, 'Error', true);
          }
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async logingOut() {
        const payload = {
              "activity":"Logout", 
              "button_clicked":"Logout button"
        }
        this.postAUserLog(payload);
      try {
        await this.logout().then(() => {
          this.$router.push("/");
        });
       } catch (error) {
        throw new Error(error.message);
      }
    },
    navigateToFavoriteScreen(){
      this.$router.push('/user-favorite-properties')
    }
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
.telephone2 {
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
@media only screen and (max-width: 768px) {
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
    margin-right: auto;
  }
  .telephone2 {
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
    margin-left: 10px;
    margin-right: auto;
  }
  .sign-in {
    font-size: 13px;
    font-style: normal;
    font-weight: 400;

    letter-spacing: 0em;
    text-align: left;
    color: white;
    text-decoration: none;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .av {
    padding-left: 40px;
    position: absolute;
  }
}
</style>
