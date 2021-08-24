<template>
<div>
  <top-nav />
  <main-nav />
  <SearchProperitiesComponent/>
  <about />
  <Footer />

</div>
</template>

<script>
import TopNav from '../components/TopNav.vue'
import MainNav from '../components/MainNav.vue'
import Footer from '../components/Footer'

import SearchProperitiesComponent from '../components/SearchPropertiesComponent.vue'
import About from './About.vue'

export default {
  name: 'SearchResults',

  components: {
    TopNav,
    MainNav,
    SearchProperitiesComponent,
    Footer,
    About
  }
}
</script>
