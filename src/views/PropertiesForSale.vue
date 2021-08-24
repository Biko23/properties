<template>
<div>
  <top-nav />
  <main-nav />
  <PropertiesForSaleComponent/>
  <about />
  <Footer />

</div>
</template>

<script>
import TopNav from '../components/TopNav.vue'
import MainNav from '../components/MainNav.vue'
import Footer from '../components/Footer'

import PropertiesForSaleComponent from '../components/PropertiesForSaleComponent.vue'
import About from './About.vue'

export default {
  name: 'Property',

  components: {
    TopNav,
    MainNav,
    PropertiesForSaleComponent,
    Footer,
    About
  }
}
</script>
