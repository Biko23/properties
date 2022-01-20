<template>
  <div>
      <recent-activities />
  <!-- footer only -->
  </div>
</template>

<script>
import RecentActivities from '@/components/RecentActivities.vue'
import { mapActions } from 'vuex';
export default {
  name: 'Recent',
  components: { 
    RecentActivities
  },
    methods: {
        ...mapActions(["postAUserLog"])
    },
    created(){
        this.postAUserLog({
            activity: "Visited Recently Viewed page",
            button_clicked: "Rencently Viewed Page"
        });
    }
}
</script>

<style>

</style>