<template>
<div class="main-div">
    <base-dialog :message="message" :title="title" :dialogState="state">
        <template v-slot:button>
            <v-btn text @click="state = !state">close</v-btn>
        </template>
    </base-dialog>
    <v-container>
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
                                    <UploadImages 
                                        style="background-color: #e7f0ff z-index: 100;" 
                                        :max="6" 
                                        uploadMsg="click or drag n' drop images" 
                                        fileError="images files only accepted" 
                                        clearAll="Clear" 
                                        @changed="handleImages" 
                                    />
                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-text-field
                                        background-color="#e7f0ff"
                                        color="#e7f0ff"
                                        style="margin-top: -7%; z-index: 0;"
                                        v-model="property.imageValidatorField"
                                        :rules="[propertyRules.imageSelectCheck]"
                                        class="custom-label-color"
                                        readonly
                                        flat
                                    >
                                    </v-text-field>
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
                        <div>
                            <v-col cols="12" sm="12" md="12" v-if="submitting">
                                <base-spinner />
                            </v-col>
                            <v-btn 
                                v-else
                                style="background-color: #3b6ef3; width: 200px" 
                                :disabled="!valid" 
                                @click="submitFinalData"
                                >
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
                        </div>
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
        message: '',
        title: '',
        state: false,
        submitting: false,
        propertyRules: {
            landmark_name: value => !!value || "Name is required.",
            distance_from_property: value => !!value || "Distance is required",
            landmark_type_id: value => !!value || "Type is required.",
            imageSelectCheck: (value) => !!value || 'At least one image is required.',
            description: value => !!value || "Description is required",
        },
        property: {
            landmark_name: "",
            distance_from_property: "",
            landmark_type_id: 0,
            imageValidatorField: "",
            description: "",
            landmarkVisuals: [],
        },
    }),
    components: {
        BottonNav,
        UploadImages
    },
    created() {
        this.postAUserLog({
            activity: "Visited the Property Listing Third page",
            button_clicked: "Property Listing Page"
        });
        this.fetchPropertyLandmarkTypes();
    },
    methods: {
        ...mapActions([
            "fetchPropertyLandmarkTypes",
            "addPropertyDataFromPageThird",
            "submitAllPropertyData",
            "postAUserLog"
        ]),
        handleImages(files) {
            this.property.imageValidatorField = files.length <= 0 ? "" : files[0].name;
            this.property.landmarkVisuals.splice(
                0,
                this.property.landmarkVisuals.length
            );
            this.property.landmarkVisuals.push(...files);
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
        async submitFinalData() {
            if (this.$refs.propertyForm3.validate()) {
                this.submitting = true;
                await this.addPropertyDataFromPageThird(this.property);
                const { 
                        value, location, feature, landmark, neighborhood, propertyVisuals 
                    } = await this.submitAllPropertyData();

                if (
                    value.status === 201 && 
                    location.status === 201 &&
                    feature.status === 201 &&
                    landmark.status === 201 &&
                    neighborhood.status === 201 &&
                    propertyVisuals.status === 201 
                ) {
                    this.submitting = false;
                    this.postAUserLog({
                        activity: "Registered a property",
                        button_clicked: "Create Property Btn"
                    });
                    this.defaultResponse('Property created successfully. Now waiting SPL approval!!', 'Success', true);
                     setTimeout(() => {
                        this.$router.push("/properties-for-sale");
                    }, 3000);
                }

                if (
                    value.status === 200 || 
                    location.status === 200 ||
                    feature.status === 200 ||
                    landmark.status === 200 ||
                    neighborhood.status === 200 ||
                    propertyVisuals.status === 200
                ) {
                    this.submitting = false;
                    this.postAUserLog({
                        activity: "Failure on registering a the Property",
                        button_clicked: "Create Property Btn"
                    });
                    this.defaultResponse('Property partially created or failed to be created. Try again!!', 'Error', true);
                    setTimeout(() => {
                        this.$router.push("/properties-for-sale");
                    }, 3000);
                }
            }
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
