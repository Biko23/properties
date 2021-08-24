<template>
<div>
  <top-nav />
  <main-nav />
  <PropertyForRentComponent />
  <about />
  <Footer />

</div>
</template>

<script>
import TopNav from '../components/TopNav.vue'
import MainNav from '../components/MainNav.vue'
import Footer from '../components/Footer'

import PropertyForRentComponent from '@/components/PropertyForRentComponent'
import About from './About.vue'

export default {
  name: 'PropertiesForRent',

  components: {
    TopNav,
    MainNav,
    PropertyForRentComponent,
    Footer,
    About
  }
}
</script>
