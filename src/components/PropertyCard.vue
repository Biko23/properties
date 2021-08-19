<template>
 <router-link :to="to" style=" text-decoration:none;">
<v-card max-width="auto">
    <v-card-subtitle class="time" style="z-index: 1;">Added {{date}} </v-card-subtitle>
    <v-img :src="src" height="200px"></v-img>
    <v-card-subtitle>
         <small style="font-weight: bold; color: #000000; margin-bottom: 0;">UGX: {{cost}}</small><br>
        <small>Located: {{location}}</small><br>
        <small>Posted by: {{postedBy}}</small>
         </v-card-subtitle>
</v-card>
 </router-link>
</template>

<script>
import dateFormat from 'dateformat'
export default {
    name: 'PropertyCard',
    props: {
        postedBy: {
            type: String,
            default: "No name"
        },
        location: {
            type: String,
            default: "No available location"
        },
        src: {
            type: String,
            default: "https://res.cloudinary.com/diued7ugb/image/upload/v1625732723/house1_svrut7.jpg"
        },
        date: {
            type: String,
            default: dateFormat(new Date(), "DDDD")
        },
        cost: {
            type: Number,
            default: Math.floor(Math.random() * 100000) + 1
        },
        to: {
            type: String,
            default: "/view"
        }
    },
    // computed: {
    //     formatAmount : (propertyCost)=> {
    //         let internationalNumberFormat = new Intl.NumberFormat('en-US');
    //         return internationalNumberFormat.format(propertyCost);
    //     }
    // }
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
