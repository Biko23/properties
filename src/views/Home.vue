<template>
<div>
    <top-nav />
    <main-nav />
    <home-component />
    <about />
    <Footer />

</div>
</template>

<script>
//import TopNav from '../components/TopNav.vue'
//import HelloWorld from '../components/HelloWorld'
import TopNav from '../components/TopNav.vue'
import MainNav from '../components/MainNav.vue'
import About from './About.vue';
import Footer from '@/components/Footer.vue';

import HomeComponent from '../components/HomeComponent.vue'

export default {
    name: 'Home',

    components: {
        TopNav,
        MainNav,
        HomeComponent,
        About,
        Footer
    }
}
</script>
