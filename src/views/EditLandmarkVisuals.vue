<template>
<div>
    <base-dialog :message="message" :title="title" :dialogState="state">
        <template v-slot:button>
            <v-btn text @click="state = !state">close</v-btn>
        </template>
    </base-dialog>
    <!--  -->
    <v-container class="mt-5">
        <v-row>
            <v-col cols="12" md="12" sm="12">
                <v-card>
                    <v-row>
                        <v-col cols="12" md="8" sm="12">
                            <p class="text-h5 ml-5">
                                <v-btn color="primary" icon @click="backToEditScreen">
                                <v-icon class="mr-3" size="40">mdi-arrow-left</v-icon>
                                </v-btn>
                                {{landmarkVisuals.length}} landmark visuals on this property</p>
                        </v-col>
                        <v-col cols="12" md="4" sm="12" class="pr-5">
                            <v-btn class="mt-2 mr-5" outlined color="indigo" block @click="loadNewLandmarkVisualDialog" v-if="landmarkVisuals.length < 6">Create New Landmark Image</v-btn>
                        </v-col>
                    </v-row>
                    <v-tabs vertical>
                        <template v-for="(landmarkVisual, index) in landmarkVisuals">
                            <v-tab :key="index"><v-icon left>mdi-file</v-icon>Image {{index + 1}}</v-tab>
                        </template>
                        <template v-for="(landmarkVisual, index) in landmarkVisuals">
                            <v-tab-item :key="index">
                                <v-card color="basil" flat>
                                    <v-card-text>
                                        <v-row>
                                            <v-col>
                                                <v-img 
                                                    :src="'http://localhost:8001/' + landmarkVisual.snapshot" 
                                                    aspect-ratio="2" 
                                                    class="grey lighten-2"
                                                    height="460"
                                                >
                                                    <v-app-bar flat color="rgba(0, 0, 0, 0)">
                                                        <v-spacer></v-spacer>
                                                        <v-btn class="ma-1" color="indigo" icon
                                                            @click="loadLandmarkVisual(landmarkVisual, index)"
                                                        >
                                                        <v-icon size="40">mdi-square-edit-outline</v-icon>
                                                        </v-btn>
                                                    </v-app-bar>
                                                </v-img>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-tab-item>
                        </template>
                    </v-tabs>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    <!--  -->
    <!-- start edit property visual  -->
    <v-dialog v-model="landmarkVisualEditDialog" max-width="700px">
        <v-card>
            <v-card-title>
                <span class="text-h5">Edit Landmark Visual {{imageIndex + 1}}</span>
            </v-card-title>
            <v-card-text>
                <v-form ref="editLandmarkVisualForm" v-model="valid" lazy-validation>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <v-row>
                                     <v-col cols="12" sm="12" md="6">
                                        <v-text-field 
                                            :rules="[editLandmarkRules.char, editLandmarkRules.min]"
                                            v-model="editedVisualDetails.landmark_name" 
                                            label="Landmark name" 
                                            placeholder="Landmark name" 
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="6">
                                        <v-text-field 
                                            :rules="[editLandmarkRules.numb, editLandmarkRules.min]"
                                            v-model="editedVisualDetails.distance_from_property" 
                                            label="Distance" 
                                            placeholder="Distance from property" 
                                            suffix="Kms"
                                        ></v-text-field>
                                    </v-col>
                                     <v-col cols="12" sm="12" md="6">
                                        <v-select
                                            :rules="[editLandmarkRules.min]"
                                            v-model="editedVisualDetails.landmark_type_id"
                                            :items="allPropertyLandmarkTypes"
                                            label="Landmark Type" 
                                            placeholder="Select Type" 
                                        ></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="6">
                                        <v-text-field 
                                            :rules="[editLandmarkRules.char, editLandmarkRules.min]"
                                            v-model="editedVisualDetails.description" 
                                            label="Visual Description" 
                                            placeholder="Visual description" 
                                        ></v-text-field>
                                    </v-col>
                                     <v-col cols="12" sm="12" md="12">
                                        <v-file-input
                                            :rules="[editLandmarkRules.image]"
                                            v-model="editedVisualDetails.editedVisualImage"
                                            accept="image/png, image/jpeg"
                                            placeholder="Pick an image"
                                            prepend-icon="mdi-camera"
                                            label="Select Image"
                                        ></v-file-input>
                                    </v-col>
                                </v-row>
                            </v-col>
                             <v-col cols="12">
                                <v-row>
                                    <v-col cols="12" sm="6" md="6">
                                        <template>
                                            <v-btn block color="warning" @click="landmarkVisualEditDialog = false">
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
                                                @click="updateLandmarkVisual"
                                            >
                                                Update Landmark Visual
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
    <!-- end edit property visual -->
    <!-- start create new property visual  -->
    <v-dialog v-model="landmarkVisualCreateDialog" max-width="700px">
        <v-card>
            <v-card-title>
                <span class="text-h5">Create New Landmark Visual</span>
            </v-card-title>
            <v-card-text>
                <v-form ref="createLandmarkVisualForm" v-model="valid" lazy-validation>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <v-row>
                                    <v-col cols="12" sm="12" md="6">
                                        <v-text-field 
                                            :rules="[editLandmarkRules.char, editLandmarkRules.min]"
                                            v-model="createVisualDetails.landmark_name" 
                                            label="Landmark name" 
                                            placeholder="Landmark name" 
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="6">
                                        <v-text-field 
                                            :rules="[editLandmarkRules.numb, editLandmarkRules.min]"
                                            v-model="createVisualDetails.distance_from_property" 
                                            label="Distance" 
                                            placeholder="Distance from property" 
                                            suffix="Kms"
                                        ></v-text-field>
                                    </v-col>
                                     <v-col cols="12" sm="12" md="6">
                                        <v-select
                                            :rules="[editLandmarkRules.min]"
                                            v-model="createVisualDetails.landmark_type_id"
                                            :items="allPropertyLandmarkTypes"
                                            label="Landmark Type" 
                                            placeholder="Select Type" 
                                        ></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="6">
                                        <v-text-field 
                                            :rules="[editLandmarkRules.char, editLandmarkRules.min]"
                                            v-model="createVisualDetails.description" 
                                            label="Visual Description" 
                                            placeholder="Visual description" 
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-file-input
                                            :rules="[editLandmarkRules.image]"
                                            v-model="createVisualDetails.files"
                                            accept="image/png, image/jpeg"
                                            placeholder="Pick an image"
                                            prepend-icon="mdi-camera"
                                            label="Select Image"
                                        ></v-file-input>
                                    </v-col>
                                </v-row>
                            </v-col>
                             <v-col cols="12">
                                <v-row>
                                    <v-col cols="12" sm="6" md="6">
                                        <template>
                                            <v-btn block color="warning" @click="landmarkVisualCreateDialog = false">
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
                                                @click="createLandmarkVisual"
                                            >
                                                Create Landmark Visual
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
    <!-- end create new property visual -->
</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BottonNav from "../components/BottonNav.vue";
export default {
    components: {
        BottonNav
    },
    name: "EditLandmarkVisuals",
    props: ["property_id"],
    data: () => ({
        landmarkVisualEditDialog: false,
        landmarkVisualCreateDialog: false,
        valid: true,
        tab: null,
        imageIndex: 0,
        landmarkVisuals: [],
        editedVisualDetails: {
            editedVisualImage: null
        },
        createVisualDetails: {
            files: null
        },
        message: '',
        title: '',
        state: false,
        editLandmarkRules: {
            image: v => !v || v.size < 5000000 || 'Image size should be less than 5 MB!',
            min: v => !!v || 'Field can not be empty',
            char: v => /[a-zA-Z]/.test(v) || "Letters should not contains numbers",
            numb: v => /[0-9]/.test(v) || "Numbers should not contains letters"
        }            
    }),
    created() {

        this.$log.info('Accessing page to edit landmark visuals.')
        this.postAUserLog({
            "activity":`Visited Edit Landmark Visuals Page`, 
            "button_clicked":"View Edit Landmark Visuals Page"
        });
        this.fetchLandmarkVisuals();
        this.fetchPropertyLandmarkTypes();
    },
    computed: {
       ...mapGetters([
            "currentLoggedinUser",
            "allSinglePropertyNearbyLandmarkVisuals",
            "allPropertyLandmarkTypes"
        ])
    },
    methods: {
        ...mapActions([
            "postAUserLog",
            "updatedPropertyVisual",
            "createSingleLandmarkVisual",
            "fetchPropertyNearbyLandmarkVisuals",
            "fetchPropertyLandmarkTypes",
            "updatedLandmarkVisual"
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
        async fetchLandmarkVisuals(){
            try {
                const response = await this.fetchPropertyNearbyLandmarkVisuals(this.property_id);
                if(response.data.status == 1){
                    this.landmarkVisuals = this.allSinglePropertyNearbyLandmarkVisuals;
                } else {
                    this.defaultResponse(response.data.message, 'Error', true);
                }
            } catch (error) {
                console.log(error);
                this.defaultResponse(error.message, 'Error', true);
            }
        },
        loadLandmarkVisual(landmarkVisual, index){
            this.landmarkVisualEditDialog = true
            this.imageIndex = index
            this.editedVisualDetails = landmarkVisual
        },
        closeLandmarkVisual(){
            this.landmarkVisualEditDialog = false
            this.imageIndex = 0
            this.editedVisualDetails = {}
        },
        async updateLandmarkVisual(){
            if(this.$refs.editLandmarkVisualForm.validate()){
            this.editedVisualDetails.updated_by = this.currentLoggedinUser.username;
                try {
                    const response = await this.updatedLandmarkVisual(this.editedVisualDetails);
                    if(response.data.status == 1){
                        this.postAUserLog({
                            "activity":`Successfully updated landmark visual ${this.editedVisualDetails.snapshot} of property with id ${this.property_id}`, 
                            "button_clicked":`Successfully updated landmark visual ${this.editedVisualDetails.snapshot} of property with id ${this.property_id}`
                        });
                        this.closeLandmarkVisual();
                        this.defaultResponse(response.data.message, 'Success', true);
                        this.fetchLandmarkVisuals();
                    } else {
                        this.postAUserLog({
                            "activity":`Failed to update landmark visual ${this.editedVisualDetails.snapshot} of property with id ${this.property_id}`, 
                            "button_clicked":`Failed to update landmark visual ${this.editedVisualDetails.snapshot} of property with id ${this.property_id}`
                        });
                        this.closeLandmarkVisual();
                        this.defaultResponse(error.message, 'Error', true);
                    }
                } catch (error) {
                    this.defaultResponse(error.message, 'Error', true);
                }
            }
        },
        loadNewLandmarkVisualDialog(){
            this.landmarkVisualCreateDialog = true;
        },
        backToEditScreen(){
            this.$router.push(`/edit-property/${this.property_id}?type=${this.$route.query.type}`);
        },
        async createLandmarkVisual(){
            if(this.$refs.createLandmarkVisualForm.validate()){
                this.createVisualDetails.created_by = this.currentLoggedinUser.username;
                this.createVisualDetails.updated_by = this.currentLoggedinUser.username;
                this.createVisualDetails.property_id = +this.property_id;
                this.createVisualDetails.distance_from_property = +this.createVisualDetails.distance_from_property;
                try {
                    const response = await this.createSingleLandmarkVisual(this.createVisualDetails);
                    if(response.data.status == 1){
                        this.postAUserLog({
                            "activity":`Successfully added new landmark visual to property with id ${this.property_id}`, 
                            "button_clicked":`Successfully added new landmark visual to property with id ${this.property_id}`
                        });
                        this.landmarkVisualCreateDialog = false;
                        this.defaultResponse(response.data.message, 'Success', true);
                        this.fetchLandmarkVisuals();
                    } else {
                        this.postAUserLog({
                            "activity":`Failed to add new landmark visual to property with id ${this.property_id}`, 
                            "button_clicked":`Failed to add new landmark visual to property with id ${this.property_id}`
                        });
                         this.landmarkVisualCreateDialog = false;
                        this.defaultResponse(response.data.message, 'Success', true);
                    }
                } catch (error) {
                     this.landmarkVisualCreateDialog = false;
                    this.defaultResponse(error.message, 'Error', true);
                }
            }
        }
    }
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