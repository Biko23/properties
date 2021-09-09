<template>
<v-card max-width="auto">
    <router-link :to="to" style=" text-decoration:none;">
        <v-card-subtitle class="time" style="z-index: 1;">{{date}} </v-card-subtitle>
        <v-img :src="src" :lazy-src="lazy" height="200px"></v-img>
    </router-link>
    <div style="display: flex; flex-direction: row; justify-content: space-between;">
        <v-card-subtitle>
            <small style="font-weight: bold; color: #000000; margin-bottom: 0; font-size: 18px;">UGX: {{cost}}</small><br>
            <slot name="type"></slot>
            <small>Category: {{category}}</small><br>
            <small>Located: {{location}}</small><br>
            <small>Posted by: {{postedBy}}</small>
        </v-card-subtitle>
        <!-- <v-icon>mdi-eye</v-icon> -->
        <div style="display: flex; flex-direction: row; align-items: flex-end;">
            <div style="flex: 1; align-items: center; justify-content: flex-end;">
                <slot name="share"></slot>
            </div>
             <div style="flex: 1; align-items: center; justify-content: flex-end;">
                <slot></slot>
            </div>
        </div>
    </div>
</v-card>
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
        category: {
            type: String,
            default: "Category missing"
        },
        location: {
            type: String,
            default: "No available location"
        },
        src: {
            type: String,
            default: "https://res.cloudinary.com/diued7ugb/image/upload/v1625732723/house1_svrut7.jpg"
        },
        lazy: {
            type: String,
            default: require('../assets/lazy.jpg')
        },
        date: {
            type: String,
            default: dateFormat(new Date(), "DDDD")
        },
        cost: {
            type: String,
            default: (Math.floor(Math.random() * 100000) + 1).toString()
        },
        to: {
            type: String,
            default: "/view"
        }
    }
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
