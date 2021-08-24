<template>
  <div>
      <top-nav />
      <main-nav />
      <user-logs />
      <Footer />
  </div>
</template>

<script>
import Footer from '../components/Footer.vue'
import MainNav from '../components/MainNav.vue'
import TopNav from '../components/TopNav.vue'
import UserLogs from '../components/UserLogs.vue'
export default {
    name:"UserLogsActivities",
  components: { UserLogs, TopNav, MainNav, Footer },

}
</script>

<style>

</style>