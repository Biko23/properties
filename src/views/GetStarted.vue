<template>
  <div
    style="
      background-color: #e7f0ff;
      box-shadow: inset 0 4px 4px 0 rgba(0, 0, 0, 0.1);
    "
  >
    <base-dialog :message="message" :title="title" :dialogState="state">
        <template v-slot:button>
            <v-btn text @click="state = !state">close</v-btn>
        </template>
    </base-dialog>
    <v-container>
      <v-row>
        <v-col cols="12" sm="12" md="12" xl="12">
          <h3 id="welcome">
            Welcome to the largest, trusted property platform in <br />
            Uganda
          </h3>
          <p id="reach">
            Reach a million potential customers for your business or property.
          </p>
        </v-col>
      </v-row>
      <v-divider style="margin-top: 20px"></v-divider>
    </v-container>

    <v-container>
      <!-- check seller dialog -->
      <v-dialog
        transition="dialog-top-transition"
        persistent
        v-model="messageDialog"
        max-width="600"
      >
        <template>
          <v-card>
            <v-toolbar :color="color" dark>{{ title }}</v-toolbar>
            <v-card-text class="pt-5">
              <p style="font-size: 16px">{{ responseMessage }}</p>
            </v-card-text>
            <!-- <v-card-actions class="justify-end">
                        <v-btn text @click="closeDialog">close</v-btn>
                    </v-card-actions> -->
          </v-card>
        </template>
      </v-dialog>
      <!-- end check seller dialog -->
      <v-row>
        <v-col cols="12" sm="12" md="4" xl="4">
          <v-card class="mx-auto">
            <v-img
              class="white--text align-end"
              height="200px"
              src="../assets/broker.jpg"
            >
            </v-img
            ><br />
            <h3 style="text-align: center">I'm a broker</h3>
            <div style="text-align: center">
              <v-btn color="primary" @click="assignRole('agent')"
                >Get started</v-btn
              >
              <br /><br />
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" sm="12" md="4" xl="4">
          <v-card class="mx-auto">
            <v-img
              class="white--text align-end"
              height="200px"
              src="../assets/landlord.jpg"
            >
            </v-img>
            <br />
            <h3 style="text-align: center">I'm a Landloard</h3>
            <div style="text-align: center">
              <v-btn color="primary" @click="assignRole('landlord')"
                >Get started</v-btn
              >
              <br /><br />
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="4" xl="4">
          <v-card>
            <v-img
              class="white--text align-end"
              height="200px"
              src="../assets/mortgage.jpg"
            >
            </v-img>
            <br />
            <h3 style="text-align: center">I'm a Mortgage Lender</h3>
            <div style="text-align: center">
              <!-- <router-link to="/profile" style="text-decoration: none"> -->
              <v-btn color="primary" disabled>Coming Soon</v-btn>
              <!-- </router-link> -->
              <br /><br />
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="4" xl="4">
          <!-- <router-link to="/profile" style="text-decoration: none"> -->
          <v-card class="mx-auto">
            <v-img
              class="white--text align-end"
              height="200px"
              src="../assets/photgrapher.jpg"
            >
            </v-img
            ><br />
            <h3 style="text-align: center">I'm a Photographer</h3>
            <div style="text-align: center">
              <!-- <router-link to="/profile" style="text-decoration: none"> -->
              <v-btn color="primary" disabled>Coming Soon</v-btn>
              <!-- </router-link> -->
              <br /><br />
            </div>
          </v-card>
          <!-- </router-link> -->
        </v-col>

        <v-col cols="12" sm="12" md="4" xl="4">
          <v-card class="mx-auto">
            <v-img
              class="white--text align-end"
              height="200px"
              src="../assets/builder.jpg"
            >
            </v-img>
            <br />
            <h3 style="text-align: center">I'm a builder</h3>
            <div style="text-align: center">
              <!-- <router-link to="/profile" style="text-decoration: none"> -->
              <v-btn color="primary" disabled>Coming Soon</v-btn>
              <!-- </router-link> -->
              <br /><br />
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="4" xl="4">
          <v-card>
            <v-img
              class="white--text align-end"
              height="200px"
              src="../assets/provider.jpg"
            >
            </v-img>
            <br />
            <h3 style="text-align: center">
              I'm a Professional Service provider
            </h3>
            <div style="text-align: center">
              <router-link to="/vendorprofile" style="text-decoration: none">
                <v-btn color="primary">Get started</v-btn>
              </router-link>
              <br /><br />
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BottonNav from "../components/BottonNav.vue";
export default {
  components: {
    BottonNav,
  },
  name: "GetStarted",
  data() {
    return {
      responseMessage: "",
      messageDialog: false,
      color: "",
      title: "",
      message: '',
      title: '',
      state: false
    };
  },
  computed: {
    ...mapGetters(["loginState", "iAmASeller", "iAmACertifiedSeller", "allRoles"]),
  },
  created() {
    this.fetchAllUserRoles();
    this.postAUserLog({
      activity: `Visited Get Started Page`,
      button_clicked: "Visit GetStarted Page",
    });
  },
  methods: {
    ...mapActions(["assignUpdatingUserRole", "postAUserLog", "fetchAllUserRoles"]),
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
    checkUserSellerStatus(roleId) {
      if (this.iAmASeller && this.iAmACertifiedSeller) {
        this.messageDialog = true;
        this.color = "success";
        this.title = "Success";
        this.responseMessage =
          "You are already approved as a landlord/ broker. Start selling";
        setTimeout(() => {
          this.messageDialog = false;
          this.responseMessage = "";
          this.color = "";
          this.title = "";
          this.$router.push("/property-requirement");
        }, 3000);
      } else if (this.iAmASeller && !this.iAmACertifiedSeller) {
        this.messageDialog = true;
        this.color = "orange";
        this.title = "Warning";
        this.responseMessage =
          "You are already a registered landlord/ broker pending spl approval";
        setTimeout(() => {
          this.messageDialog = false;
          this.responseMessage = "";
          this.color = "";
          this.title = "";
          this.$router.push("/learn");
        }, 3000);
      } else {
        this.postAUserLog({
          activity: `Visited register a broker/ Landlord Page`,
          button_clicked: "Visit Broker/ Landlord Page",
        });
        this.assignUpdatingUserRole(roleId).then(() =>
          this.$router.push(`/profile`)
        );
      }
    },
    assignRole(role){
      if(this.loginState == true) {
        try {
          const foundRole = this.allRoles.map(eachRole => eachRole.name).indexOf(role);
          console.log(foundRole);
          if(foundRole > -1){
            const roleId = this.allRoles[foundRole].role_id
            this.checkUserSellerStatus(roleId);
          }
        } catch (error) {
          console.log(error);   
        }
      } else {
        this.defaultResponse("You need to be logged in to select an option", "", true)
      }
    }
  },
};
</script>

<style scoped>
#welcome {
  color: #3b6ef3;
  text-align: center;
  font-size: 2rem;
  margin-left: 100px;
  margin-right: 100px;
  margin-top: 50px;
}

#reach {
  text-align: center;
  font-size: 0.9rem;
  margin-top: 30px;
}
</style>
