<template>
  <div>
      <user-logs />
  </div>
</template>

<script>
import MainNav from '../components/MainNav.vue'
import TopNav from '../components/TopNav.vue'
import UserLogs from '../components/UserLogs.vue'
export default {
    name:"UserLogsActivities",
  components: { UserLogs, TopNav, MainNav },

}
</script>

<style>

</style>