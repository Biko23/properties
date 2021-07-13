<template>
<div>
  <top-nav />
  <main-nav />
  <LearnComponent/>

</div>

</template>
<script>
import TopNav from '../components/TopNav.vue'
import MainNav from '../components/MainNav.vue'
import LearnComponent from '../components/LearnComponent.vue'

export default{
    name:'Learn',
    components:{
        TopNav,
        MainNav,
        LearnComponent
    }

}
</script>
