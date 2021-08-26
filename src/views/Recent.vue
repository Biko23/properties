<template>
  <div>
    <top-nav />
    <main-nav />
      <recent-activities />
      <Footer />
  </div>
</template>

<script>
import RecentActivities from '@/components/RecentActivities.vue'
import Footer from '../components/Footer.vue'
import TopNav from '../components/TopNav.vue'
import MainNav from '../components/MainNav.vue'
export default {
  name: 'Recent',
  components: { 
    RecentActivities,
    Footer,
    TopNav,
    MainNav
  }
}
</script>

<style>

</style>