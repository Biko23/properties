<template>
<div>
    <base-dialog :message="message" :title="title" :dialogState="state">
        <template v-slot:button>
            <v-btn text @click="state = !state">close</v-btn>
        </template>
    </base-dialog>
    <!--  -->
    <v-dialog v-model="legalDialog" max-width="700px">
        <v-card>
            <v-card-title>
                <span class="text-h5">{{ formTitle }} property Legal Details</span>
            </v-card-title>
            <v-card-text>.
                <v-form ref="legalProtectionForm" v-model="valid" lazy-validation>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <v-textarea
                                    outlined
                                    v-model="legalProtection.description" 
                                    :rules="[protectionRules.min, protectionRules.char]" 
                                    label="Legal Description *"
                                ></v-textarea>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field 
                                    type="number"
                                    v-model="legalProtection.primary_phone_contact" 
                                    :rules="[protectionRules.phoneLength, protectionRules.numb]" 
                                    label="Primary Number *" 
                                    hint="0780111111"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                 <v-text-field 
                                    type="number"
                                    v-model="legalProtection.secondary_phone_contact" 
                                    :rules="legalProtection.secondary_phone_contact > 0 ? [protectionRules.phoneLength, protectionRules.numb] : ''" 
                                    label="Secondary Number *" 
                                    hint="0780111111"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field 
                                    v-model="legalProtection.primary_email_contact" 
                                    :rules="[protectionRules.email]" 
                                    label="Primary Email *"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field 
                                    v-model="legalProtection.secondary_email_contact"
                                    :rules="legalProtection.secondary_email_contact > 0 ? [protectionRules.email] : ''"
                                    label="Secondary Email"
                                ></v-text-field>
                            </v-col>
                            <!-- 
                                @Column(nullable = false) private Long property_id;
                                @Column(nullable = false) private String created_by;
                                @Column(nullable = false) private LocalDateTime when_created;
                                @Column(nullable = false) private String updated_by;
                                @Column(nullable = false) private LocalDateTime when_updated;
                             -->
                            <v-col cols="12">
                                <template>
                                    <v-btn block color="primary" :disabled="!valid" @click="postLegalData">
                                        {{formTitle}} legal Details
                                    </v-btn>
                                </template>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
    <!--  -->
    <v-container>
        <v-row>
            <v-col cols="12" sm="12" md="12" xl="12">
                <p class="text-h5" style="
              font-weight: 400;
              text-align: center;
              margin-top: 20px;
            ">
                    Edit property details
                </p>
                <br />
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="12" md="12" style="padding-left: 16px;">
                            <v-row>
                                <v-col cols="12" sm="12" md="6">
                                    <p class="text-h6" style="font-weight: 400;">Property Visuals:</p>
                                </v-col>
                                <v-col cols="12" sm="12" md="6">
                                    <v-btn class="ma-2" outlined color="indigo" block to="/edit-property-visuals">Edit property Visuals</v-btn>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="12" md="6">
                                    <p class="text-h6" style="font-weight: 400;">Neighborhood Visuals:</p>
                                </v-col>
                                <v-col cols="12" sm="12" md="6">
                                    <v-btn class="ma-2" outlined color="indigo" block to="/edit-neighborhood-visuals">Edit Neighborhood Visuals</v-btn>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="12" md="6">
                                    <p class="text-h6" style="font-weight: 400;">Landmark Visuals:</p>
                                </v-col>
                                <v-col cols="12" sm="12" md="6">
                                    <v-btn class="ma-2" outlined color="indigo" block to="/edit-landmark-visuals">Edit Landmark Visuals</v-btn>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="12" md="6">
                                    <p class="text-h6" style="font-weight: 400;">Property Value:</p>
                                </v-col>
                                <v-col cols="12" sm="12" md="6">
                                    <v-btn class="ma-2" outlined color="indigo" block to="/edit-property-value">Edit Property Value</v-btn>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="12" md="6">
                                    <p class="text-h6" style="font-weight: 400;">Property Location:</p>
                                </v-col>
                                <v-col cols="12" sm="12" md="6">
                                    <v-btn class="ma-2" outlined color="indigo" block to="/edit-property-location">Edit Property Location</v-btn>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="12" md="6">
                                    <p class="text-h6" style="font-weight: 400;">Property Legal Protection:</p>
                                </v-col>
                                <v-col cols="12" sm="12" md="6">
                                    <v-btn class="ma-2" outlined color="indigo" block @click="legalDialog = true">Edit Property Legal Protection</v-btn>
                                </v-col>
                            </v-row>
                             <v-row>
                                <v-col cols="12" sm="12" md="12">
                                    <v-btn class="ma-2" outlined color="indigo" block to="/property-details">Done Editing</v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-container>
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
        legalDialog: false,
        valid: true,
        userData: {},
        message: '',
        title: '',
        state: false,
        // userRules: {
        //     secondary_email: (value) => !!value || "Secondary email is required.",
        //     secondary_contact: (v) => (v && v.length >= 7) || "Min characters should be 8",
        //     business_location: (value) => !!value || "Business location is required.",
        // },
        // min
        // char
        // phoneLength
        // phoneLength
        // numb
        // email
        // phoneNumberRules: [
        //     (v) => !!v || "Phone Number Required",
        //     (v) => (v && v.length >= 10) || "Number should not be less than 9",
        //     (v) => (v && v.length < 11) || "Number should not exceed 10 characters",
        //     (v) => /[0-9]/.test(v) || "Number should not contains letters",
        // ],
    }),
    created() {
        this.fetchAllUserRoles();
        this.postAUserLog({
            "activity":`Visited Edit Profile Page`, 
            "button_clicked":"View EditProfile Page"
        });
    },
    computed: {
        ...mapGetters(["currentLoggedinUser", "iAmASeller", "iAmACertifiedSeller"]),
    },
    methods: {
        ...mapActions(["updateUserProfile", "fetchAllUserRoles", "fetchLoggedUser", "postAUserLog"]),
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
        postLegalData(){

        }
        // async updateUserDetails() {
        //      this.postAUserLog({
        //         "activity":`Updated my personal profile`, 
        //         "button_clicked":"Update Profile Button"
        //     });
        // }
    },
};
</script>