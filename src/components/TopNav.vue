<template>
  <div>
    <v-app-bar color="#3B6EF3" dense dark>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title
        class="toolbar-title"
        >Mon - Sat 8.00 - 18.00. Sunday CLOSED</v-toolbar-title
      >
      <a href="http://" class="about-us">About Us</a>

      <v-spacer></v-spacer>

      <v-toolbar-title
        class="telephone"
        >Tel No. (+256) 782-456-789</v-toolbar-title
      >
     <a href="http://" class="sign-in">Sign In</a>
     
    </v-app-bar>
  </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'

export default {
  name: "TopNav",
};
</script>
<style scoped>
.toolbar-title{
          font-size: 13px;
          font-style: normal;
          font-weight: 400;
          line-height: 18px;
          letter-spacing: 0em;
          text-align: left;
}
.about-us{
          font-size: 13px;
          font-style: normal;
          font-weight: 400;
          line-height: 18px;
          letter-spacing: 0em;
          text-align: left;
          color: white;
          text-decoration: none;
          display: none;
}
.telephone{
          font-size: 13px;
          font-style: normal;
          font-weight: 400;
          line-height: 18px;
          letter-spacing: 0em;
          text-align: left;
}
.sign-in{
          font-size: 13px;
          font-style: normal;
          font-weight: 400;
          line-height: 18px;
          letter-spacing: 0em;
          text-align: left;
          color: white;
          text-decoration: none;
          display: none;
}
@media only screen and (max-width: 768px) {
  .toolbar-title{
          display: none;
}
.about-us{
          font-size: 13px;
          font-style: normal;
          font-weight: 400;
          line-height: 18px;
          letter-spacing: 0em;
          text-align: left;
          color: white;
          text-decoration: none;
          display: block;
}
.telephone{
          font-size: 13px;
          font-style: normal;
          font-weight: 400;
          line-height: 18px;
          letter-spacing: 0em;
          text-align: center;
          margin-left: auto;
          margin-right: 65px;
}
.sign-in{
          font-size: 13px;
          font-style: normal;
          font-weight: 400;
          line-height: 18px;
          letter-spacing: 0em;
          text-align: left;
          color: white;
          text-decoration: none;
          display: block;
          
}
}
</style>
