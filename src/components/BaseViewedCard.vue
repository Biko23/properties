<template>
<v-card max-width="auto">
    <v-card-subtitle class="time" style="z-index: 1;" data-testid="date-element">Viewed {{date}}</v-card-subtitle>
    <v-img :src="src" :lazy-src="lazy" height="200px" data-testid="image-element"></v-img>
    <div style="display: flex; flex-direction: row; justify-content: space-between;">
        <v-card-subtitle class="test-subtitle">
            <small style="font-weight: bold; color: #000000; margin-bottom: 0;" data-testid="cost-element">UGX: {{cost}}</small><br>
            <small data-testid="category-element">Category: {{category}}</small><br>
            <small data-testid="location-element">Located: {{location}}</small><br>
            <small data-testid="posted-by-element">Posted by: {{postedBy}}</small>
        </v-card-subtitle>
    </div>
</v-card>
</template>

<script>
import dateFormat from 'dateformat';
import lazyImage from '@/assets/lazy.jpg';
export default {
    name: 'BaseViewedCard',
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
            default: lazyImage
        },
        date: {
            type: String,
            default: dateFormat("01/01/1970", "DDDD")
        },
        cost: {
            type: Number,
            default: 0
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
