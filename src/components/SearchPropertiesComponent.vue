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
                        <input placeholder="Search Properties" v-model="searchKeyword" />
                        <span style="margin-left: -50px; padding-top: 300px">
                            <button @click="searchProperties">
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
//   components: {
//     'v-header': Header,
//     'v-button': Button
//   }
    name: "SearchPropertiesComponent",
    components: {
        PropertyCard
    },
    props: ["keyword"],
    data: ()=>({
        searchKeyword: ''
    }),
    methods: {
        ...mapActions(["fetchPropertiesBySearchKeyword"]),
           formatDate(dateToFormat) {
            let currentDate = new Date();
            let returnedFormattedDate = new Date(dateToFormat);
            let difference = Math.abs(returnedFormattedDate - currentDate);
            let days = (difference / (1000 * 3600 * 24)).toFixed(0);
            console.log(days);

            let result;
            switch (+days) {
                case 0:
                    result = "Added now";
                    break;
                case 1:
                    result = "1 days ago";
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
                    result = dateFormat(returnedFormattedDate, "dddd, mmmm dS, yyyy");
                    break;
            }
            return result;
        },
        async searchProperties(){
             try {
                await this.fetchPropertiesBySearchKeyword(this.searchKeyword);
                this.searchKeyword = '';
            } catch (error) {
                console.log(error);
            }
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
