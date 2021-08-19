<template>
<div style="background-color: #3b6ef3">
    <top-nav />
    <main-nav />
    <v-container>
        <v-row>
            <v-col cols="12" sm="12" md="12" xl="12">
                <h3 style="
              color: white;
              font-weight: 400;
              text-align: center;
              margin-top: 20px;
            ">
                    Edit Your profile
                </h3>
                <br />
                <v-form id="form" style="background-color: rgb(231, 240, 255)" ref="moreUserDataForm" v-model="valid" lazy-validation>
                    <v-text-field style="display: none" v-model="userData.user_id" type="hidden"></v-text-field>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <p>Phone Number:</p>
                                <v-text-field :rules="phoneNumberRules" v-model="userData.telephone" label="Phone number" placeholder="Enter phone number" solo></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <p>Secondary Email:</p>
                                <v-text-field :rules="[userRules.secondary_email]" v-model="userData.secondary_email" label="Secondary Email" placeholder="Enter secondary email" solo></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <p>Secondary Phone:</p>
                                <v-text-field :rules="[userRules.secondary_contact]" v-model="userData.secondary_contact" label="Username" placeholder="Placeholder" solo></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <p>Business Location</p>
                                <v-text-field :rules="[userRules.business_location]" v-model="userData.business_location" label="Business Location " placeholder="Business location" solo></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <v-btn color="primary" :disabled="!valid || iAmASeller" @click="updateUserDetails" block>Update Your Details</v-btn>
                            </v-col>
                            <!-- <v-col cols="12" sm="12" md="12" style="text-align: center; color: green; font-size: 20px;">
                  <p v-if="iAmASeller && iAmACertifiedSeller">
                    You are already approved as a seller
                  </p>
                  <p v-else-if="iAmASeller && !iAmACertifiedSeller">
                    You are already a registered seller pending approval
                  </p>
                  <p v-else>Fill in Details above to become a seller</p>
                </v-col> -->
                        </v-row>
                    </v-container>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
    <about />
    <Footer />
    <h3></h3>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from "vuex";
import BottonNav from "../components/BottonNav.vue";
import About from "./About.vue";
import Footer from "../components/Footer.vue";
import MainNav from "../components/MainNav.vue";
import TopNav from "../components/TopNav.vue";
export default {
    components: {
        TopNav,
        MainNav,
        BottonNav,
        About,
        Footer,
    },
    name: "EditProfile",
    data: () => ({
        valid: true,
        userData: {
            user_id: 0,
            secondary_email: "",
            secondary_contact: "",
            business_location: "",
            telephone: ''
        },
        userRules: {
            secondary_email: (value) => !!value || "Secondary email is required.",
            secondary_contact: (v) => (v && v.length >= 7) || "Min characters should be 8",
            business_location: (value) => !!value || "Business location is required.",
        },
        phoneNumberRules: [
            v => !!v || "Phone Number Required",
            v => (v && v.length >= 10) || "Number should not be less than 9",
            v => (v && v.length < 11) || "Number should not exceed 10 characters",
            v => /[0-9]/.test(v) || "Number should not contains letters"
        ],
    }),
    created() {
        this.fetchAllUserRoles();
    },
    computed: {
        ...mapGetters(["currentLoggedinUser", "iAmASeller", "iAmACertifiedSeller"]),
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
