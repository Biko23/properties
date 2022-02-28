<template>
<div id="main-div">
    <base-dialog :message="message" :title="title" :dialogState="state">
        <template v-slot:button>
            <v-btn text @click="state = !state">close</v-btn>
        </template>
    </base-dialog>
    <v-container>
        <div style="text-align: center">
            <h3 style="color: white">List A rental</h3>
            <h4 style="color: #b9cbdb">Step 2/4</h4>
        </div>
        <br />
        <v-form ref="propertyForm1" v-model="valid" lazy-validation>
            <v-row id="form-row">
                <v-col cols="12" md="12">
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-row>
                                <v-col cols="12" sm="12" md="6">
                                    <v-select v-model="property.type" :rules="[propertyRules.type]" :items="allPropertyTypes" label="Select Property Type" solo></v-select>
                                </v-col>
                                <v-col class="d-flex" cols="12" sm="6">
                                    <v-combobox v-model="property.features" :rules="[propertyRules.features]" :items="allPropertyFeatures" label="Select Feature" multiple solo></v-combobox>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col class="d-flex" cols="12" sm="12" md="12">
                            <v-row>
                                <v-col class="d-flex" cols="12" sm="4">
                                    <v-select v-model="property.district_id" :rules="[propertyRules.type]" :items="districts" item-text="district_name" item-value="district_id" @change="fetchDivisions" label="Select District" solo></v-select>
                                </v-col>
                                <v-col class="d-flex" cols="12" sm="4">
                                    <v-select v-model="property.division_id" :rules="[propertyRules.type]" :items="divisions" @change="fetchSuburbs" item-text="division_name" item-value="division_id" label="Select Division" hint="Select district first" solo></v-select>
                                </v-col>
                                <v-col class="d-flex" cols="12" sm="4">
                                    <v-select v-model="property.suburb_id" :rules="[propertyRules.type]" :items="suburbs" item-text="suburb_name" item-value="suburb_id" label="Select Suburb" hint="Select suburb first" solo></v-select>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" sm="12">
                            <v-textarea v-model="property.propertyDescription" :rules="[propertyRules.propertyDescription]" class="custom-label-color" label="Property Description" placeholder="Describe the property beliefly i.e, a two storeyed building with tiles roof located in kampala 20 kms off masaka highway" solo></v-textarea>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12">
                            <h3>Add Property Photo</h3>
                            <p style="font-size: 12px; margin-right: 100px; font-style: normal">
                                Add at least 4 photos for this category. First picture - is the
                                title picture. You can change the order of photos: just grab
                                your photos and drag
                            </p>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-row>
                                        <v-col cols="12" md="12">
                                            <v-text-field v-model="property.description" :rules="[propertyRules.description]" class="custom-label-color" label="Visual description" solo></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="12">
                                            <UploadImages style="background-color: #e7f0ff" :max="6" uploadMsg="Drag n' drop. The first image should be the main image" fileError="images files only accepted" clearAll="Clear" @changed="handleImages" />
                                            <br><br>
                                        </v-col>
                                        <v-col cols="12" md="12">
                                            <v-text-field background-color="#e7f0ff" color="#e7f0ff" style="margin-top: -7%; z-index: 0;" v-model="property.imageValidatorField" :rules="[propertyRules.imageSelectCheck]" class="custom-label-color" readonly flat>
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>

                            <p style="font-size: 12px; margin-right: 100px">
                                Each picture must not exceed 5 Mb Supported formats are *.jpg,
                                *.gif and *.png
                            </p>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col style="display: flex; flex-direction: row; justify-content: flex-end;">
                            <base-spinner 
                                style="margin-right: 30px; margin-left: 40px; margin-bottom: 15px;" v-if="submitting" />
                            <v-btn style="background-color: #3b6ef3; width: 200px" :disabled="!valid" @click="storePropertyData" v-else>
                                <span style="
                                    color: #ffffff;
                                    font-size: 18px;
                                    font-style: normal;
                                    font-weight: 300;
                                    line-height: 30px;
                                    letter-spacing: 0em;
                                    text-align: center;
                                    text-transform: capitalize;
                                ">
                                    Second Step
                                </span>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-form>
        <br />
    </v-container>
</div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from "vuex";
import UploadImages from "vue-upload-drop-images";

export default {
    name: "RegisterProperty",
    data: () => ({
        submitting: false,
        message: '',
        title: '',
        state: false,
        districts: [],
        divisions: [],
        suburbs: [],
        property: {
            type: "",
            district_id: 0,
            division_id: 0,
            suburb_id: 0,
            propertyDescription: "",
            description: "",
            imageValidatorField: "",
            features: [],
            visuals: [],
        },
        valid: true,
        propertyRules: {
            type: value => !!value || "Type is required.",
            description: v => (v && v.length >= 4) || "Min characters should be 5",
            propertyDescription: (value) => !!value || "Property Description is required.",
            features(value) {
                if (value instanceof Array && value.length == 0) {
                    return 'Features are required';
                }
                return !!value || 'Features are required.';
            },
            imageSelectCheck: (value) => !!value || 'At least one image is required.'
        },
        hide: true,
    }),
    components: {
        UploadImages
    },
    computed: {
        ...mapGetters([
            "allPropertyTypes",
            "allPropertyFeatures",
            "allDistricts",
            "allDivisions",
            "allSuburbs"
        ])
    },
    methods: {
        // post rental price to property_rental_value
        ...mapActions([
            "fetchPropertyTypes",
            "fetchPropertyFeatures",
            "addPropertyForRentDataFromPageOne",
            "fetchPropertyCategories",
            "postAUserLog",
            "fetchAllDistricts",
            "fetchDivisionsByDistrictId",
            "fetchSuburbsByDistrictId"
        ]),
        async fetchDistricts() {
            try {
                const response = await this.fetchAllDistricts();
                if (response.data.status == 1) {
                    this.districts = this.allDistricts;
                } else {
                    this.defaultResponse(response.data.message, 'Error', true);
                }
            } catch (error) {
                this.defaultResponse(error.message, 'Error', true);
            }
        },
        async fetchDivisions() {
            try {
                if (this.property.district_id == 0) {
                    this.defaultResponse('No district selected yet', 'Error', true);
                } else {
                    const response = await this.fetchDivisionsByDistrictId(this.property.district_id);
                    if (response.data.status == 1) {
                        this.divisions = this.allDivisions;
                    } else {
                        this.defaultResponse(response.data.message, 'Error', true);
                    }
                }
            } catch (error) {
                this.defaultResponse(error.message, 'Error', true);
            }
        },
        async fetchSuburbs() {
            try {
                if (this.property.division_id == 0) {
                    this.defaultResponse('No division selected yet', 'Error', true);
                } else {
                    const response = await this.fetchSuburbsByDistrictId(this.property.division_id);
                    if (response.data.status == 1) {
                        this.suburbs = this.allSuburbs;
                    } else {
                        this.defaultResponse(response.data.message, 'Error', true);
                    }
                }
            } catch (error) {
                this.defaultResponse(error.message, 'Error', true);
            }
        },
        handleImages(files) {
            this.property.imageValidatorField = files.length <= 0 ? "" : files[0].name;
            this.property.visuals.splice(0, this.property.visuals.length);
            this.property.visuals.push(...files);
        },
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
        storePropertyData() {
            if (this.$refs.propertyForm1.validate()) {
                this.submitting = true
                this.addPropertyForRentDataFromPageOne(this.property)
                    .then(response => {
                        this.submitting = false
                        if (response.status == 201) {
                            this.$router.push("/register2");
                        } else {
                            this.defaultResponse(response.data.message, 'Error', true);
                        }
                    }).catch(error => {
                        this.submitting = false
                        this.defaultResponse(error.message, 'Error', true)
                    });
            }
        }
    },
    created() {
        this.postAUserLog({
            activity: "Visited the Rental Property Listing First page",
            button_clicked: "Property Listing Page"
        });
        this.fetchPropertyTypes();
        this.fetchPropertyFeatures();
        this.fetchPropertyCategories();
        this.fetchDistricts();
    },
};
</script>

<style scoped>
#main-div {
    background-color: #3b6ef3;
}

#form-row {
    background-color: #e7f0ff;
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 6px;
}

#description {
    margin-top: -200px;
}

.custom-placeholer-color input::placeholder {
    color: red !important;
    opacity: 1;
}

.custom-label-color .v-label .solo {
    color: blue;
    opacity: 1;
}

#col-hidden {
    display: none;
}

@media only screen and (max-width: 768px) {
    #main-div {
        background-color: #3b6ef3;
    }

    #form-row {
        background-color: #e7f0ff;
        width: auto;
        margin-left: auto;
        margin-right: auto;
        border-radius: 6px;
    }

    #description {
        margin-top: auto;
    }

    #col-hidden {
        display: block;
    }
}

@media only screen and (max-width: 1200px) {
    #main-div {
        background-color: #3b6ef3;
    }

    #form-row {
        background-color: #e7f0ff;
        width: auto;
        margin-left: auto;
        margin-right: auto;
        border-radius: 6px;
    }
}
</style>
