<template>
<div>
    <v-container id="container" fluid>
        <v-row id="property-header">
            <div style="flex: 1">
                <h3>Properties</h3>
                <small style="font-weight: bold" data-testid="total-result-element">{{ allDetailedCurrentFavoriteList.length }} results</small>
            </div>
            <div style="flex: 1">
                <h3 style="color: #3b6ef3">Favorite List</h3>
            </div>
        </v-row>
        <v-row id="main-property">
            <v-col cols="12" xl="2" lg="3" md="4" sm="6" xs="12" v-for="(favoriteProperty, index) in allDetailedCurrentFavoriteList" :key="index">
                <transition name="slide-fade">
                    <property-card 
                        :location="favoriteProperty.name" 
                        :date="formatDate(favoriteProperty.when_saved)" 
                        :category="favoriteProperty.category" 
                        :propertyCode="favoriteProperty.property_number" 
                        :cost="commaFormatted(favoriteProperty.actual_value)" 
                        :postedBy="favoriteProperty.created_by"
                        :bought="favoriteProperty.bought"
                        :src="'http://localhost:8002/' + favoriteProperty.snapshot" 
                        :to="favoriteProperty.listed_for_name == ('Rent' || 'rent' || 'RENT')
                            ? `/view-rental/${favoriteProperty.property_id}?code=${favoriteProperty.property_number}&location=${favoriteProperty.name}&cost=${favoriteProperty.actual_value}&district=${favoriteProperty.district}&category=${favoriteProperty.category}&type=Rent`
                            : `/view/${favoriteProperty.property_id}?code=${favoriteProperty.property_number}&location=${favoriteProperty.name}&cost=${favoriteProperty.actual_value}&district=${favoriteProperty.district}&category=${favoriteProperty.category}&type=Sale`
                        "
                      >
                        <template v-slot:type>
                            <small style="font-size: 14px">Type: <b>{{ favoriteProperty.listed_for_name }}</b></small><br />
                        </template>
                        <template v-slot:default>
                            <p small class="mr-2 text--h6" style="color: red; z-index: 100; text-decoration: underline; cursor: pointer;" @click="onRemove(favoriteProperty.property_id)">
                                Remove
                            </p>
                        </template>
                    </property-card>
                </transition>
            </v-col>
        </v-row>
    </v-container><br />
</div>
</template>

<script>
import PropertyCard from "@/components/PropertyCard";
import moment from 'moment';
import { mapActions, mapGetters } from "vuex";
export default {
    name: "PropertiesForSaleComponent",
    components: {
        PropertyCard,
    },
    data() {
        return {
            myIcon: "mdi-heart",
            hide: true,
        };
    },
    methods: {
        ...mapActions([
            "fetchAllDetailedCurrentUserProperties",
            "removePropertyFromFavoriteSection",
            "postAUserLog",
        ]),
        formatDate(dateToFormat) {
            let currentDate = new Date();
            let returnedFormattedDate = new Date(dateToFormat);
            let difference = Math.abs(returnedFormattedDate - currentDate);
            let days = (difference / (1000 * 3600 * 24)).toFixed(0);

            const DATES = {
                "0": "today",
                "1": "a day ago",
                "2": "2 days ago",
                "3": "3 days ago",
                "4": "4 days ago",
                "5": "5 days ago",
                "6": "6 days ago",
                "7": "7 days ago"
            }

            return DATES[days] ? `Saved ${DATES[days]}` : 'Saved ' + moment(returnedFormattedDate).format('YYYY-MM-DD HH:MM');
        },
        commaFormatted(amount) {
            let price = amount.toLocaleString("en-US");
            return price;
        },
        onRemove(property_id) {
            this.removePropertyFromFavoriteSection(property_id).then(() => {
                const payload = {
                    activity: `Removed Property with id ${property_id} from favorites`,
                    button_clicked: "Favorite Button",
                };
                this.postAUserLog(payload);
                this.hide = false;
            });
        },
    },
    computed: {
        ...mapGetters(["allDetailedCurrentFavoriteList"])
    },
    created() {
        this.postAUserLog({
            activity: "Visited the favorites page",
            button_clicked: "View Favorite Page",
        });
        this.fetchAllDetailedCurrentUserProperties();
    },
};
</script>

<style lang="css" scoped>
    #property-header {
        margin: 0 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    #main-property {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .slide-fade-leave-active {
        transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .slide-fade-leave-to {
        transform: translateX(10px);
        opacity: 0;
    }
</style>
