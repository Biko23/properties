<template>
  <div>
      <UserInterestedProperty />
  </div>
</template>

<script>
import UserInterestedProperty from '@/components/UserInterestedPropertiesComponent.vue'
import { mapActions } from 'vuex';
export default {
  name: 'UserInterestedProperties',
  components: { 
    UserInterestedProperty
  },
    methods: {
        ...mapActions(["postAUserLog"])
    },
    created(){
        this.$log.info('Accessing the user interested properties page.')
        this.postAUserLog({
            activity: "Visited User Interested Properties page",
            button_clicked: "User Interested Properties page"
        });
    }
}
</script>