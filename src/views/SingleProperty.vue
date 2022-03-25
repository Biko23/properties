<template>
<v-container>
    <base-dialog :message="message" :title="title" :dialogState="state">
        <template v-slot:button>
            <v-btn text @click="state = !state">close</v-btn>
        </template>
    </base-dialog>
    <v-row class="mt-2">
        <v-btn @click="backToProperty">Back To Property List</v-btn>
        <v-col cols="12" md="12" sm="12">
            <v-card color="basil">
                <v-tabs v-model="tab" color="deep-purple accent-4" grow>
                    <v-tab> Property</v-tab>
                    <v-tab> Landmarks </v-tab>
                    <v-tab> Neighborhood</v-tab>
                    <v-tab> Features</v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab" vertical>
                    <!-- property Visuals -->
                    <v-tab-item>
                        <v-card color="basil" flat>
                            <v-card-text>
                                <v-row v-if="allSinglePropertyVisuals.length > 0">
                                    <v-col v-for="(propertyVisual, index) in allSinglePropertyVisuals" :key="index">
                                        <v-img 
                                            class="d-none d-sm-none d-md-flex grey lighten-2"
                                            :src="'http://localhost:8002/' + propertyVisual.snapshot" 
                                            aspect-ratio="1" 
                                            height="200"
                                        ></v-img>
                                        <v-img 
                                            :src="'http://localhost:8002/' + propertyVisual.snapshot" 
                                            aspect-ratio="1" 
                                            class="d-flex d-sm-flex d-md-none d-lg-none d-xl-none grey lighten-2"
                                            width="400"
                                            height="200"
                                        ></v-img>
                                    </v-col>
                                </v-row>
                                <p v-else>No property images to display</p>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <!-- property visuals -->
                    <!-- Landmark -->
                    <v-tab-item>
                        <v-card color="basil" flat>
                            <v-card-text>
                                <v-row v-if="allSinglePropertyNearbyLandmarkVisuals.length > 0">
                                    <v-col v-for="(nearbyLandmarkVisual, index) in allSinglePropertyNearbyLandmarkVisuals" :key="index">
                                        <v-img 
                                            class="d-none d-sm-none d-md-flex grey lighten-2"
                                            :src="'http://localhost:8001/' + nearbyLandmarkVisual.snapshot" 
                                            aspect-ratio="1" 
                                            height="200"
                                        ></v-img>
                                         <v-img 
                                            :src="'http://localhost:8001/' + nearbyLandmarkVisual.snapshot"
                                            aspect-ratio="1" 
                                            class="d-flex d-sm-flex d-md-none d-lg-none d-xl-none grey lighten-2"
                                            width="400"
                                            height="200"
                                        ></v-img>
                                    </v-col>
                                </v-row>
                                <p v-else>No nearby landmark images to display</p>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <!-- Landmark -->
                    <v-tab-item>
                        <v-card color="basil" flat>
                            <v-card-text>
                                <v-row v-if="allSingleNeighborhoodVisuals.length > 0">
                                    <v-col v-for="(neighborhoodVisual, index) in allSingleNeighborhoodVisuals" :key="index">
                                        <v-img 
                                            :src="'http://localhost:9003/' + neighborhoodVisual.snapshot" 
                                            aspect-ratio="1" 
                                            class="d-none d-sm-none d-md-flex grey lighten-2 grey lighten-2" 
                                            height="200"
                                        ></v-img>
                                        <v-img 
                                            :src="'http://localhost:9003/' + neighborhoodVisual.snapshot"
                                            aspect-ratio="1" 
                                            class="d-flex d-sm-flex d-md-none d-lg-none d-xl-none grey lighten-2"
                                            width="400"
                                            height="200"
                                        ></v-img>
                                    </v-col>
                                </v-row>
                                <p v-else>No Neighborhood images to display</p>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card color="basil" flat>
                        <v-card-text>
                            <v-data-table
                            :headers="featureHeaders"
                            :items="allCurrentPropertyFeatures"
                            :items-per-page="5"
                            class="elevation-1"
                            ></v-data-table>
                        </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>
            </v-card>
        </v-col>
        <v-col cols="12" md="12" sm="12">
            <p class="text-h5">Property Details</p>
            <v-simple-table>
                <template v-slot:default>
                <thead>
                    <tr>
                    <th class="text-left">
                        Feature
                    </th>
                    <th class="text-left">
                        Description
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="({title, value}, index) in currentProperty"
                        :key="index"
                    >
                        <td>{{ title }}</td>
                        <td>{{ value }}</td>
                    </tr>
                    <tr>
                        <td>
                            <p style="margin-top: 10px;" class="text-h5">Property Legal Details</p>
                        </td>
                        <td></td>
                    </tr>
                     <tr
                        v-for="({title, value}, index) in legalDetails"
                        :key="index"
                    >
                        <td>{{ title }}</td>
                        <td>{{ value }}</td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
        </v-col>
    </v-row>
    <br>
    <v-btn @click="backToProperty">Back To Property List</v-btn>
</v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'SingleProperty',
    props: ["property_id"],
    data() {
        return {
            small: true,
            propertyVisuals: [],
            nearbyLandmarkVisuals: [],
            neighborhoodVisuals: [],
            features: [],
            legalDetails: [],
            currentProperty: [],
            propertyLocation: {},
            featureHeaders: [{text: 'Features Name', value: 'name'}],

            tab: null, // for tab view
            message: '', // for messaging
            title: '', // message title
            state: false // error messages state
        }
    },
    computed: {
        ...mapGetters([
            "allCurrentPropertyFeatures",
            "allSinglePropertyVisuals",
            "allSingleNeighborhoodVisuals",
            "allSinglePropertyNearbyLandmarkVisuals",
            "currentPropertyDetails",
            "currentPropertyLegalProtection"
        ])
    },
    created() {
        this.$log.info('Accessing the single property page.')
        this.postAUserLog({
            activity: "Visited Single property Details page",
            button_clicked: "Single Property Details Page"
        });
        this.fetchCurrentPropertySelectedFeatures(this.property_id);
        this.fetchSinglePropertyVisuals(this.property_id);
        this.fetchPropertyNeighborhoodVisuals(this.property_id);
        this.fetchPropertyNearbyLandmarkVisuals(this.property_id);
        this.fetchPropertyLegalProtection();
        this.fetchCurrentPropertyData();
    },
    beforeRouteLeave (to, from , next) {
        this.clearPropertyLegalDetails();
        next();
    },
    methods: {
        ...mapActions([
            "fetchCurrentPropertySelectedFeatures",
            "fetchSinglePropertyVisuals",
            "fetchPropertyNeighborhoodVisuals",
            "fetchPropertyNearbyLandmarkVisuals",
            "fetchCurrentPropertyDetails",
            "getPropertyLegalProtection",
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
        async fetchCurrentPropertyData(){
            try {
                const response = await this.fetchCurrentPropertyDetails(this.property_id);
                if(response.data.status == 1){
                    this.currentProperty = [
                        { 
                            title: 'SPL Certified', 
                            value: this.currentPropertyDetails.certified == true ? 'Certified' : 'Not Certified'
                        },
                        { 
                            title: 'Visible on Platform', 
                            value: this.currentPropertyDetails.available == false ? 
                                'Not Visible' :
                                this.currentPropertyDetails.certified == true ? 
                                'Visible' : 
                                'Not Visible'
                        },
                        { title: 'Listed For', value: this.currentPropertyDetails.listedFor.name },
                        { title: 'Created By', value: this.currentPropertyDetails.created_by },
                        { title: 'When Created', value: new Date(this.currentPropertyDetails.when_created).toLocaleString() }
                        
                    ]
                } else {
                    this.defaultResponse(response.data.message, 'Error', true);
                }
            } catch (error) {
               this.defaultResponse(error.message, 'Error', true); 
            }
        },
        async fetchPropertyLegalProtection(){
            try {
                const response = await this.getPropertyLegalProtection(this.property_id);
                if(response.data.status == 1){
                    this.legalDetails = [
                         {
                            title: 'Legal Description', 
                            value: this.currentPropertyLegalProtection.description 
                        },
                        {
                            title: 'Primary Phone', 
                            value: this.currentPropertyLegalProtection.primary_phone_contact 
                        },
                        {
                            title: 'Secondary Phone', 
                            value: this.currentPropertyLegalProtection.secondary_phone_contact 
                        },
                        {
                            title: 'Primary Email', 
                            value: this.currentPropertyLegalProtection.primary_email_contact 
                        },
                        {
                            title: 'Secondary Email', 
                            value: this.currentPropertyLegalProtection.secondary_email_contact 
                        },
                        {
                            title: 'When Created', 
                            value: new Date(this.currentPropertyLegalProtection.when_created).toLocaleString() 
                        },
                        {
                            title: 'Lasted Updated', 
                            value: new Date(this.currentPropertyLegalProtection.when_updated).toLocaleString() 
                        },
                         {
                            title: 'Updated By', 
                            value: this.currentPropertyLegalProtection.updated_by 
                        },
                    ]
                } else {
                    this.defaultResponse("Unable to find legal details", 'Error', true); 
                }
            } catch (error) {
                this.defaultResponse(error.message, 'Error', true); 
            }
        },
        backToProperty() {
            // set to true if property certified by SPL
            this.$router.push('/property-details');
        }
    }
}
</script>

<style scoped>
    @media only screen and (max-width: 425px) {
        #image-scale {
            width: 400;
        }
    }
</style>
