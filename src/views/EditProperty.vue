<template>
<div>
    <base-dialog :message="message" :title="title" :dialogState="state">
        <template v-slot:button>
            <v-btn text @click="state = !state">close</v-btn>
        </template>
    </base-dialog>
    <!-- start property legal protection  -->
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
                                    type="text"
                                    v-model="legalProtection.primary_phone_contact" 
                                    :rules="phoneNumberRules" 
                                    label="Primary Number *" 
                                    hint="0780111111"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="6">
                                <v-text-field 
                                    v-model="legalProtection.primary_email_contact" 
                                    :rules="emailRules" 
                                    label="Primary Email *"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="6">
                                 <v-text-field 
                                    type="text"
                                    v-model="legalProtection.secondary_phone_contact" 
                                    :rules="legalProtection.secondary_phone_contact > 0 ? phoneNumberRules : ''" 
                                    label="Secondary Number" 
                                    hint="0780111111"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="6">
                                <v-text-field 
                                    v-model="legalProtection.secondary_email_contact"
                                    :rules="legalProtection.secondary_email_contact> 0 ? emailRules : ''"
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
                                                v-if="formTitle == 'Create'"
                                                block 
                                                color="primary" 
                                                :disabled="!valid" 
                                                @click="postLegalData"
                                            >
                                                {{formTitle}} legal Details
                                            </v-btn>
                                            <v-btn
                                                v-else
                                                block 
                                                color="primary" 
                                                :disabled="!valid" 
                                                @click="updateLegalData"
                                            >
                                                {{formTitle}} legal Details
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
    <!-- end property legal protection -->
    <!-- edit property features -->
    <v-dialog v-model="featuresDialog" max-width="700px">
        <v-card>
            <v-card-title>
                <span class="text-h5">Edit property Features</span>
            </v-card-title>
            <v-card-text>
                <v-form ref="featuresForm" v-model="valid" lazy-validation>
                    <v-container>
                        <v-row>
                            <p>Property current features</p>
                            <v-col 
                                cols="12" 
                                sm="12" 
                                md="12" 
                                id="features-container"
                            >
                                    <p class="text-h6 ml-2 features" v-for="(item, index) in allCurrentPropertyFeatures" :key="index">
                                        {{item.name}}
                                        <v-btn class="mx-2" icon @click="deletePropertyFeature(item)">
                                            <v-icon size="24px">
                                                mdi-close
                                            </v-icon>
                                        </v-btn>
                                    </p>
                            </v-col>
                            <v-col class="d-flex" cols="12" sm="12">
                                <v-combobox
                                    v-model="features"
                                    :rules="[propertyRules.features]"
                                    :items="allPropertyFeatures"
                                    label="Select New Feature"
                                    multiple
                                ></v-combobox>
                            </v-col>
                            <v-col cols="12">
                                <v-row>
                                    <v-col cols="12" sm="6" md="6">
                                        <template>
                                            <v-btn block color="warning" @click="featuresDialog = false">
                                                Cancel
                                            </v-btn>
                                        </template>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <template>
                                            <v-btn
                                                block 
                                                color="primary" 
                                                :disabled="!valid" 
                                                @click="addNewFeatures"
                                            >
                                                Update Property Features
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
    <!-- End edit property features -->
    <!-- edit property values -->
    <v-dialog v-model="valuesDialog" max-width="500px">
        <v-card>
            <v-card-title>
                <span class="text-h5">Edit property Cost</span>
            </v-card-title>
            <v-card-text>
                <v-form ref="featuresForm" v-model="valid" lazy-validation>
                    <v-container>
                        <v-row>
                            <p>Property current Cost</p>
                            <v-col class="d-flex" cols="12" sm="12">
                                <v-row>
                                    <v-col cols="12" sm="12" md="3">
                                         <v-select
                                            v-model="propertyValue.currency_id"
                                            :rules="[currencyRules.required]"
                                            :items="allCurrencies"
                                            label="Unit"
                                        ></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="9">
                                        <v-text-field 
                                            v-model="propertyValue.actual_value" 
                                            :rules="[currencyRules.required, currencyRules.numb]" 
                                            label="Property Cost" 
                                            placeholder="Enter new property price" 
                                        ></v-text-field>
                                    </v-col> 
                                </v-row>
                            </v-col>
                            <v-col cols="12">
                                <v-row>
                                    <v-col cols="12" sm="6" md="6">
                                        <template>
                                            <v-btn block color="warning" @click="valuesDialog = false">
                                                Cancel
                                            </v-btn>
                                        </template>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <template>
                                            <v-btn
                                                block 
                                                color="primary" 
                                                :disabled="!valid" 
                                                @click="updatePropertyValue"
                                            >
                                                Update Cost
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
    <!-- End edit property values -->
    <!-- edit property location -->
    <v-dialog v-model="locationDialog" max-width="600px">
        <v-card>
            <v-card-title>
                <span class="text-h5">Edit property Location</span>
            </v-card-title>
            <v-card-text>
                <v-form ref="locationForm" v-model="valid" lazy-validation>
                    <v-container>
                        <v-row>
                            <p style="font-weight: 500; font-size: 16px;">Property current Location: {{propertyLocation.district}}, {{propertyLocation.division}}, {{propertyLocation.suburb_name}} suburb</p>
                            <v-col class="d-flex" cols="12" sm="12">
                                <v-row>
                                    <v-col cols="12" sm="12" md="12">
                                         <v-select
                                            v-model="propertyLocation.district_id"
                                            :rules="[locationRules.required]"
                                            :items="districts"
                                            @change="fetchDivisions"
                                            item-text="district_name"
                                            item-value="district_id"
                                            label="District"
                                        ></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                         <v-select
                                            v-model="propertyLocation.division_id"
                                            :rules="[locationRules.required]"
                                            :items="divisions"
                                             @change="fetchSuburbs"
                                             item-text="division_name"
                                            item-value="division_id"
                                            label="Division"
                                        ></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                         <v-select
                                            v-model="propertyLocation.suburb_id"
                                            :rules="[locationRules.required]"
                                            :items="suburbs"
                                             item-text="suburb_name"
                                            item-value="suburb_id"
                                            label="Suburb"
                                        ></v-select>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="12">
                                <v-row>
                                    <v-col cols="12" sm="6" md="6">
                                        <template>
                                            <v-btn block color="warning" @click="locationDialog = false">
                                                Cancel
                                            </v-btn>
                                        </template>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <template>
                                            <v-btn
                                                block 
                                                color="primary" 
                                                :disabled="!valid" 
                                                @click="updatePropertyLocation"
                                            >
                                                Update Location
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
    <!-- End edit property location -->
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
                                    <v-btn class="ma-2" outlined color="indigo" block @click="navigateToEditPropertyVisuals">Edit property Visuals</v-btn>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="12" md="6">
                                    <p class="text-h6" style="font-weight: 400;">Neighborhood Visuals:</p>
                                </v-col>
                                <v-col cols="12" sm="12" md="6">
                                    <v-btn class="ma-2" outlined color="indigo" block :to="`/edit-neighborhood-visuals/${property_id}?type=${$route.query.type}`">Edit Neighborhood Visuals</v-btn>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="12" md="6">
                                    <p class="text-h6" style="font-weight: 400;">Landmark Visuals:</p>
                                </v-col>
                                <v-col cols="12" sm="12" md="6">
                                    <v-btn class="ma-2" outlined color="indigo" block @click="navigateToEditLandmarkVisuals">Edit Landmark Visuals</v-btn>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="12" md="6">
                                    <p class="text-h6" style="font-weight: 400;">Property Value:</p>
                                </v-col>
                                <v-col cols="12" sm="12" md="6">
                                    <v-btn class="ma-2" outlined color="indigo" block @click="valuesDialog = true">Edit Property Value</v-btn>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="12" md="6">
                                    <p class="text-h6" style="font-weight: 400;">Property Features:</p>
                                </v-col>
                                <v-col cols="12" sm="12" md="6">
                                    <v-btn class="ma-2" outlined color="indigo" block @click="featuresDialog = true">Edit Property Features</v-btn>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="12" md="6">
                                    <p class="text-h6" style="font-weight: 400;">Property Location:</p>
                                </v-col>
                                <v-col cols="12" sm="12" md="6">
                                    <v-btn class="ma-2" outlined color="indigo" block @click="loadLocationDialog">Edit Property Location</v-btn>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="12" md="6">
                                    <p class="text-h6" style="font-weight: 400;">Property Legal Protection:</p>
                                </v-col>
                                <v-col cols="12" sm="12" md="6">
                                    <v-btn class="ma-2" outlined color="indigo" block @click="loadLegalDialog">{{formTitle}} Property Legal Protection</v-btn>
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
        featuresDialog: false,
        valuesDialog: false,
        locationDialog: false,
        valid: true,
        legalProtection: {},
        propertyValue: {},
        propertyLocation: {},
        districts: [],
        divisions: [],
        suburbs: [],
        features: [],
        formTitle: '',
        message: '',
        title: '',
        state: false,
        propertyRules: {
            features(value) {
                if (value instanceof Array && value.length == 0) {
                return "At least one feature is required!";
                }
                return !!value || "At least one feature is required!";
            }
        },
        currencyRules: {
            required: (v) => !!v || "Field is Required",
            numb: v => /[0-9]/.test(v) || "Number should not contains letters"
        },
        locationRules: {
            required: (v) => !!v || "Field is Required"
        },
        protectionRules: {
            numb: v => /[0-9]/.test(v) || "Number should not contains letters",
            char: v => /[a-zA-Z]/.test(v) || "Letters should not contains numbers",
            min: v => (v && v.length >= 2) || "Min characters should be 3"
        },
        emailRules: [
            v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ],
        phoneNumberRules: [
            (v) => !!v || "Phone Number Required",
            (v) => (v && v.length >= 10) || "Number should not be less than 9",
            (v) => (v && v.length < 15) || "Number should not exceed 16 characters",
            (v) => /[0-9]/.test(v) || "Number should not contains letters",
        ]        
    }),
    created() {

        this.$log.info('Accessing page to edit a property.')
        this.postAUserLog({
            "activity":`Visited Edit Property Page`, 
            "button_clicked":"View Edit Property Page"
        });
        this.fetchPropertyLegalDetails();
        this.fetchPropertyFeatures();
        this.fetchCurrentPropertySelectedFeatures(this.property_id);
        this.loadCurrentPropertyPrice();
        this.fetchAllCurrencyTypes();
        this.findPropertyLocation();
    },
    beforeRouteLeave (to, from , next) {
        this.clearPropertyLegalDetails();
        this.formTitle = '';
        next();
    },
    computed: {
        ...mapGetters([
            "currentPropertyLegalProtection", 
            "currentLoggedinUser", 
            "allCurrentPropertyFeatures",
            "currentPropertyValue",
            "currentRentalValue",
            "allPropertyFeatures",
            "allCurrencies",
            "currentPropertyLocation",
            "allDistricts",
            "allDivisions",
            "allSuburbs"
        ])
    },
    methods: {
        ...mapActions([
            "getPropertyLegalProtection", 
            "postAPropertyLegalProtection", 
            "updateAPropertyLegalProtection",
            "clearPropertyLegalDetails",
            "fetchPropertyFeatures",
            "fetchCurrentPropertySelectedFeatures",
            "deleteAPropertyFeature",
            "addMoreFeaturesToAProperty",
            "fetchCurrentPropertyValue",
            "fetchPropertyRentalValue",
            "fetchCurrencies",
            "fetchPropertyLocationByPropertyId",
            "fetchAllDistricts",
            "fetchDivisionsByDistrictId",
            "fetchSuburbsByDistrictId",
            "updateCurrentPropertyLocation",
            "postAUserLog",
            "updateAPropertyValue",
            "updatePropertyRentalValue"
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
                } else if(response.data.status === 0) {
                    this.formTitle = 'Create';
                    this.legalProtection = {};
                    response.data.message ? this.defaultResponse(response.data.message, 'Error', true) : '';
                }
            } catch (error) {
                this.defaultResponse(error.message, 'Error', true); 
            }
        },
        async postLegalData(){
            if(this.$refs.legalProtectionForm.validate()){
                try {
                    this.legalProtection.property_id = this.property_id;
                    this.legalProtection.created_by = this.currentLoggedinUser.username;
                    this.legalProtection.updated_by = this.currentLoggedinUser.username;
                    this.legalProtection.primary_phone_contact[0] != '+' ? '+' + this.legalProtection.primary_phone_contact : this.legalProtection.primary_phone_contact;
                    this.legalProtection.secondary_phone_contact[0] != '+' ? '+' + this.legalProtection.secondary_phone_contact : this.legalProtection.secondary_phone_contact;
                    const response = await this.postAPropertyLegalProtection(this.legalProtection);
                    if(response.data.status === 1){
                        this.legalDialog = false;
                        this.defaultResponse(response.data.message, 'Success', true);
                        this.fetchPropertyLegalDetails();
                        this.postAUserLog({
                            "activity":`Added legal protection details`, 
                            "button_clicked":"Add legal protection details"
                        });
                    } else {
                        this.legalDialog = false;
                        this.defaultResponse(response.data.message, 'Error', true);
                        this.postAUserLog({
                            "activity":`Failed to add legal protection details`, 
                            "button_clicked":"Failed to add legal protection details"
                        });
                    }
                } catch (error) {
                    this.legalDialog = false;
                    this.defaultResponse(error.message, 'Error', true);
                }
            }
        },
        async updateLegalData(){
            if(this.$refs.legalProtectionForm.validate()){
                try {
                        this.legalProtection.property_id = this.property_id;
                        this.legalProtection.updated_by = this.currentLoggedinUser.username;
                        const response = await this.updateAPropertyLegalProtection(this.legalProtection);
                        if(response.data.status === 1){
                            this.legalDialog = false;
                            this.defaultResponse(response.data.message, 'Success', true);
                            this.postAUserLog({
                            "activity":`Updated legal protection details`, 
                            "button_clicked":"Updated legal protection details"
                        });
                        } else {
                            this.legalDialog = false;
                            this.defaultResponse(response.data.message, 'Error', true);
                            this.postAUserLog({
                                "activity":`Failed to update legal protection details`, 
                                "button_clicked":"Failed to update legal protection details"
                            });
                        }
                } catch (error) {
                    this.legalDialog = false;
                    this.defaultResponse(error.message, 'Error', true);
                } 
            }
        },
        async deletePropertyFeature(item){
            try {
                const response = await this.deleteAPropertyFeature(item.feature_type_lk_id);
                if(response.data.status == 1){
                    this.defaultResponse(response.data.message, 'Success', true);
                    this.fetchCurrentPropertySelectedFeatures(this.property_id);
                    this.postAUserLog({
                        "activity":`Deleted property feature with id ${item.feature_type_lk_id}`, 
                        "button_clicked":`Deleted property feature with id ${item.feature_type_lk_id}`
                    });
                } else {
                    this.defaultResponse(response.data.message, 'Error', true);
                    this.postAUserLog({
                        "activity":`Failed to delete property feature with id ${item.feature_type_lk_id}`, 
                        "button_clicked":`Failed to deleted property feature with id ${item.feature_type_lk_id}`
                    });
                }
            } catch (error) {
                this.defaultResponse(error.message, 'Error', true);
            }
        },
        async addNewFeatures(){
            if (this.$refs.featuresForm.validate()) {
                try {
                    const selectedDetails = {
                        features: this.features,
                        property_id: this.property_id
                    }
                    const response = await this.addMoreFeaturesToAProperty(selectedDetails);
                    if(response.data.status == 1){
                        this.features = [];
                        this.featuresDialog = false;
                        this.defaultResponse(response.data.message, 'Success', true);
                        this.fetchCurrentPropertySelectedFeatures(this.property_id);
                        this.postAUserLog({
                            "activity":`Added new property features ${JSON.stringify(selectedDetails.features)} to property with id ${selectedDetails.property_id}`, 
                            "button_clicked":`Added new property features ${JSON.stringify(selectedDetails.features)} to property with id ${selectedDetails.property_id}`
                        });
                    } else {
                        this.features = [];
                        this.featuresDialog = false;
                        this.defaultResponse(response.data.message, 'Error', true);
                        this.postAUserLog({
                            "activity":`Failed to add new property features ${JSON.stringify(selectedDetails.features)} to property with id ${selectedDetails.property_id}`, 
                            "button_clicked":`Failed to add new property features ${JSON.stringify(selectedDetails.features)} to property with id ${selectedDetails.property_id}`
                        });
                    }
                } catch (error) {
                    this.featuresDialog = false;
                    this.defaultResponse(error.message, 'Error', true);
                }
            }
        },
        // ----------------------------------------------
        // Property value
        // feature currency code 
        async  fetchAllCurrencyTypes(){
            try {
                const response = await this.fetchCurrencies();
                if(response.data.status == 0){
                    this.defaultResponse(response.data.message, 'Error', true);
                }
            } catch (error) {
                this.defaultResponse(error.message, 'Error', true);
            }
        }, 
        // feature current property price
        async getCurrentPropertyPriceDetails(){
            try {
                const response = await this.fetchCurrentPropertyValue(this.property_id);
                if(response.data.status == 1){
                    this.propertyValue = {
                        ...this.currentPropertyValue,
                        property_type: this.$route.query.type
                    }
                } else {
                    this.defaultResponse(response.data.message, 'Error', true);
                }
            } catch (error) {
                this.defaultResponse(error.message, 'Error', true);
            }
        },
        async getCurrentRentalPriceDetails(){
            try {
                const response = await this.fetchPropertyRentalValue(this.property_id);
                if(response.data.status == 1){
                    this.propertyValue = {
                        property_value_id: this.currentRentalValue.rental_value_id,
                        // rental_value_id: this.currentRentalValue.rental_value_id,
                        property_type: this.$route.query.type,
                        created_by: this.currentRentalValue.created_by,
                        currency_id: this.currentRentalValue.currency_id,
                        property_id: this.currentRentalValue.property_id,
                        actual_value: this.currentRentalValue.rental_value_amt,
                        updated_by: this.currentRentalValue.updated_by,
                        when_created: this.currentRentalValue.when_created,
                        when_updated: this.currentRentalValue.when_updated
                    }
                } else {
                    this.defaultResponse(response.data.message, 'Error', true);
                }
            } catch (error) {
                this.defaultResponse(error.message, 'Error', true);
            }
        },
        async loadCurrentPropertyPrice (){
            try {
                if(this.$route.query.type == 'Rent'){
                    await this.getCurrentRentalPriceDetails();
                } else if(this.$route.query.type == 'Sale'){
                    await this.getCurrentPropertyPriceDetails();
                }
            } catch (error) {
               this.defaultResponse(error.message, 'Error', true); 
            }
        },
        // allow updating a property price
        async updatePropertyValue(){
            try {
                let response;
                if(this.propertyValue.property_type == 'Rent'){
                    this.propertyValue.rental_value_id = this.propertyValue.property_value_id
                    this.propertyValue.rental_value_amt = this.propertyValue.actual_value
                }
                this.propertyValue.updated_by = this.currentLoggedinUser.username;

                if(this.propertyValue.property_type == 'Rent'){
                    response = await this.updatePropertyRentalValue(this.propertyValue);
                } else if(this.propertyValue.property_type == 'Sale'){
                    response = await this.updateAPropertyValue(this.propertyValue);
                }  
                
                if(response.data.status == 1){
                    this.defaultResponse('Property Cost successfully saved', 'Success', true);
                    this.valuesDialog = false;
                } else {
                    this.defaultResponse(response.data.message, 'Error', true);
                }
            } catch (error) {
                this.defaultResponse(error.message, 'Error', true);
            }  
        },
        // --------------------- location section
        async findPropertyLocation(){
            try {
                const response = await this.fetchPropertyLocationByPropertyId(this.property_id);
                if(response.data.status == 1){
                    const propertyData = response.data.result;
                    this.propertyLocation = {
                        location_id: propertyData.location_id,
                        district_id: propertyData.district_id,
                        division_id: propertyData.division_id,
                        suburb_id: propertyData.suburb_id,
                        property_id: propertyData.property_id,
                        created_by: propertyData.created_by,
                        updated_by: propertyData.updated_by,
                        district: propertyData.suburb.division.district.district_name,
                        division: propertyData.suburb.division.division_name,
                        suburb_name: propertyData.suburb.suburb_name
                    } 
                } else {
                    this.defaultResponse(response.data.message, 'Error', true);
                }
            } catch (error) {
                this.defaultResponse(error.message, 'Error', true);
            }
        },
        async loadLocationDialog(){
            this.locationDialog = true; 
            await this.fetchDistricts();    
        },
        async fetchDistricts(){
            try {
                const response = await this.fetchAllDistricts();  
                if(response.data.status == 1){
                    this.districts = this.allDistricts;
                    this.fetchDivisions();
                    this.fetchSuburbs();
                } else {
                    this.defaultResponse(response.data.message, 'Error', true);
                }
            } catch (error) {
                this.defaultResponse(error.message, 'Error', true);
            }    
        },
        async fetchDivisions(){
            try {
                const response = await this.fetchDivisionsByDistrictId(this.propertyLocation.district_id);
                if(response.data.status == 1){
                    this.divisions = this.allDivisions;
                } else {
                    this.defaultResponse(response.data.message, 'Error', true);
                }
            } catch (error) {
                this.defaultResponse(error.message, 'Error', true);
            }
        },
        async fetchSuburbs(){
            try {
                const response = await this.fetchSuburbsByDistrictId(this.propertyLocation.division_id);
                 if(response.data.status == 1){
                    this.suburbs = this.allSuburbs;
                } else {
                    this.defaultResponse(response.data.message, 'Error', true);
                }
            } catch (error) {
                this.defaultResponse(error.message, 'Error', true);
            }
        },
        async updatePropertyLocation(){
            if (this.$refs.locationForm.validate()) {
                try {
                    this.propertyLocation.updated_by = this.currentLoggedinUser.username;
                    const response = await this.updateCurrentPropertyLocation(this.propertyLocation);
                    if(response.data.status == 1){
                        this.findPropertyLocation();
                        this.locationDialog = false; 
                        this.defaultResponse(response.data.message, 'Success', true);
                    } else {
                        this.defaultResponse(response.data.message, 'Error', true);
                    }
                } catch (error) {
                    this.defaultResponse(error.message, 'Error', true);
                }
            }
        },
        // ---------------------- end location section
        closeLegalDialog(){
            this.legalDialog = false;
            this.legalProtection = {};
        },
        async loadLegalDialog(){
            this.legalDialog = true
        },
        async navigateToEditPropertyVisuals(){
            this.$router.push(`/edit-property-visuals/${this.property_id}?type=${this.$route.query.type}`);
        },
        async navigateToEditLandmarkVisuals(){
            this.$router.push(`/edit-landmark-visuals/${this.property_id}?type=${this.$route.query.type}`);
        },
        // async navigateToEditNeighborhoodVisuals(){
        //     this.$router.push(`/edit-neighborhood-visuals/${this.property_id}`);
        // }
    },
};
</script>
<style scoped>
    .features {
        border: 1px solid #00000050; 
        border-radius: 16px; 
        padding: 3px 3px; 
        font-weight:400;
    }
    #features-container {
        display: flex; 
        flex-direction: row; 
        flex-wrap: wrap;
    }
</style>