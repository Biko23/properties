<template>
<div style="background-color: #3b6ef3">
    <v-container>
        <!-- success Dialog -->
        <v-dialog transition="dialog-top-transition" persistent v-model="messageDialog" max-width="600">
            <template>
                <v-card>
                    <v-toolbar color="primary" dark>Success</v-toolbar>
                    <v-card-text class="pt-5">
                        <p style="font-size: 16px">{{ responseMessage }}</p>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn text @click="closeMessageDialog">close</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
        <!-- end success Dialog -->
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
                                <v-btn color="primary" :disabled="!valid" @click="updateUserDetails" block>Update Your Details</v-btn>
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
        messageDialog: false,
        responseMessage: '',
        userRules: {
            secondary_email: (value) => !!value || "Secondary email is required.",
            secondary_contact: (v) =>
                (v && v.length >= 7) || "Min characters should be 8",
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
    },
    computed: {
        ...mapGetters(["currentLoggedinUser", "iAmASeller", "iAmACertifiedSeller"]),
    },
    methods: {
        ...mapActions(["updateUser", "fetchAllUserRoles", "fetchLoggedUser"]),
        async updateUserDetails() {
            this.userData = {
                user_id: this.currentLoggedinUser.user_id, 
                secondary_email: this.currentLoggedinUser.vendor_secondary_email,
                secondary_contact: this.currentLoggedinUser.vendor_secondary_phone_number,
                business_location: this.currentLoggedinUser.business_location
            }
            try {
                if (this.$refs.moreUserDataForm.validate()) {
                    const response = await this.updateUser(this.userData);
                    if (response.status == 200) {
                        this.fetchLoggedUser().then(() => {
                            if (response.status === 200) {
                                this.messageDialog = true;
                                this.responseMessage = 'Account details updated successfully!!';
                                setTimeout(() => {
                                    this.messageDialog = false;
                                    this.responseMessage = '';
                                    this.$router.push('/user-settings');
                                }, 2000);
                                return;
                            }
                        });
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        closeMessageDialog() {
            this.messageDialog = false;
            this.responseMessage = "";
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
