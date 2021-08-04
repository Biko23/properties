<template>
 <router-link :to="to" style=" text-decoration:none;">
<v-card max-width="auto">
    <v-card-subtitle class="time">Name {{vendor_name}} </v-card-subtitle>
    <v-img :src="src" height="200px"></v-img>
    <v-card-subtitle>
         <small style="font-weight: bold; color: #000000; margin-bottom: 0;">{{vendor_primary_phone_number}}</small><br>
         <small>{{vendorCategory}}</small><br>
        <small>{{vetted}}</small>
         </v-card-subtitle>
</v-card>
 </router-link>
</template>

<script>
import dateFormat from 'dateformat'
export default {
    name: 'PropertyCard',
    props: {
        vendor_name: {
            type: String,
            default: "No name"
        },
        vendor_primary_phone_number: {
            type: String,
            default: "No available email"
        },
        vendorCategory: {
            type: String,
            default: "Vendor Category"
        },
        vetted: {
            type: String,
            default: dateFormat(new Date(), "DDDD")
        },
        to: {
            type: String,
            default: "/view"
        }
    }
}
</script>

<style scoped>
.time {
    position: absolute;
    z-index: 10;
    top: 10;
    font-weight: bold;
    color: #000000;
    padding: 5px;
    background-color: #FFFFFF;
    display: inline-block;
}
</style>
