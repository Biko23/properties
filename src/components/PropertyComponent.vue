<template>
<div>
    <v-container id="container" fluid>
        <v-row id="property-header">
            <div style="flex:1;">
                <h3>Rentals</h3>
                <small style="font-weight: bold;">{{allPropertyVisuals.length}} results</small>
            </div>
            <div style="flex:1;">
                <h3 style="color: #3b6ef3;">RENT PROPERTY HERE</h3>
            </div>
        </v-row>
        <v-row id="main-property">
            <v-col cols="12" xl="2" lg="3" md="4" sm="6" xs="12" v-for="propertyVisual in allPropertyVisuals" :key="propertyVisual.visuals_id">
                <property-card 
                    location="Plot 3435, Kyengera-Wakiso"
                    :date="formatDate(propertyVisual.when_created)"
                    :src="'http://localhost:8002/' + propertyVisual.snapshot"
                    :to="`/view/${propertyVisual.property_id}`"
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
    name: "PropertyComponent",
    components: {
        PropertyCard
    },
     methods: {
        ...mapActions(["fetchPropertyVisuals"]),
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
        }
    },
    computed: {
        ...mapGetters(["allPropertyVisuals"]),
    },
    created(){
        this.fetchPropertyVisuals();
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
