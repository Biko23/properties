<template>
<div>
  <PropertiesForSaleComponent/>
</div>
</template>

<script>
import PropertiesForSaleComponent from '../components/PropertiesForSaleComponent.vue'
import { mapActions } from 'vuex';

export default {
  name: 'Property',

  components: {
    PropertiesForSaleComponent
  },
    methods: {
        ...mapActions(["postAUserLog"])
    },
    created(){
        this.$log.info('Accessing the properties for sale page.')
        this.postAUserLog({
            activity: "Visited Property Sales page",
            button_clicked: "Property Sales Page"
        });
    }
}
</script>
