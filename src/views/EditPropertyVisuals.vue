<template>
<div>
    <base-dialog :message="message" :title="title" :dialogState="state">
        <template v-slot:button>
            <v-btn text @click="state = !state">close</v-btn>
        </template>
    </base-dialog>
    <!--  -->
    <v-container>
        <v-row>
  <v-card>
    <v-toolbar
      flat
      color="white"
      dark
    >
      <v-toolbar-title style="color: black;">Edit Property Images</v-toolbar-title>
    </v-toolbar>
    <v-tabs vertical>
      <v-tab>
        <v-icon left>
          mdi-account
        </v-icon>
        Option 1
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-lock
        </v-icon>
        Option 2
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-access-point
        </v-icon>
        Option 3
      </v-tab>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>
              Sed aliquam ultrices mauris. Donec posuere vulputate arcu. Morbi ac felis. Etiam feugiat lorem non metus. Sed a libero.
            </p>

            <p>
              Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Aliquam lobortis. Aliquam lobortis. Suspendisse non nisl sit amet velit hendrerit rutrum.
            </p>

            <p class="mb-0">
              Phasellus dolor. Fusce neque. Fusce fermentum odio nec arcu. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Phasellus blandit leo ut odio.
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>
              Morbi nec metus. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Nunc sed turpis.
            </p>

            <p>
              Suspendisse feugiat. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In hac habitasse platea dictumst. Fusce ac felis sit amet ligula pharetra condimentum.
            </p>

            <p>
              Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Nam commodo suscipit quam. In consectetuer turpis ut velit. Sed cursus turpis vitae tortor. Aliquam eu nunc.
            </p>

            <p>
              Etiam ut purus mattis mauris sodales aliquam. Ut varius tincidunt libero. Aenean viverra rhoncus pede. Duis leo. Fusce fermentum odio nec arcu.
            </p>

            <p class="mb-0">
              Donec venenatis vulputate lorem. Aenean viverra rhoncus pede. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Fusce commodo aliquam arcu. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi.
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>
              Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
            </p>

            <p class="mb-0">
              Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam at tortor in tellus interdum sagittis.
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
        </v-row>
        <v-row>
            <v-col cols="12" md="12" sm="12">
                <v-row>
                    <v-col cols="12" md="8" sm="12">
                        <p class="text-h5 ml-5">{{propertyVisuals.length}} property visuals on this property</p>
                    </v-col>
                    <v-col cols="12" md="4" sm="12" class="pr-5">
                        <v-btn class="ma-2" outlined color="indigo" block @click="loadNewPropertyVisualDialog">Create New Property Image</v-btn>
                    </v-col>
                </v-row>
                <v-row v-for="(propertyVisual, index) in propertyVisuals" :key="index">
                     <v-col cols="12" md="2" sm="12" style="display:flex; justify-content: center; align-items: center;">
                        hello
                    </v-col>
                    <v-col cols="12" md="10" sm="12">
                        <v-card color="basil" flat>
                            <v-card-text>
                                <v-row>
                                    <v-col>
                                        <v-img :src="'http://localhost:8002/' + propertyVisual.snapshot" aspect-ratio="1" class="grey lighten-2" height="500">
                                            <v-app-bar flat color="rgba(0, 0, 0, 0)">
                                                <v-spacer></v-spacer>
                                                <v-btn class="ma-1" color="indigo" icon
                                                    @click="loadPropertyVisual(propertyVisual, index)"
                                                >
                                                <v-icon size="50">mdi-square-edit-outline</v-icon>
                                                </v-btn>
                                            </v-app-bar>
                                        </v-img>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
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
                        this.defaultResponse(response.data.message, 'Success', true);
                        this.fetchPropertyVisuals();
                    } else {
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
        async createPropertyVisual(){
            if(this.$refs.createPropertyVisualForm.validate()){
                this.createVisualDetails.created_by = this.currentLoggedinUser.username;
                this.createVisualDetails.updated_by = this.currentLoggedinUser.username;
                this.createVisualDetails.property_id = this.property_id;
                try {
                    const response = await this.createSinglePropertyVisual(this.createVisualDetails);
                    if(response.data.status == 1){
                         this.propertyVisualCreateDialog = false;
                        this.defaultResponse(response.data.message, 'Success', true);
                        this.fetchPropertyVisuals();
                    } else {
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