<template>
<v-card max-width="auto">
    <v-card-subtitle class="time">Added {{date}} </v-card-subtitle>
    <v-img src="https://res.cloudinary.com/diued7ugb/image/upload/v1625732723/house1_svrut7.jpg" height="200px"></v-img>
    <v-card-subtitle>
         <small style="font-weight: bold; color: #000000; margin-bottom: 0;">${{cost}}</small><br>
         <small>{{detail}}</small><br>
        <small>{{location}}</small>
         </v-card-subtitle>
</v-card>
</template>

<script>
import dateFormat from 'dateformat'
export default {
    name: 'PropertyCard',
    props: {
        detail: {
            type: String,
            default: "2 beds, 2 bathrooms, 1,500ft - House for rent"
        },
        location: {
            type: String,
            default: "No available location"
        }
    },
    data() {
        return {
            cost: Math.floor(Math.random() * 100000) + 1,
            date: dateFormat(new Date(), "DDDD")
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
