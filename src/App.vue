<template>
  <v-app>
    <top-nav />
    <main-nav v-if="!shouldShowMainNav" />
    <v-main>
      <router-view />
    </v-main>
    <template v-if="!shouldHideAboutAndFooter">
      <about v-if="!shouldShowMainNav" />
      <Footer v-if="!shouldShowMainNav" />
    </template>
  </v-app>
</template>

<script>
import TopNav from "@/components/TopNav.vue";
import MainNav from "@/components/MainNav.vue";
import Footer from "@/components/Footer";
import About from "@/views/About.vue";
import { mapActions } from 'vuex';
export default {
  name: "App",
  components: {
    TopNav,
    MainNav,
    Footer,
    About,
  },
  methods: {
    ...mapActions(['autoLogin'])
  },
  computed: {
    shouldShowMainNav() {
      return this.$route.meta.hideForAuth == true;
    },
    shouldHideAboutAndFooter() {
      return this.$route.meta.hideFooterAndAbout == true;
    }
  },
  created(){
    this.autoLogin();
  }
};
</script>

<style>
@font-face {
  font-family: "Avenir";
  src: local("Avenir"), url(./fonts/AvenirLTStd-Book.otf) format("opentypefont");
}
</style>
