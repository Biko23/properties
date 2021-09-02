<template>
  <div style="background-color: #3b6ef3">
    <v-container>
      <v-row>
        <v-col cols="12" sm="12" md="12" xl="12">
          <h3
            style="
              color: white;
              font-weight: 400;
              text-align: center;
              margin-top: 20px;
            "
          >
            Your profile
          </h3>
          <br />
          <v-form
            id="form"
            style="background-color: rgb(231, 240, 255)"
            ref="moreUserDataForm"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              style="display: none"
              v-model="userData.user_id"
              type="hidden"
            ></v-text-field>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <p>Secondary Email:</p>
                  <v-text-field
                    :rules="[userRules.secondary_email]"
                    v-model="userData.secondary_email"
                    label="Secondary Email"
                    placeholder="Enter secondary email"
                    solo
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <p>Secondary Phone:</p>
                  <v-text-field
                    :rules="[userRules.secondary_contact]"
                    v-model="userData.secondary_contact"
                    label="secondary contact"
                    placeholder="Placeholder"
                    solo
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <p>Business Location</p>
                  <v-text-field
                    :rules="[userRules.business_location]"
                    v-model="userData.business_location"
                    label="Business Location "
                    placeholder="Business location"
                    solo
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-btn
                    color="primary"
                    :disabled="!valid || iAmASeller"
                    @click="updateUserDetails"
                    block
                    >Update Your Details</v-btn
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-form>
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
    BottonNav
  },
  name: "UserProfile",
  data: () => ({
    valid: true,
    userData: {
      user_id: 0,
      secondary_email: "",
      secondary_contact: "",
      business_location: "",
    },
    userRules: {
      secondary_email: (value) => !!value || "Secondary email is required.",
      secondary_contact: (v) =>
        (v && v.length >= 7) || "Min characters should be 8",
      business_location: (value) => !!value || "Business location is required.",
    },
  }),
  created() {
    this.fetchAllUserRoles();
  },
  computed: {
    ...mapGetters(["currentLoggedinUser", "iAmASeller"]),
  },
  methods: {
    ...mapActions(["updateUser", "fetchAllUserRoles", "fetchLoggedUser"]),
    async updateUserDetails() {
      this.userData.user_id = this.currentLoggedinUser.user_id;
      try {
        if (this.$refs.moreUserDataForm.validate()) {
          const response = await this.updateUser(this.userData);
          if (response.status == 200 || response.status === 201) {
            this.fetchLoggedUser().then(() => {
              // this.$router.push('/getstarted')
              this.$router.replace(
                sessionStorage.getItem("nextPath") || "/getstarted"
              );
              sessionStorage.removeItem("nextPath");
            });
          }
        }
      } catch (error) {
        console.log(error);
        // throw new Error("Failed, Please try again");
      }
    },
  },
};
</script>

<style scoped>
#form {
  background-color: #e7f0ff;
  margin-left: auto;
  margin-right: auto;
  width: 900px;
  border-radius: 6px;
}

#reach {
  text-align: center;
  font-size: 0.9rem;
  margin-top: 30px;
}
</style>
