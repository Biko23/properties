<template>
<div>
    <v-container id="container" fluid>
        <v-row id="property-header">
            <div style="flex:1;">
                <h3>Available Properties for sale</h3>
                <small style="font-weight: bold;">{{count}} results</small>
            </div>
            <div style="flex:1;">
                <h3 style="color: #3b6ef3;">BUY PROPERTY HERE</h3>
            </div>
        </v-row>
        <v-row id="main-property">
            <v-col cols="12" xl="2" lg="3" md="4" sm="6" xs="12">
                <property-card location="Plot 3435, Kyengera-Wakiso"/>
            </v-col>
            <v-col cols="12" xl="2" lg="3" md="4" sm="6" xs="12">
                <property-card />
            </v-col>
            <v-col cols="12" xl="2" lg="3" md="4" sm="6" xs="12">
                <property-card />
            </v-col>
            <v-col cols="12" xl="2" lg="3" md="4" sm="6" xs="12">
                <property-card />
            </v-col>
            <v-col cols="12" xl="2" lg="3" md="4" sm="6" xs="12">
                <property-card />
            </v-col>
            <v-col cols="12" xl="2" lg="3" md="4" sm="6" xs="12">
                <property-card />
            </v-col>
            <v-col cols="12" xl="2" lg="3" md="4" sm="6" xs="12">
                <property-card />
            </v-col>
            <v-col cols="12" xl="2" lg="3" md="4" sm="6" xs="12">
                <property-card />
            </v-col>
            <v-col cols="12" xl="2" lg="3" md="4" sm="6" xs="12">
                <property-card />
            </v-col>
            <v-col cols="12" xl="2" lg="3" md="4" sm="6" xs="12">
                <property-card />
            </v-col>
        </v-row>
    </v-container><br />
</div>
</template>

<script>
import PropertyCard from '@/components/PropertyCard'
export default {
    name: "PropertiesForSaleComponent",
    components: {
        PropertyCard
    },
    data: () => ({
        count: Math.floor((Math.random() * 1000) + 1)
    }),
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
