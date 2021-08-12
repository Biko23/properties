<template>
<v-list-item link :to="link">
    <v-list-item-title id="link-title"> {{title}} </v-list-item-title>
</v-list-item>
</template>

<script>
export default {
    name: "Links",
    props: {
        link: {
            type: String,
            default: "/",
        },
        title: {
            type: String,
            default: "All",
        },
    },

};
</script>

<style scoped>
#link-title {
    color: rgb(50, 50, 250);
    font-size: 14px;
}

#link-title:hover {
    text-decoration: underline;
}

@media only screen and (max-width: 768px) {
    #link-title {
        color: rgb(50, 50, 250);
        font-size: 12px;
    }

    #link-title:hover {
        text-decoration: underline;
    }
}
</style>
