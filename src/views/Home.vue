<template>
<div>
  <top-nav />
  <main-nav />
  <home-component />

</div>
</template>

<script>
//import TopNav from '../components/TopNav.vue'
//import HelloWorld from '../components/HelloWorld'
import TopNav from '../components/TopNav.vue'
import MainNav from '../components/MainNav.vue'

import HomeComponent from '../components/HomeComponent.vue'

export default {
  name: 'Home',

  components: {
    TopNav,
    MainNav,
    HomeComponent

   
  }
}
</script>
