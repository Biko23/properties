<template>
<div>
  <top-nav />
  <main-nav />
  <property-component />
  <about />
  <Footer />

</div>
</template>

<script>
import TopNav from '../components/TopNav.vue'
import MainNav from '../components/MainNav.vue'
import Footer from '../components/Footer'

import PropertyComponent from '../components/PropertyComponent'
import About from './About.vue'

export default {
  name: 'Property',

  components: {
    TopNav,
    MainNav,
    PropertyComponent,
    Footer,
    About
  }
}
</script>
