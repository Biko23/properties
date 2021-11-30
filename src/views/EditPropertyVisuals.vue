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
                                {{propertyVisuals.length}} property visuals on this property</p>
                        </v-col>
                        <v-col cols="12" md="4" sm="12" class="pr-5">
                            <v-btn class="mt-2 mr-5" outlined color="indigo" block @click="loadNewPropertyVisualDialog" v-if="propertyVisuals.length < 6">Create New Property Image</v-btn>
                        </v-col>
                    </v-row>
                    <v-tabs vertical>
                        <template v-for="(propertyVisual, index) in propertyVisuals">
                            <v-tab :key="index"><v-icon left>mdi-file</v-icon>Image {{index + 1}}</v-tab>
                        </template>
                        <template v-for="(propertyVisual, index) in propertyVisuals">
                            <v-tab-item :key="index">
                                <v-card color="basil" flat>
                                    <v-card-text>
                                        <v-row>
                                            <v-col>
                                                <v-img 
                                                    :src="'http://localhost:8002/' + propertyVisual.snapshot" 
                                                    aspect-ratio="2" 
                                                    class="grey lighten-2"
                                                    height="460"
                                                >
                                                    <v-app-bar flat color="rgba(0, 0, 0, 0)">
                                                        <v-spacer></v-spacer>
                                                        <v-btn class="ma-1" color="indigo" icon
                                                            @click="loadPropertyVisual(propertyVisual, index)"
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
    <v-dialog v-model="propertyVisualEditDialog" max-width="700px">
        <v-card>
            <v-card-title>
                <span class="text-h5">Edit Property Visual {{imageIndex + 1}}</span>
            </v-card-title>
            <v-card-text>
                <v-form ref="editPropertyVisualForm" v-model="valid" lazy-validation>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <v-row>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field 
                                            :rules="[editPropertyRules.char, editPropertyRules.min]"
                                            v-model="editedVisualDetails.description" 
                                            label="Visual Description" 
                                            placeholder="Visual description" 
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-file-input
                                            :rules="[editPropertyRules.image]"
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
                                            <v-btn block color="warning" @click="propertyVisualEditDialog = false">
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
                                                @click="updatePropertyVisual"
                                            >
                                                Update Property Visual
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
    <v-dialog v-model="propertyVisualCreateDialog" max-width="700px">
        <v-card>
            <v-card-title>
                <span class="text-h5">Create New Property Visual</span>
            </v-card-title>
            <v-card-text>
                <v-form ref="createPropertyVisualForm" v-model="valid" lazy-validation>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <v-row>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field 
                                            :rules="[editPropertyRules.char, editPropertyRules.min]"
                                            v-model="createVisualDetails.description" 
                                            label="Visual Description" 
                                            placeholder="Visual description" 
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-file-input
                                            :rules="[editPropertyRules.image]"
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
                                            <v-btn block color="warning" @click="propertyVisualCreateDialog = false">
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
                                                @click="createPropertyVisual"
                                            >
                                                Create Property Visual
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
    name: "EditPropertyVisuals",
    props: ["property_id"],
    data: () => ({
        propertyVisualEditDialog: false,
        propertyVisualCreateDialog: false,
        valid: true,
        tab: null,
        imageIndex: 0,
        propertyVisuals: [],
        editedVisualDetails: {
            editedVisualImage: null
        },
        createVisualDetails: {
            files: null
        },
        message: '',
        title: '',
        state: false,
        editPropertyRules: {
            image: v => !v || v.size < 5000000 || 'Image size should be less than 5 MB!',
            min: v => !!v || 'Field can not be empty',
            char: v => /[a-zA-Z]/.test(v) || "Letters should not contains numbers"
        }            
    }),
    created() {
        this.postAUserLog({
            "activity":`Visited Edit Property Visuals Page`, 
            "button_clicked":"View Edit Property Visuals Page"
        });
        this.fetchPropertyVisuals();
    },
    computed: {
       ...mapGetters([
            "allSinglePropertyVisuals",
            "currentLoggedinUser"
        ])
    },
    methods: {
        ...mapActions([
            "fetchSinglePropertyVisuals",
            "postAUserLog",
            "updatedPropertyVisual",
            "createSinglePropertyVisual"
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
        async fetchPropertyVisuals(){
            try {
                const response = await this.fetchSinglePropertyVisuals(this.property_id);
                if(response.data.status == 1){
                    this.propertyVisuals = this.allSinglePropertyVisuals;
                } else {
                    this.defaultResponse(response.data.message, 'Error', true);
                }
            } catch (error) {
                console.log(error);
                this.defaultResponse(error.message, 'Error', true);
            }
        },
        loadPropertyVisual(propertyVisual, index){
            this.propertyVisualEditDialog = true
            this.imageIndex = index
            this.editedVisualDetails = propertyVisual
        },
        closePropertyVisual(){
            this.propertyVisualEditDialog = false
            this.imageIndex = 0
            this.editedVisualDetails = {}
        },
        async updatePropertyVisual(){
            if(this.$refs.editPropertyVisualForm.validate()){
            this.editedVisualDetails.updated_by = this.currentLoggedinUser.username;
                try {
                    const response = await this.updatedPropertyVisual(this.editedVisualDetails);
                    if(response.data.status == 1){
                        this.closePropertyVisual();
                        this.postAUserLog({
                            "activity":`Successfully updated property visual ${this.editedVisualDetails.snapshot} of property with id ${this.property_id}`, 
                            "button_clicked":`Successfully updated property visual ${this.editedVisualDetails.snapshot} of property with id ${this.property_id}`
                        });
                        this.defaultResponse(response.data.message, 'Success', true);
                        this.fetchPropertyVisuals();
                    } else {
                        this.postAUserLog({
                            "activity":`Failed to update property visual ${this.editedVisualDetails.snapshot} of property with id ${this.property_id}`, 
                            "button_clicked":`Failed to update property visual ${this.editedVisualDetails.snapshot} of property with id ${this.property_id}`
                        });
                        this.defaultResponse(error.message, 'Error', true);
                    }
                } catch (error) {
                    this.defaultResponse(error.message, 'Error', true);
                }
            }
        },
        loadNewPropertyVisualDialog(){
            this.propertyVisualCreateDialog = true;
        },
        backToEditScreen(){
            this.$router.push(`/edit-property/${this.property_id}?type=${this.$route.query.type}`);
        },
        async createPropertyVisual(){
            if(this.$refs.createPropertyVisualForm.validate()){
                this.createVisualDetails.created_by = this.currentLoggedinUser.username;
                this.createVisualDetails.updated_by = this.currentLoggedinUser.username;
                this.createVisualDetails.property_id = this.property_id;
                try {
                    const response = await this.createSinglePropertyVisual(this.createVisualDetails);
                    if(response.data.status == 1){
                        this.postAUserLog({
                            "activity":`Successfully added new property visual to property with id ${this.property_id}`, 
                            "button_clicked":`Successfully added new property visual to property with id ${this.property_id}`
                        });
                         this.propertyVisualCreateDialog = false;
                        this.defaultResponse(response.data.message, 'Success', true);
                        this.fetchPropertyVisuals();
                    } else {
                        this.postAUserLog({
                            "activity":`Failed to add new property visual to property with id ${this.property_id}`, 
                            "button_clicked":`Failed to add new property visual to property with id ${this.property_id}`
                        });
                         this.propertyVisualCreateDialog = false;
                        this.defaultResponse(response.data.message, 'Success', true);
                    }
                } catch (error) {
                     this.propertyVisualCreateDialog = false;
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

 