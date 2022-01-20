<template>
<div>
  <PropertyForRentComponent />
</div>
</template>

<script>
import PropertyForRentComponent from '@/components/PropertyForRentComponent'
import { mapActions } from 'vuex';

export default {
  name: 'PropertiesForRent',

  components: {
    PropertyForRentComponent
  },
    methods: {
        ...mapActions(["postAUserLog"])
    },
    created(){
        this.postAUserLog({
            activity: "Visited Rentals page",
            button_clicked: "Rentals Page"
        });
    }
}
</script>
