<template>
<div class="main-div">
    <v-container>
        <!-- success Dialog -->
        <v-dialog transition="dialog-top-transition" persistent v-model="messageDialog" max-width="600">
            <template>
                <v-card>
                    <v-toolbar color="success" dark>Success</v-toolbar>
                    <v-card-text>
                        {{responseMessage}}
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn text @click="closeDialog">close</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
        <!-- end Success Dialog -->
        <!-- failure Dialog -->
        <v-dialog transition="dialog-top-transition" persistent v-model="failureDialog" max-width="600">
            <template>
                <v-card>
                    <v-toolbar color="red" dark>Error</v-toolbar>
                    <v-card-text>
                        {{responseMessage}}
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn text @click="closeFailureDialog">close</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
        <!-- end Failure Dialog -->
        <div style="text-align: center">
            <h3 style="color: white">Add A property</h3>
            <h4 style="color: #b9cbdb">Final Step 4/4</h4>
        </div>
        <br />
        <v-form ref="propertyForm3" v-model="valid" lazy-validation>
            <v-row id="form-row">
                <h3 style="margin: 0.7em">Add Nearby Landmark</h3>
                <v-col cols="12" md="12">
                    <v-row>
                        <v-col class="d-flex" cols="12" sm="6">
                            <v-text-field v-model="property.landmark_name" class="custom-label-color" label="Landmark Name" :rules="[propertyRules.landmark_name]" color="blue" solo></v-text-field>
                        </v-col>
                        <v-col class="d-flex" cols="12" sm="6">
                            <v-text-field v-model.number="property.distance_from_property" class="custom-label-color" label="Distance from property in kms" :rules="[propertyRules.distance_from_property]" color="blue" suffix="kms" solo></v-text-field>
                        </v-col>
                    </v-row>
                </v-col>
                <br />

                <v-col cols="12" md="12">
                    <v-row>
                        <v-col class="d-flex" cols="12" sm="6">
                            <v-select v-model="property.landmark_type_id" :items="allPropertyLandmarkTypes" :rules="[propertyRules.landmark_type_id]" label="Select Landmark Type" solo></v-select>
                        </v-col>
                        <v-col class="d-flex" cols="12" sm="6">
                            <v-text-field v-model="property.description" :rules="[propertyRules.description]" class="custom-label-color" label="Description" color="blue" solo></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row style="margin: 0 5px">
                        <v-col cols="12" sm="12">
                            <h3>Add Landmark Photos</h3>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <UploadImages style="background-color: #e7f0ff" :max="4" uploadMsg="click or drag n' drop images" fileError="images files only accepted" clearAll="Clear" @changed="handleImages" />
                                </v-col>
                            </v-row>
                            <p style="font-size: 12px; margin-right: 100px">
                                Each picture must not exceed 5 Mb Supported formats are *.jpg,
                                *.gif and *.png
                            </p>
                        </v-col>
                    </v-row>
                </v-col>
                <br />
                <v-row>
                    <v-col class="mb-3 mr-3 ml-3" style="
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                  ">
                        <router-link to="/register2">
                            <v-btn style="background-color: grey; width: 200px">
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
                                    Back</span>
                            </v-btn>
                        </router-link>
                        <v-btn style="background-color: #3b6ef3; width: 200px" :disabled="!valid" @click="submitFinalData">
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
                                Create Property</span>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-row>
        </v-form>
        <br />
    </v-container>
    <botton-nav />
</div>
</template>

<script>
import BottonNav from "../components/BottonNav.vue";
import { mapGetters, mapActions } from "vuex";
import UploadImages from "vue-upload-drop-images";

export default {
    name: "RegisterProperty3",
    data: () => ({
        valid: true,
        responseMessage: '',
        messageDialog: false,
        failureDialog: false,
        propertyRules: {
            landmark_name: value => !!value || "Name is required.",
            distance_from_property: value => !!value || "Distance is required",
            landmark_type_id: value => !!value || "Type is required.",
            description: value => !!value || "Description is required",
        },
        property: {
            landmark_name: "",
            distance_from_property: "",
            landmark_type_id: 0,
            description: "",
            landmarkVisuals: [],
        },
    }),
    components: {
        BottonNav,
        UploadImages
    },
    created() {
        this.fetchPropertyLandmarkTypes();
    },
    methods: {
        ...mapActions([
            "fetchPropertyLandmarkTypes",
            "addPropertyDataFromPageThird",
            "submitAllPropertyData"
        ]),
        handleImages(files) {
            this.property.landmarkVisuals.splice(
                0,
                this.property.landmarkVisuals.length
            );
            this.property.landmarkVisuals.push(...files);
        },
        async submitFinalData() {
            if (this.$refs.propertyForm3.validate()) {
                await this.addPropertyDataFromPageThird(this.property);
                const response = await this.submitAllPropertyData();
                if (response.status === 200 || response.status === 201) {
                    this.messageDialog = true;
                    this.responseMessage = 'Property created successfully. Now waiting SPL approval!!';
                    return;
                }

                if (response.status !== 200 || response.status !== 201) {
                    this.failureDialog = true;
                    this.responseMessage = 'Failed to create property. Please try again!!';
                }
            }
        },
        closeDialog() {
            this.messageDialog = false;
            setTimeout(() => {
                this.$router.push("/properties-for-sale");
            }, 100);
        },
        closeFailureDialog() {
            this.failureDialog = false;
            setTimeout(() => {
                this.$router.push("/register");
            }, 100);
        }
    },
    computed: {
        ...mapGetters(["allPropertyLandmarkTypes"]),
    },
};
</script>

<style scoped>
.main-div {
    background-color: #3b6ef3;
}

#form-row {
    background-color: #e7f0ff;
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 6px;
}

.custom-placeholer-color input::placeholder {
    color: red !important;
    opacity: 1;
}

.custom-label-color .v-label .solo {
    color: blue;
    opacity: 1;
}

@media only screen and (max-width: 768px) {
    .main-div {
        background-color: #3b6ef3;
        height: auto;
    }

    #form-row {
        background-color: #e7f0ff;
        width: auto;
        margin-left: auto;
        margin-right: auto;
        border-radius: 6px;
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
