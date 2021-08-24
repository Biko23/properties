<template>
<div>
    <v-container id="container" fluid>
        <v-row id="property-header">
            <div style="flex:1;">
                <h3>Properties</h3>
                <small style="font-weight: bold;">{{allSearchedResults.length}} results</small>
            </div>
            <div style="flex:1;">
                <h3 style="color: #3b6ef3;">BUY PROPERTY HERE</h3>
            </div>
        </v-row>
        <v-row id="main-property">
            <v-col cols="12" xl="2" lg="3" md="4" sm="6" xs="12" v-for="(currentProperty, index) in allSearchedResults" :key="index">
                <property-card
                    :location="currentProperty.name"
                    :date="formatDate(currentProperty.when_created)"
                    :cost="currentProperty.actual_value"
                    :postedBy="currentProperty.created_by"
                    :src="'http://localhost:8002/' + currentProperty.snapshot"
                    :to="`/view/${currentProperty.property_id}?location=${currentProperty.name}`"
                />
            </v-col>
        </v-row>
    </v-container><br />
</div>
</template>

<script>
import PropertyCard from '@/components/PropertyCard'
import dateFormat from 'dateformat'
import { mapActions, mapGetters } from 'vuex';
export default {
    name: "SearchPropertiesComponent",
    components: {
        PropertyCard
    },
    props: ["keyword"],
    methods: {
        ...mapActions(["fetchPropertiesBySearchKeyword"]),
        formatDate(dateToFormat){
            let currentDate = new Date();
            let result;
            const formattedDate = dateFormat(currentDate, "isoDateTime");
                console.log("formatedDate", formattedDate, "dateToFormat", dateToFormat);
            if(dateToFormat == formattedDate || dateToFormat == (formattedDate - 1)){
                result = dateFormat(dateToFormat, "DDDD");
            } else {
                result = dateFormat(dateToFormat, "dddd, mmmm dS, yyyy");
            }
            return result;
        },
        logKeyword(){
            console.log(this.keyword);
        }
    },
    computed: {
        ...mapGetters(["allSearchedResults"]),
    },
    created(){
        this.fetchPropertiesBySearchKeyword();
    }
};
</script>

<style scoped>
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
</style>
