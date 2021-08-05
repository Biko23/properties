<template>
<div>
    <top-nav />
    <main-nav />
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
                            <!-- return only those where user name, is same as current logged in name -->
                            <seller-property-details 
                                :headers="listedHeaders" 
                                :items="allCurrentUserListedPropertyVisuals" 
                            >
                            </seller-property-details>
                        </v-tab-item>
                        <v-tab-item>
                            <seller-property-details 
                                :headers="listedHeaders"
                                :items="allCurrentUserUnlistedPropertyVisuals"
                            />
                        </v-tab-item>
                        <v-tab-item>
                            <seller-property-details 
                                :headers="certifiedHeaders"
                                :items="allCurrentUserUncertifiedPropertyVisuals"
                            />
                        </v-tab-item>
                    </v-tabs-items>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    <about />
    <Footer />

</div>
</template>

<script>
import TopNav from '@/components/TopNav.vue'
import MainNav from '@/components/MainNav.vue'
import SellerPropertyDetails from '@/components/SellerPropertyDetailComponent'
import About from './About.vue'
import Footer from '@/components/Footer'
import {
    mapActions,
    mapGetters
} from 'vuex'

export default {
    name: 'SellerPropertiesDetails',
    components: {
        TopNav,
        MainNav,
        SellerPropertyDetails,
        Footer,
        About
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
            "getUncertifiedPropertyVisualsByUsername"
        ])
    },
    created(){
        this.getListedPropertyVisualsByUsername();
        this.getUnlistedPropertyVisualsByUsername();
        this.getUncertifiedPropertyVisualsByUsername();
    }
}
</script>
