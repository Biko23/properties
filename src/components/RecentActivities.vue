<template>
<div>
    <v-container>
        <v-row>
            <v-col style="text-align: center">
                <h1>Recently Viewed</h1>
            </v-col>
        </v-row>
    </v-container>
    <v-container>
        <v-row>
            <!--  -->
            <v-col cols="12" md="6" xs="12">
                <p style="font-weight: bold;">Properties For Sale</p>
                <v-row class="recent">
                    <v-col cols="12" xl="2" md="6" xs="12" v-for="(viewedSaleProperty, index) in allRecentViewedProperties" :key="index">
                        <BaseViewedCard :src="'http://localhost:8002/' + viewedSaleProperty.snapshot" :date="formatDate(viewedSaleProperty.last_viewed)" :cost="viewedSaleProperty.actual_value" :category="viewedSaleProperty.category" :location="viewedSaleProperty.name" :postedBy="viewedSaleProperty.created_by" />
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" md="6" xs="12">
                <p style="font-weight: bold;">Properties For Rent</p>
                <v-row class="recent">
                    <v-col cols="12" xl="2" md="6" xs="12" v-for="(viewedRentProperty, index) in allRecentViewedRentals" :key="index">
                        <BaseViewedCard :src="'http://localhost:8002/' + viewedRentProperty.snapshot" :date="formatDate(viewedRentProperty.last_viewed)" :cost="viewedRentProperty.actual_value" :category="viewedRentProperty.category" :location="viewedRentProperty.name" :postedBy="viewedRentProperty.created_by" />
                    </v-col>
                </v-row>
            </v-col>
            <!--  -->
        </v-row>
    </v-container>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from "vuex";
import BaseViewedCard from "./BaseViewedCard.vue";
export default {
    name: "RecentActivities",
    components: {
        BaseViewedCard,
    },
    methods: {
        ...mapActions(["fetchViewedRentalProperties", "fetchViewedSaleProperties"]),
        formatDate(dateToFormat) {
            let currentDate = new Date();
            let returnedFormattedDate = new Date(dateToFormat);
            let difference = Math.abs(returnedFormattedDate - currentDate);
            let days = (difference / (1000 * 3600 * 24)).toFixed(0);

            let result;
            switch (+days) {
                case 0:
                    result = "today";
                    break;
                case 1:
                    result = "a day ago";
                    break;
                case 2:
                    result = "2 days ago";
                    break;
                case 3:
                    result = "3 days ago";
                    break;
                case 4:
                    result = "4 days ago";
                    break;
                case 5:
                    result = "5 days ago";
                    break;
                case 6:
                    result = "6 days ago";
                    break;
                case 7:
                    result = "7 days ago";
                    break;
                default:
                    result = dateFormat(returnedFormattedDate, "ddd, mmm dS, yyyy");
                    break;
            }
            return result;
        },
    },
    computed: {
        ...mapGetters(["allRecentViewedRentals", "allRecentViewedProperties"]),
    },
    created() {
        this.fetchViewedRentalProperties();
        this.fetchViewedSaleProperties();
    },
};
</script>

<style>
    .recent {
        padding: 5px;
        margin: 1px;
        border: 1px solid white;
        background-color: white;
        border-radius: 1%;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, .1), -2px -2px 2px rgba(0, 0, 0, .1);
    }
</style>
