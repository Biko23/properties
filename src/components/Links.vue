<template>
  <v-list-item link :to="link">
    <v-list-item-title> {{title}} </v-list-item-title>
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

