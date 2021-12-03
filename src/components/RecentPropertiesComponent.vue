<template>
<v-card max-width="auto">
    <v-img :src="src" height="200px"></v-img>
    <v-card-title style="color: #3b6ef3"> {{description}} </v-card-title>
    <v-card-subtitle>Added By:{{created_by}}</v-card-subtitle>
</v-card>
</template>

<script>
export default {
    name: 'RecentPropertiesComponent',
    props: {
        description: {
            type: String,
            default: "Location Missing"
        },
        created_by: {
            type: String,
            default: "No date"
        },
        src: {
            type: String,
            default: "https://res.cloudinary.com/diued7ugb/image/upload/v1625732723/house1_svrut7.jpg"
        }

       
    }
}
</script>

