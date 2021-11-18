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
                        <v-tab>My Acquired Properties</v-tab>
                        <v-tab>My Acquired Rentals</v-tab>
                    </v-tabs>
                    <v-tabs-items v-model="tab">
                        <v-tab-item>
                            <v-card color="basil" flat>
                                <v-card-text>
                                    <v-data-table 
                                        :headers="listedHeaders" 
                                        :items="userProperties" 
                                        :items-per-page="5" 
                                        class="elevation-1"
                                    >
                                    </v-data-table>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card color="basil" flat>
                                <v-card-text>
                                    <v-data-table 
                                        :headers="listedHeaders" 
                                        :items="userRentals" 
                                        :items-per-page="5" 
                                        class="elevation-1"
                                    >
                                    </v-data-table>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                    </v-tabs-items>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'UserAcquiredPropertiesComponent',
    data: () => ({
        message: '',
        title: '',
        state: false,
        tab: null,
        listedHeaders: [
            {
                text: 'Code',
                align: 'start',
                value: 'property_number'
            },
            {
                text: 'Type',
                value: 'listed_for'
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
                text: 'Located',
                value: 'location'
            },
            {
                text: 'Listed By',
                value: 'listed_by'
            },
            {
                text: 'When Acquired',
                value: 'when_acquired'
            }
        ],
        userProperties: [],
        userRentals: []
    }),
    computed: {
        ...mapGetters([
            "allUserAcquiredProperties",
            "allUserAcquiredRentals"
        ])
    },
    methods: {
        ...mapActions([
            "getCurrentUserAcquiredProperties",
            "getCurrentUserAcquiredRentals",
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
        async fetchCurrentUserAcquiredProperties(){
            try {
                const response = await this.getCurrentUserAcquiredProperties();
                if(response.data.status == 1){
                    this.userProperties = (response.data.result).map(eachProperty => {
                        return {
                            property_id: eachProperty.propertyid_,
                            property_number: eachProperty.property_number_,
                            listed_for: eachProperty.is_listed_for_name,
                            category: eachProperty.property_type_,
                            cost: eachProperty.actual_value_,
                            listed_by: eachProperty.listed_by,
                            location: `${eachProperty.division} ${eachProperty.suburb}`,
                            interest_status: eachProperty.interest_status_,
                            when_acquired: new Date(eachProperty.when_bought_).toLocaleString()
                        }
                    })  
                } else {
                    this.defaultResponse('No properties found', 'Error', true);
                }
            } catch (error) {
                this.defaultResponse(error.message, 'Error', true);
            }
        },
         async fetchCurrentUserAcquiredRentals(){
            try {
                const response = await this.getCurrentUserAcquiredRentals();
                if(response.data.status == 1){
                    this.userRentals = (response.data.result).map(eachProperty => {
                        return {
                            high_value_property_id: eachProperty.high_value_property_id_,
                            property_id: eachProperty.propertyid_,
                            property_number: eachProperty.property_number_,
                            listed_for: eachProperty.is_listed_for_name,
                            category: eachProperty.property_type_,
                            cost: eachProperty.rental_value,
                            listed_by: eachProperty.listed_by,
                            location: `${eachProperty.division} ${eachProperty.suburb}`,
                            interest_status: eachProperty.interest_status_,
                            when_acquired: eachProperty.when_interested_
                        }
                    })
                } else {
                    this.defaultResponse('No rentals found', 'Error', true);
                }
            } catch (error) {
                this.defaultResponse(error.message, 'Error', true);
            }
        },
    },
    created() {
        this.postAUserLog({
            activity: "Visited User Interested Properties page",
            button_clicked: "User Interested Properties Page"
        });
        this.fetchCurrentUserAcquiredProperties();
        this.fetchCurrentUserAcquiredRentals();
    }
}
</script>
