<template>
  <div>
      <UserAcquiredProperty />
  </div>
</template>

<script>
import UserAcquiredProperty from '@/components/UserAcquiredPropertiesComponent.vue'
import { mapActions } from 'vuex';
export default {
  name: 'UserInterestedProperties',
  components: { 
    UserAcquiredProperty
  },
    methods: {
        ...mapActions(["postAUserLog"])
    },
    created(){
        this.$log.info('Accessing the user acquired properties page.')
        this.postAUserLog({
            activity: "Visited User Acquired Properties page",
            button_clicked: "User Acquired Properties page"
        });
    }
}
</script>