<template>
<div style="background-color: #3b6ef3">
    <base-dialog :message="message" :title="title" :dialogState="state">
        <template v-slot:button>
            <v-btn text @click="state = !state">close</v-btn>
        </template>
    </base-dialog>
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
                    <v-text-field style="display: none" v-model="currentLoggedinUser.user_id" type="hidden"></v-text-field>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <p>Secondary Email:</p>
                                <v-text-field :rules="[userRules.secondary_email]" v-model="currentLoggedinUser.vendor_secondary_email" label="Secondary Email" placeholder="Enter secondary email" solo></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <p>Secondary Phone:</p>
                                <v-text-field :rules="[userRules.secondary_contact]" v-model="currentLoggedinUser.vendor_secondary_phone_number" label="Secondary Phone" placeholder="Placeholder" solo></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <p>Business Location</p>
                                <v-text-field :rules="[userRules.business_location]" v-model="currentLoggedinUser.business_location" label="Business Location " placeholder="Business location" solo></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <v-btn color="primary" :disabled="!valid" @click="updateUserDetails" block>Update My Profile</v-btn>
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
import {
    mapActions,
    mapGetters
} from "vuex";
import BottonNav from "../components/BottonNav.vue";
export default {
    components: {
        BottonNav
    },
    name: "EditProfile",
    data: () => ({
        valid: true,
        userData: {},
        message: '',
        title: '',
        state: false,
        userRules: {
            secondary_email: (value) => !!value || "Secondary email is required.",
            secondary_contact: (v) => (v && v.length >= 7) || "Min characters should be 8",
            business_location: (value) => !!value || "Business location is required.",
        },
        phoneNumberRules: [
            (v) => !!v || "Phone Number Required",
            (v) => (v && v.length >= 10) || "Number should not be less than 9",
            (v) => (v && v.length < 11) || "Number should not exceed 10 characters",
            (v) => /[0-9]/.test(v) || "Number should not contains letters",
        ],
    }),
    created() {
        this.fetchAllUserRoles();
        this.postAUserLog({
            "activity":`Visited Edit Profile Page`, 
            "button_clicked":"View EditProfile Page"
        });
    },
    computed: {
        ...mapGetters([
            "currentLoggedinUser", 
            "iAmASeller", 
            "iAmACertifiedSeller"
        ])
    },
    methods: {
        ...mapActions([
            "updateUserProfile", 
            "fetchAllUserRoles", 
            "fetchLoggedUser", 
            "postAUserLog"
        ]),
        defaultResponse(msg, heading, status) {
            this.message = msg
            this.title = heading
            this.state = status
            setTimeout(() => {
                this.message = ""
                this.title = ""
                this.state = false
            }, 3000);
        },
        async updateUserDetails() {
            this.userData = {
                user_id: this.currentLoggedinUser.user_id, 
                secondary_email: this.currentLoggedinUser.vendor_secondary_email,
                secondary_contact: this.currentLoggedinUser.vendor_secondary_phone_number,
                business_location: this.currentLoggedinUser.business_location
            }
             this.postAUserLog({
                "activity":`Updated my personal profile`, 
                "button_clicked":"Update Profile Button"
            });
            try {
                if (this.$refs.moreUserDataForm.validate()) {
                    const response = await this.updateUserProfile(this.userData);
                    if (response.data.status == 1) {
                        this.fetchLoggedUser();
                        this.defaultResponse('Account details updated successfully!!', 'Success', true);
                        setTimeout(() => {
                            this.$router.push('/user-settings');
                        }, 2000);
                    } else {
                        this.defaultResponse(response.data.message, 'Error', true);
                    }
                }
            } catch (error) {
                this.defaultResponse(error.message, 'Error', true);
            }
        }
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
