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
                        <v-tab>Properties of Interest</v-tab>
                        <v-tab>Rentals of Interest</v-tab>
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
                                        data-testid="property-table"
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
                                        data-testid="rental-table"
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
    name: 'UserInterestedPropertiesComponent',
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
                text: 'Status',
                value: 'interest_status'
            },
            {
                text: 'Listed',
                value: 'listed_by'
            },
            {
                text: 'Date of Interest',
                value: 'when_interested'
            }
        ],
        userProperties: [],
        userRentals: []
    }),
    computed: {
        ...mapGetters([
            "allUserInterestedProperties",
            "allUserInterestedRentals"
        ])
    },
    methods: {
        ...mapActions([
            "getCurrentUserPropertiesOfInterest",
            "getCurrentUserRentalsOfInterest",
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
        async fetchCurrentUserProperties(){
            try {
                const response = await this.getCurrentUserPropertiesOfInterest();
                if(response.data.status == 1){
                    this.userProperties = (response.data.result).map(eachProperty => {
                        return {
                            high_value_property_id: eachProperty.high_value_property_id_,
                            property_id: eachProperty.propertyid_,
                            property_number: eachProperty.property_number_,
                            listed_for: eachProperty.is_listed_for_name,
                            category: eachProperty.property_type_,
                            cost: eachProperty.actual_Value_,
                            listed_by: eachProperty.listed_by,
                            location: `${eachProperty.district} ${eachProperty.division} ${eachProperty.suburb}`,
                            interest_status: eachProperty.interest_status_,
                            when_interested: new Date(eachProperty.when_interested_).toLocaleString()
                        }
                    }) 
                } else {
                    this.defaultResponse('No properties found', 'Error', true);
                }
            } catch (error) {
                this.defaultResponse(error.message, 'Error', true);
            }
        },
         async fetchCurrentUserRentals(){
            try {
                const response = await this.getCurrentUserRentalsOfInterest();
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
                            location: `${eachProperty.district} ${eachProperty.division} ${eachProperty.suburb}`,
                            interest_status: eachProperty.interest_status_,
                            when_interested: eachProperty.when_interested_
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
        this.fetchCurrentUserProperties();
        this.fetchCurrentUserRentals();
    }
}
</script>
