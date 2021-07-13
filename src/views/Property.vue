<template>
<div>
  <top-nav />
  <main-nav />
  <property-component />
  <Footer />

</div>
</template>

<script>
import TopNav from '../components/TopNav.vue'
import MainNav from '../components/MainNav.vue'
import Footer from '../components/Footer'

import PropertyComponent from '../components/PropertyComponent'

export default {
  name: 'Property',

  components: {
    TopNav,
    MainNav,
    PropertyComponent,
    Footer
  }
}
</script>
