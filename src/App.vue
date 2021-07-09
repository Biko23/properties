<template>
  <v-app>
   

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  })
}
</script>
<style>
@font-face {
  font-family: "Avenir";
  src: local("Avenir"),   url(./fonts/AvenirLTStd-Book.otf) format("opentypefont");}
</style>
