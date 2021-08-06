<template>
<v-app>
    <!-- <top-nav />
    <main-nav /> -->
    <v-main>
        <router-view />
    </v-main>
    <!-- <about />
    <Footer /> -->
</v-app>
</template>

<script>
// import TopNav from '@/components/TopNav.vue'
// import MainNav from '@/components/MainNav.vue'
// import Footer from '@/components/Footer'
// import About from '@/views/About.vue'
export default {
    name: 'App',
    // components: {
    //     TopNav,
    //     MainNav,
    //     Footer,
    //     About
    // },
    data: () => ({
        //
    })
}
</script>

<style>
@font-face {
    font-family: "Avenir";
    src: local("Avenir"), url(./fonts/AvenirLTStd-Book.otf) format("opentypefont");
}
</style>
