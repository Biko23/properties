<template>
<div>
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
        async changeAvailabilityToNotAvailable(property) {
            try {
                await this.updatePropertyVisualAvailabilityStatus(property.property_id)
                    .then(() => {
                        const payload = {
                            activity: "Moved property to Unavailable section",
                            button_clicked: "Unlist Button"
                        }
                        this.postAUserLog(payload);
                        this.getUnlistedPropertyVisualsByUsername();
                        });

            } catch (error) {
                throw new Error(error);
            }
        },
        async changeAvailabilityToAvailable(property) {
            try {
                await this.updatePropertyVisualNotAvailabilityStatus(property.property_id)
                    .then(() =>{
                        const payload = {
                            activity: "Moved property to Available section",
                            button_clicked: "Unlist Button"
                        }
                        this.postAUserLog(payload);
                        this.getListedPropertyVisualsByUsername()
                    });
            } catch (error) {
                throw new Error(error);
            }
        }
    },
    created() {
         this.postAUserLog({
            activity: "Visited Seller Details page",
            button_clicked: "Seller Details Page"
        })
        this.getListedPropertyVisualsByUsername();
        this.getUnlistedPropertyVisualsByUsername();
        this.getUncertifiedPropertyVisualsByUsername();
    }
}
</script>
