<template>
<v-card max-width="auto" :style="bought == true ? 'opacity: 0.6;': 'opacity: 1;'">
    <!-- Add a section for bought property false -->
    <div v-if="bought === true" style=" text-decoration:none;" data-testid="link-element">
        <v-card-subtitle class="time" style="z-index: 1;" data-testid="date-element">{{date}} </v-card-subtitle>
        <v-img :src="src" :lazy-src="lazy" height="200px" data-testid="image-element"></v-img>
        <p style="
            font-size: 40px; 
            font-weight: bold; 
            color: red; 
            position: absolute; 
            top: 20%; 
            right: 30%; 
            background-color: white;
            padding: 0 10px 0 10px;
            ">TAKEN</p>
    </div>
    <router-link v-else :to="to" style=" text-decoration:none;" data-testid="link-element">
        <v-card-subtitle class="time" style="z-index: 1;" data-testid="date-element">{{date}} </v-card-subtitle>
        <v-img :src="src" :lazy-src="lazy" height="200px" data-testid="image-element"></v-img>
    </router-link>
    <div style="display: flex; flex-direction: row; justify-content: space-between;">
        <v-card-subtitle>
            <small style="font-weight: bold; color: #000000; margin-bottom: 0; font-size: 18px;" data-testid="cost-element">UGX: {{cost}}</small><br>
            <small style="font-weight: 500; color: #000000; margin-bottom: 5px; font-size: 14px;" data-testid="code-element">Code: {{propertyCode}}</small><br>
            <slot name="type"></slot>
            <small data-testid="category-element">Category: {{category}}</small><br>
            <small data-testid="location-element">Located: {{location}}</small><br>
            <small data-testid="posted-by-element">Posted by: {{postedBy}}</small>
        </v-card-subtitle>
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
            default: dateFormat('01/01/2022', "DDDD")
        },
        propertyCode: {
            type: String,
            default: 'No code'
        },
        cost: {
            type: [String, Number],
            default: (0).toString()
        },
        to: {
            type: String,
            default: "/view"
        },
        bought: {
            type: String,
            default: false
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
