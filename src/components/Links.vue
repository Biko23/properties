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

<style scoped>
.time {
  position: absolute;
  z-index: 10;
  top: 10;
  font-weight: bold;
  color: #000000;
  padding: 5px;
  background-color: #ffffff;
  display: inline-block;
}
</style>
