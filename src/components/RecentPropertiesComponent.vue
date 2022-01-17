<template>
<v-card max-width="auto">
    <v-img :src="src" height="200px" data-testid="image-element"></v-img>
    <v-card-title style="color: #3b6ef3" data-testid="description-element"> {{description}} </v-card-title>
    <v-card-subtitle data-testid="created-element">Added By :{{created_by}}</v-card-subtitle>
</v-card>
</template>

<script>
export default {
    name: 'RecentPropertiesComponent',
    props: {
        description: {
            type: String,
            default: "No description"
        },
        created_by: {
            type: String,
            default: "Creator missing"
        },
        src: {
            type: String,
            default: "https://res.cloudinary.com/diued7ugb/image/upload/v1625732723/house1_svrut7.jpg"
        }

       
    }
}
</script>

