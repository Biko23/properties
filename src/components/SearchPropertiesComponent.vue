<template>
<div>
    <v-container id="container" fluid>
        <v-row id="property-header">
            <div style="flex:1;">
                <h3>Properties</h3>
                <small style="font-weight: bold;">{{allSearchedResults.length}} results</small>
            </div>
            <div style="flex:1;">
                <!-- <h3 style="color: #3b6ef3;">BUY PROPERTY HERE</h3> -->
                    <div>
                        <input placeholder="Search Properties"/>
                        <span style="margin-left: -50px; padding-top: 300px">
                            <button>
                                <img src="https://res.cloudinary.com/diued7ugb/image/upload/v1625824148/Vector_jyqs4g.svg" alt="" width="20" srcset="" style="margin-top: -12px; position: absolute" />
                            </button>
                        </span>
                    </div>
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

::placeholder {
    color: #3b6ef3;
    font-size: 1rem;
    padding: 30px;
    font-weight: 250;
}
input {
    /* margin-top: 180px; */
    background-color: #f2f2f2;
    height: 50px;
    padding: 20px;
    width: 500px;
    border-radius: 6px;
}

input:focus { 
    outline: none !important;
    border-color: #1261b6;
    border: 1px solid #0f6ed4;
    box-shadow: 0 0 10px #0f6ed4;
}
</style>
