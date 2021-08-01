<template>
<div>
    <top-nav />
    <main-nav />
    <v-container>
        <v-row>
            <v-col cols="12" sm="12" md="12" xl="12">
                <h3 style="text-align: center; margin-top: 20px">Your profile</h3>
                <v-form id="form" style="background-color: #e7f0ff">
                    <v-text-field v-model="userData.user_id" type="hidden"></v-text-field>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <p>Secondary Email:</p>
                                <v-text-field v-model="userData.secondary_email" label="Secondary Email" placeholder="Enter secondary email" solo></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <p>Secondary Phone:</p>
                                <v-text-field v-model="userData.secondary_phone" label="Username" placeholder="Placeholder" solo></v-text-field>
                            </v-col>
                        </v-row>
                        <!-- <v-row>
                <v-col cols="12" sm="12" md="12">
                  <p>Photo</p>
                  <v-text-field solo style="width:60px; border-radius:80%"></v-text-field>
                </v-col>
              </v-row> -->
                        <!-- 
                                  <v-alert
                        v-model="alert"
                        border="left"
                        close-text="Close Alert"
                        color="deep-purple accent-4"
                        dark
                        dismissible
                      >
                        Aenean imperdiet. Quisque id odio. Cras dapibus. Pellentesque ut neque. Cras dapibus.

                        Vivamus consectetuer hendrerit lacus. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Curabitur blandit mollis lacus. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo.
                      </v-alert>
                                -->
                        <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <p>Business Location</p>
                                <v-text-field v-model="userData.business_location" label="Business Location " placeholder="Business location" solo></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <v-btn color="primary" @click="updateUserDetails" block>Update Your Details</v-btn>
                            </v-col>
                        </v-row>
                        <!-- <v-row>
                <v-divider></v-divider
                ><span style="margin-top: -10px">Or</span>
                <v-divider></v-divider>
              </v-row> -->

                        <!-- <v-row>
                <v-col cols="12" sm="6" md="6">
                 <v-btn color="#e7f0ff" block large>
                    <v-img
                      max-height="30"
                      max-width="20"
                      src="https://res.cloudinary.com/diued7ugb/image/upload/v1626938676/flat-color-icons_google_fsmdyf.png"
                    ></v-img>
                    <span style="padding-left: 5px"> Google</span>
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                   <v-btn color="white" block large>
                    <v-img
                      max-height="34"
                      max-width="25"
                      src="https://res.cloudinary.com/diued7ugb/image/upload/v1626939162/Apple_logo_black.svg_rsk1qa.png"
                    >
                      
                    </v-img><span style="padding-left: 10px"></span>
                    Apple
                  </v-btn>
                </v-col> </v-row
              ><br />
              <p style="font-size: 0.75rem">
                Have an Accont? <a href="/login">Login</a>
              </p> -->
                    </v-container>
                </v-form>
            </v-col>
        </v-row>
    </v-container>

    <footer />
    <h3></h3>
</div>
</template>

<script>
import {
    mapActions
} from "vuex";
import BottonNav from "../components/BottonNav.vue";
import Footer from "../components/Footer.vue";
import MainNav from "../components/MainNav.vue";
import TopNav from "../components/TopNav.vue";
export default {
    components: {
        TopNav,
        MainNav,
        BottonNav,
        Footer
    },
    name: "UserProfile",
    data: () => ({
        userData: {
            user_id: 0,
            secondary_email: "",
            secondary_phone: "",
            business_location: "",
        },
    }),
    methods: {
        ...mapActions(["updateUser"]),
        async updateUserDetails() {
            try {
                const response = await this.updateUser(this.userData);
                if (response.status == 200) {
                    this.$router.push("/register");
                }
            } catch (error) {
                throw new Error("Failed, Please try again");
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
