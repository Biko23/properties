<template>
  <v-list-item link :to="link">
    <v-list-item-title id="link-title"> {{title}} </v-list-item-title>
  </v-list-item>
</template>

<script>

export default {
  name: "Links",
  props: {
    link: {
      type: String,
      default: "/register",
    },
    title: {
      type: String,
      default: "Link title",
    },
  },
 
};
</script>
<style scoped>
  #link-title{
    color: rgb(50, 50, 250);
    font-size: 14px;
  }
  #link-title:hover{
    text-decoration: underline;
  }
</style>

