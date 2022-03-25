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
                    <v-tabs 
                        v-model="mainTab" 
                        dark
                        background-color="#3B6EF3"
                        grow
                    >
                        <v-tab>My Property Details</v-tab>
                        <v-tab>My Rental Details</v-tab>
                    </v-tabs>
                     <v-tabs-items v-model="mainTab">
                        <v-tab-item>
                            <v-card color="basil">
                                <v-tabs v-model="propertyTab" color="deep-purple accent-4" grow>
                                    <v-tab>Listed Properties</v-tab>
                                    <v-tab>Unlisted Properties</v-tab>
                                    <v-tab>Pending Certification</v-tab>
                                </v-tabs>
                                <v-tabs-items v-model="propertyTab">
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
                            <!--  -->
                            <v-card color="basil">
                                <v-tabs v-model="rentalTab" color="deep-purple accent-4" grow>
                                    <v-tab>Listed Rentals</v-tab>
                                    <v-tab>Unlisted Rentals</v-tab>
                                    <v-tab>Pending Certification</v-tab>
                                </v-tabs>
                                <v-tabs-items v-model="rentalTab">
                                    <v-tab-item>
                                        <v-card color="basil" flat>
                                            <v-card-text>
                                                <v-data-table 
                                                    :headers="listedHeaders" 
                                                    :items="allCurrentUserListedRentals"
                                                    :items-per-page="5" 
                                                    class="elevation-1"
                                                >
                                                    <template v-slot:item.actions="{ item }">
                                                        <v-btn class="mr-2" @click="changeRentalAvailabilityToNotAvailable(item)">
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
                                                    :items="allCurrentUserUnlistedRentals"                                                  
                                                    :items-per-page="5" 
                                                    class="elevation-1"
                                                >
                                                    <template v-slot:item.actions="{ item }">
                                                        <v-btn class="mr-2" @click="changeRentalAvailabilityToAvailable(item)">
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
                                                    :items="allCurrentUserUncertifiedRentals" 
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
                            <!--  -->
                        </v-tab-item>
                    </v-tabs-items>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex'

export default {
    name: 'SellerPropertiesDetails',
    data: () => ({
        message: '',
        title: '',
        state: false,
        propertyTab: null,
        rentalTab: null,
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
            "allCurrentUserUncertifiedProperties",
            "allCurrentUserListedRentals",
            "allCurrentUserUnlistedRentals",
            "allCurrentUserUncertifiedRentals"
        ])
    },
    methods: {
        ...mapActions([
            "getListedPropertiesByUsername",
            "getUnlistedPropertiesByUsername",
            "getUncertifiedPropertiesByUsername",
            "getListedRentalsByUsername",
            "getUnlistedRentalsByUsername",
            "getUncertifiedRentalsByUsername",
            "unlistPropertyFromMarketPlace",
            "requestToListPropertyBackOnMarketPlace",
            "unlistRentalFromMarketPlace",
            "requestToListRentalBackOnMarketPlace",
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
        // ============ Properties
        async changeAvailabilityToNotAvailable(property) {
            try {
                await this.unlistPropertyFromMarketPlace(property.property_id)
                    .then(response => {
                        const payload = {
                            activity: "Moved property to Unavailable section",
                            button_clicked: "Unlist Button"
                        }
                        if(response.data.status === 1){
                            this.postAUserLog(payload);
                            this.getUnlistedPropertiesByUsername();
                            this.defaultResponse('Property successfully unlisted from market place', 'Success', true);
                        } else {
                            this.defaultResponse(response.data.message, 'Error', true);
                        }
                    });
            } catch (error) {
                this.defaultResponse(error.message, 'Error', true);
            }
        },
        async changeAvailabilityToAvailable(property) {
            try {
                await this.requestToListPropertyBackOnMarketPlace(property.property_id)
                    .then((response) =>{
                        const payload = {
                            activity: "Moved property to Available section",
                            button_clicked: "Unlist Button"
                        }
                        if(response.propertyResponse.data.status === 1){
                            this.postAUserLog(payload);
                            this.getUncertifiedPropertiesByUsername();
                            this.defaultResponse('Property successfully listed on market place', 'Success', true);
                        } else {
                            this.defaultResponse(response.data.message, 'Error', true);
                        }
                    });
            } catch (error) {
                this.defaultResponse(error.message, 'Error', true);
            }
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
        // =============== End properties
        // ============ Rentals
        async changeRentalAvailabilityToNotAvailable(property) {
            try {
                await this.unlistRentalFromMarketPlace(property.property_id)
                    .then(response => {
                        const payload = {
                            activity: "Moved rental to Unavailable section",
                            button_clicked: "Unlist Button"
                        }
                        if(response.data.status === 1){
                            this.postAUserLog(payload);
                            this.getUnlistedRentalsByUsername();
                            this.defaultResponse('Rental successfully unlisted from market place', 'Success', true);
                        } else {
                            this.defaultResponse(response.data.message, 'Error', true)
                        }
                    });
            } catch (error) {
                this.defaultResponse(error.message, 'Error', true);
            }
        },
        async changeRentalAvailabilityToAvailable(property) {
            try {
                await this.requestToListRentalBackOnMarketPlace(property.property_id)
                    .then((response) =>{
                        const payload = {
                            activity: "Moved rental to Available section",
                            button_clicked: "Unlist Button"
                        }
                        if(response.data.status === 1){
                            this.postAUserLog(payload);
                            this.getUncertifiedRentalsByUsername();
                            this.defaultResponse('Rental successfully listed on market place', 'Success', true);
                        } else {
                            this.defaultResponse(response.data.message, 'Error', true)
                        }
                    });
            } catch (error) {
                this.defaultResponse(error.message, 'Error', true);
            }
        },
        async fetchListedRentals(){
            try {
                const response = await this.getListedRentalsByUsername();
                if(response.data.status == 0){
                    this.defaultResponse(response.data.message, 'Error', true);
                }
            } catch (error) {
                this.defaultResponse(error.message, 'Error', true);
            }
        },
        async fetchUnlistedRentals(){
            try {
                const response = await this.getUnlistedRentalsByUsername();
                if(response.data.status == 0){
                    this.defaultResponse(response.data.message, 'Error', true);
                }
            } catch (error) {
                this.defaultResponse(error.message, 'Error', true);
            }
        },
        async fetchUncertifiedRentals(){
            try {
                const response = await this.getUncertifiedRentalsByUsername();
                if(response.data.status == 0){
                    this.defaultResponse(response.data.message, 'Error', true);
                }
            } catch (error) {
                this.defaultResponse(error.message, 'Error', true);
            }
        },
        // =============== End rentals
         navigateToEditSection(item){
            this.$log.info("Move to edit selected property's details")
            this.$router.push(`/edit-property/${item.property_id}?type=${item.type}`);
        },
        viewPropertyDetails(item){
            this.$log.info("Move to view selected property's details")
            this.$router.push(`/single-property/${item.property_id}`);
        },
    },
    created() {
        this.$log.info('Accessing the seller property details page.')
        this.postAUserLog({
            activity: "Visited Seller Details page",
            button_clicked: "Seller Details Page"
        })
        this.fetchListedProperties();
        this.fetchUnlistedProperties();
        this.fetchUncertifiedProperties();
        this.fetchListedRentals();
        this.fetchUnlistedRentals();
        this.fetchUncertifiedRentals();
    }
}
</script>
