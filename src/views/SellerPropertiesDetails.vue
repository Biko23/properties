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
                    <v-tabs v-model="mainTab" color="deep-purple accent-4" grow>
                        <v-tab>My Property Details</v-tab>
                        <v-tab>My Rental Details</v-tab>
                    </v-tabs>
                     <v-tabs-items v-model="mainTab">
                        <v-tab-item>
                            <v-card color="basil">
                                <v-tabs v-model="tab" color="deep-purple accent-4" grow>
                                    <v-tab>Listed</v-tab>
                                    <v-tab>Unlisted</v-tab>
                                    <v-tab>Pending Certification</v-tab>
                                </v-tabs>
                                <v-tabs-items v-model="tab">
                                    <v-tab-item>
                                        <v-card color="basil" flat>
                                            <v-card-text>
                                                <v-data-table 
                                                    :headers="listedHeaders" 
                                                    :items="allCurrentUserListedProperties" 
                                                    :items-per-page="5" 
                                                    class="elevation-1"
                                                >
                                                    <template v-slot:item.actions="{ item }">
                                                        <v-btn class="mr-2" @click="changeAvailabilityToNotAvailable(item)">
                                                            <v-icon small>
                                                                mdi-arrow-right-bold
                                                            </v-icon>Unlist
                                                        </v-btn>
                                                        <v-btn class="mr-2" @click="viewPropertyDetails(item)">
                                                            <v-icon small>
                                                                mdi-eye
                                                            </v-icon>View
                                                        </v-btn>
                                                    </template>
                                                </v-data-table>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                    <v-tab-item>
                                        <v-card color="basil" flat>
                                            <v-card-text>
                                                <v-data-table 
                                                    :headers="listedHeaders" 
                                                    :items="allCurrentUserUnlistedProperties" 
                                                    :items-per-page="5" 
                                                    class="elevation-1"
                                                >
                                                    <template v-slot:item.actions="{ item }">
                                                        <v-btn class="mr-2" @click="changeAvailabilityToAvailable(item)">
                                                            <v-icon small>
                                                                mdi-arrow-left-bold
                                                            </v-icon>List
                                                        </v-btn>
                                                        <v-btn class="mr-2" @click="viewPropertyDetails(item)">
                                                            <v-icon small>
                                                                mdi-eye
                                                            </v-icon>View
                                                        </v-btn>
                                                    </template>
                                                </v-data-table>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                    <v-tab-item>
                                        <v-card color="basil" flat>
                                            <v-card-text>
                                                <v-data-table 
                                                    :headers="listedHeaders" 
                                                    :items="allCurrentUserUncertifiedProperties" 
                                                    :items-per-page="5" 
                                                    class="elevation-1"
                                                >
                                                <template v-slot:item.actions="{ item }">
                                                        <v-btn class="mr-2" @click="navigateToEditSection(item)">
                                                            <v-icon small>
                                                                mdi-pencil
                                                            </v-icon>Edit
                                                        </v-btn>
                                                        <v-btn class="mr-2" @click="viewPropertyDetails(item)">
                                                            <v-icon small>
                                                                mdi-eye
                                                            </v-icon>View
                                                        </v-btn>
                                                    </template> 
                                                </v-data-table>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                </v-tabs-items>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            two
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
        mainTab: null,
        listedHeaders: [
            {
                text: 'Code',
                align: 'start',
                value: 'code'
            },
            {
                text: 'Type',
                value: 'type'
            },
            {
                text: 'Category',
                value: 'category'
            },
            {
                text: 'Cost',
                value: 'cost'
            },
            {
                text: 'Location',
                value: 'location'
            },
            {
                text: 'Created By',
                value: 'creator_name'
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
        ]
    }),
    computed: {
        ...mapGetters([
            "allCurrentUserListedProperties",
            "allCurrentUserUnlistedProperties",
            "allCurrentUserUncertifiedProperties"
        ])
    },
    methods: {
        ...mapActions([
            "getListedPropertiesByUsername",
            "getUnlistedPropertiesByUsername",
            "getUncertifiedPropertiesByUsername",
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
                            this.getUnlistedPropertiesByUsername();
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
                            this.getListedPropertiesByUsername();
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
        navigateToEditSection(item){
            this.$router.push(`/edit-property/${item.property_id}`);
        },
        viewPropertyDetails(item){
            this.$router.push(`/single-property/${item.property_id}`);
        },
        async fetchListedProperties(){
            try {
                const response = await this.getListedPropertiesByUsername();
                if(response.data.status == 0){
                    this.defaultResponse(response.data.message, 'Error', true);
                }
            } catch (error) {
                this.defaultResponse(error.message, 'Error', true);
            }
        },
        async fetchUnlistedProperties(){
            try {
                const response = await this.getUnlistedPropertiesByUsername();
                if(response.data.status == 0){
                    this.defaultResponse(response.data.message, 'Error', true);
                }
            } catch (error) {
                this.defaultResponse(error.message, 'Error', true);
            }
        },
        async fetchUncertifiedProperties(){
            try {
                const response = await this.getUncertifiedPropertiesByUsername();
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
