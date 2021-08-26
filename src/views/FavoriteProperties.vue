<template>
<div>
  <top-nav />
  <main-nav />
  <favorite-properties-component/>
  <about />
  <Footer />

</div>
</template>

<script>
import TopNav from '../components/TopNav.vue'
import MainNav from '../components/MainNav.vue'
import Footer from '../components/Footer'

import FavoritePropertiesComponent from '../components/FavoritePropertiesComponent.vue'
import About from './About.vue'

export default {
  name: 'Property',

  components: {
    TopNav,
    MainNav,
    FavoritePropertiesComponent,
    Footer,
    About
  }
}
</script>
