<template>
<div>
    <v-container id="container" fluid>
        <v-row id="property-header">
            <div style="flex:1;">
                <h3>Properties</h3>
                <small style="font-weight: bold;">{{allPropertyForSale.length}} results</small>
            </div>
            <div style="flex:1;">
                <h3 style="color: #3b6ef3;">BUY PROPERTY HERE</h3>
            </div>
        </v-row>
        <v-row id="main-property">
            <v-col cols="12" xl="2" lg="3" md="4" sm="6" xs="12" v-for="propertyVisual in allPropertyForSale" :key="propertyVisual.visuals_id">
               <!-- :cost="numberWithCommas(propertyVisual.actual_value)" -->
                <property-card
                    :location="propertyVisual.name"
                    :date="formatDate(propertyVisual.when_created)"
                    :cost="propertyVisual.actual_value"
                    :postedBy="propertyVisual.created_by"
                    :src="'http://localhost:8002/' + propertyVisual.snapshot"
                    :to="`/view/${propertyVisual.property_id}?location=${propertyVisual.name}`"
                />

                <!-- C:\Users\A241901\Documents\project\stanbicproperties-marketplace\property-visuals\src\main\resources\uploads -->
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
    name: "PropertiesForSaleComponent",
    components: {
        PropertyCard
    },
    methods: {
        ...mapActions(["fetchPropertyForSale", "fetchPropertyCategories"]),
        formatDate(dateToFormat){
            let currentDate = new Date();
            let result;
            const formattedDate = dateFormat(currentDate, "isoDateTime");
                console.log("formatedDate", formattedDate, "dateToFormat", dateToFormat);
                // current date - date-returned
            if(dateToFormat == formattedDate || dateToFormat == (formattedDate - 1)){
                result = dateFormat(dateToFormat, "DDDD");
            } else {
                result = dateFormat(dateToFormat, "dddd, mmmm dS, yyyy");
            }
            return result;
        },
        async fetchAllProperties(){
            try {
                await this.fetchPropertyCategories()
                    .then(() => this.fetchPropertyForSale()
                )
            } catch (error) {
               throw new Error('Failed to fetch data'); 
            }
        }
    },
    computed: {
        ...mapGetters(["allPropertyForSale"]),
    },
    created(){
        this.fetchAllProperties();
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
