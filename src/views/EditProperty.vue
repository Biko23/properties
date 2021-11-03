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
            <v-card-text>
                <v-form ref="legalProtectionForm" v-model="valid" lazy-validation>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="12" md="6">
                                <v-text-field 
                                    type="number"
                                    v-model="legalProtection.primary_phone_contact" 
                                    :rules="[protectionRules.phoneLength, protectionRules.numb]" 
                                    label="Primary Number *" 
                                    hint="0780111111"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="6">
                                <v-text-field 
                                    v-model="legalProtection.primary_email_contact" 
                                    :rules="[protectionRules.email]" 
                                    label="Primary Email *"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="6">
                                 <v-text-field 
                                    type="number"
                                    v-model="legalProtection.secondary_phone_contact" 
                                    :rules="legalProtection.secondary_phone_contact > 0 ? [protectionRules.phoneLength, protectionRules.numb] : ''" 
                                    label="Secondary Number" 
                                    hint="0780111111"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="6">
                                <v-text-field 
                                    v-model="legalProtection.secondary_email_contact"
                                    :rules="legalProtection.secondary_email_contact > 0 ? [protectionRules.email] : ''"
                                    label="Secondary Email"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-textarea
                                    outlined
                                    v-model="legalProtection.description" 
                                    :rules="[protectionRules.min, protectionRules.char]" 
                                    label="Legal Description *"
                                ></v-textarea>
                            </v-col>
                            <v-col cols="12">
                                <v-row>
                                    <v-col cols="12" sm="6" md="6">
                                        <template>
                                            <v-btn block color="warning" @click="closeLegalDialog">
                                                Cancel
                                            </v-btn>
                                        </template>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <template>
                                            <v-btn
                                                v-if="currentPropertyLegalProtection == {}"
                                                block 
                                                color="primary" 
                                                :disabled="!valid" 
                                                @click="postLegalData"
                                            >
                                                {{formTitle}} legal Details 1
                                            </v-btn>
                                            <v-btn
                                                v-else
                                                block 
                                                color="primary" 
                                                :disabled="!valid" 
                                                @click="updateLegalData"
                                            >
                                                {{formTitle}} legal Details 2
                                            </v-btn>
                                        </template>
                                    </v-col>
                                </v-row>
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
                                    <v-btn class="ma-2" outlined color="indigo" block @click="loadLegalDialog">Edit Property Legal Protection</v-btn>
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
import { mapActions, mapGetters } from "vuex";
import BottonNav from "../components/BottonNav.vue";
export default {
    components: {
        BottonNav
    },
    name: "EditProfile",
    props: ["property_id"],
    data: () => ({
        legalDialog: false,
        valid: true,
        legalProtection: {},
        protectionRules: [],
        formTitle: '',
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
        this.postAUserLog({
            "activity":`Visited Edit Profile Page`, 
            "button_clicked":"View EditProfile Page"
        });
        this.fetchPropertyLegalDetails();
    },
    beforeUnmount(){
        this.clearPropertyLegalDetails();
    },
    computed: {
        ...mapGetters(["currentPropertyLegalProtection", "currentLoggedinUser"]),
    },
    methods: {
        ...mapActions([
            "getPropertyLegalProtection", 
            "postAPropertyLegalProtection", 
            "updateAPropertyLegalProtection",
            "clearPropertyLegalDetails",
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
            }, 2000);
        },
        async fetchPropertyLegalDetails(){
            try {
                const response = await this.getPropertyLegalProtection(this.property_id);
                if(response.data.status === 1){
                    if(response.data.result != {}) {
                        this.formTitle = 'Edit';
                        this.legalProtection = this.currentPropertyLegalProtection;
                    } else {
                        this.formTitle = 'Create';
                        this.legalProtection = {};
                    }
                } else {
                    this.formTitle = 'Create';
                    this.legalProtection = {};
                    response.data.message ? this.defaultResponse(response.data.message, 'Error', true) : '';
                }
            } catch (error) {
                this.defaultResponse(error.message, 'Error', true); 
            }
        },
        async postLegalData(){
            try {
                this.legalProtection.property_id = this.property_id;
                this.legalProtection.created_by = this.currentLoggedinUser.username;
                this.legalProtection.updated_by = this.currentLoggedinUser.username;
                const response = await this.postAPropertyLegalProtection(this.legalProtection);
                if(response.data.status === 1){
                    this.defaultResponse(response.data.message, 'Success', true);
                    this.fetchPropertyLegalDetails();
                } else {
                    this.defaultResponse(response.data.message, 'Error', true);
                }
            } catch (error) {
                this.defaultResponse(error.message, 'Error', true);
            }
        },
        async updateLegalData(){
           try {
                this.legalProtection.property_id = this.property_id;
                this.legalProtection.updated_by = this.currentLoggedinUser.username;
                const response = await this.updateAPropertyLegalProtection(this.legalProtection);
                if(response.data.status === 1){
                    this.defaultResponse(response.data.message, 'Success', true);
                } else {
                    this.defaultResponse(response.data.message, 'Error', true);
                }
           } catch (error) {
               this.defaultResponse(error.message, 'Error', true);
           } 
        },
        closeLegalDialog(){
            this.legalDialog = false;
            this.legalProtection = {};
        },
        async loadLegalDialog(){
            try {
                this.legalDialog = true
            } catch (error) {
                
            }
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