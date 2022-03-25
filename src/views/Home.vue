<template>
<div>
    <home-component />
</div>
</template>

<script>
import { mapActions } from 'vuex'
import HomeComponent from '../components/HomeComponent.vue'


export default {
    name: 'Home',
    components: {
        HomeComponent
    },
    methods: {
        ...mapActions(["postAUserLog"])
    },
    created(){
        this.$log.info('Accessed Home page.')
         this.postAUserLog({
            activity: "Visited Home page",
            button_clicked: "Visited Home Page"
        });
    }
}
</script>
