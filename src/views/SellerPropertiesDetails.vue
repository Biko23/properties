<template>
<div>
    <base-dialog :message="message" :title="title" :dialogState="state">
      <template v-slot:button>
        <v-btn text @click="state = !state">close</v-btn>
      </template>
    </base-dialog>
    <v-container>
        <v-row>
            <v-col>
                <v-card color="basil">
                    <v-tabs v-model="tab" color="deep-purple accent-4" grow>
                        <v-tab>My Listed Properties</v-tab>
                        <v-tab>My Unlisted Properties</v-tab>
                        <v-tab>Pending Certification</v-tab>
                    </v-tabs>
                    <v-tabs-items v-model="tab">
                        <v-tab-item>
                            <v-card color="basil" flat>
                                <v-card-text>
                                    <v-data-table 
                                        :headers="listedHeaders" 
                                        :items="allCurrentUserListedPropertyVisuals" 
                                        :items-per-page="5" 
                                        class="elevation-1"
                                    >
                                        <template v-slot:item.actions="{ item }">
                                            <v-btn @click="changeAvailabilityToNotAvailable(item)">
                                                <v-icon small class="mr-2">
                                                    mdi-arrow-right-bold
                                                </v-icon>Unlist
                                            </v-btn>
                                        </template>
                                    </v-data-table>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card color="basil" flat>
                                <v-card-text>
                                    <v-data-table :headers="listedHeaders" :items="allCurrentUserUnlistedPropertyVisuals" :items-per-page="5" class="elevation-1">
                                        <template v-slot:item.actions="{ item }">
                                            <v-btn @click="changeAvailabilityToAvailable(item)">
                                                <v-icon small class="mr-2">
                                                    mdi-arrow-left-bold
                                                </v-icon>List
                                            </v-btn>
                                        </template>
                                    </v-data-table>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <seller-property-details :headers="certifiedHeaders" :items="allCurrentUserUncertifiedPropertyVisuals" />
                        </v-tab-item>
                    </v-tabs-items>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

</div>
</template>

<script>
import SellerPropertyDetails from '@/components/SellerPropertyDetailComponent'
import Button from '@/components/Button'
import {
    mapActions,
    mapGetters
} from 'vuex'

export default {
    name: 'SellerPropertiesDetails',
    components: {
        SellerPropertyDetails,
        Button
    },
    data: () => ({
        message: '',
        title: '',
        state: false,
        tab: null,
        listedHeaders: [{
                text: 'Property Id',
                align: 'start',
                sortable: false,
                value: 'property_id'
            },
            {
                text: 'Description',
                value: 'description'
            },
            {
                text: 'Created by',
                value: 'created_by'
            },
            {
                text: 'Creation Date',
                value: 'when_created'
            },
            {
                text: 'Actions',
                value: 'actions',
                sortable: false
            }
        ],
        certifiedHeaders: [{
                text: 'Property Id',
                align: 'start',
                sortable: false,
                value: 'property_id',
            },
            {
                text: 'Description',
                value: 'description'
            },
            {
                text: 'Created By',
                value: 'created_by'
            },
            {
                text: 'Creation Date',
                value: 'when_created'
            }
        ],
    }),
    computed: {
        ...mapGetters([
            "allCurrentUserListedPropertyVisuals",
            "allCurrentUserUnlistedPropertyVisuals",
            "allCurrentUserUncertifiedPropertyVisuals"
        ])
    },
    methods: {
        ...mapActions([
            "getListedPropertyVisualsByUsername",
            "getUnlistedPropertyVisualsByUsername",
            "getUncertifiedPropertyVisualsByUsername",
            "updatePropertyVisualAvailabilityStatus",
            "updatePropertyVisualNotAvailabilityStatus",
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
        async changeAvailabilityToNotAvailable(property) {
            try {
                await this.updatePropertyVisualAvailabilityStatus(property.property_id)
                    .then(response => {
                        const payload = {
                            activity: "Moved property to Unavailable section",
                            button_clicked: "Unlist Button"
                        }
                        if(
                            response.visualsResponse.data.status === 1 && 
                            response.propertyResponse.data.status === 1
                        ){
                            this.postAUserLog(payload);
                            this.getUnlistedPropertyVisualsByUsername();
                            this.defaultResponse('Property successfully unlisted from market place', 'Success', true);
                        } else {
                            response.visualsResponse.data.status == 0 ? 
                            this.defaultResponse(response.visualsResponse.data.message, 'Error', true) :
                            this.defaultResponse(response.propertyResponse.data.message, 'Error', true);
                        }
                    });
            } catch (error) {
                this.defaultResponse(error.message, 'Error', true);
            }
        },
        async changeAvailabilityToAvailable(property) {
            try {
                await this.updatePropertyVisualNotAvailabilityStatus(property.property_id)
                    .then((response) =>{
                        const payload = {
                            activity: "Moved property to Available section",
                            button_clicked: "Unlist Button"
                        }
                        if(
                            response.visualsResponse.data.status === 1 && 
                            response.propertyResponse.data.status === 1
                        ){
                            this.postAUserLog(payload);
                            this.getListedPropertyVisualsByUsername();
                            this.defaultResponse('Property successfully listed on market place', 'Success', true);
                        } else {
                            response.visualsResponse.data.status == 0 ? 
                            this.defaultResponse(response.visualsResponse.data.message, 'Error', true) :
                            this.defaultResponse(response.propertyResponse.data.message, 'Error', true);
                        }
                    });
            } catch (error) {
                this.defaultResponse(error.message, 'Error', true);
            }
        },
        async fetchListedProperties(){
            try {
                const response = await this.getListedPropertyVisualsByUsername();
                if(response.data.status == 0){
                    this.defaultResponse(response.data.message, 'Error', true);
                }
            } catch (error) {
                this.defaultResponse(error.message, 'Error', true);
            }
        },
        async fetchUnlistedProperties(){
            try {
                const response = await this.getUnlistedPropertyVisualsByUsername();
                if(response.data.status == 0){
                    this.defaultResponse(response.data.message, 'Error', true);
                }
            } catch (error) {
                this.defaultResponse(error.message, 'Error', true);
            }
        },
        async fetchUncertifiedProperties(){
            try {
                const response = await this.getUncertifiedPropertyVisualsByUsername();
                if(response.data.status == 0){
                    this.defaultResponse(response.data.message, 'Error', true);
                }
            } catch (error) {
                this.defaultResponse(error.message, 'Error', true);
            }
        },
    },
    created() {
        this.postAUserLog({
            activity: "Visited Seller Details page",
            button_clicked: "Seller Details Page"
        })
        this.fetchListedProperties();
        this.fetchUnlistedProperties();
        this.fetchUncertifiedProperties();
    }
}
</script>
