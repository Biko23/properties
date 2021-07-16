<template>
  <div style="background-color: #e7f0ff">
    <top-nav />
    <main-nav />
    <v-container>
      <v-row>
        <v-col cols="12" sm="12" md="12" xl="12">
          <h3 id="welcome">
            Welcome to the largest, trusted property platform in <br />
            Uganda
          </h3>
          <p id="reach">
            Reach a million potential customers for your business or property.
          </p>
        </v-col>
      </v-row>
      <v-divider style="margin-top: 20px"></v-divider>
    </v-container>

    <v-container>
      <v-row>
        <v-col cols="12" sm="12" md="4" xl="4">
          <v-card class="mx-auto">
            <v-img
              class="white--text align-end"
              height="200px"
              src="../assets/houseview1.png"
            >
            </v-img
            ><br />
            <h3 style="text-align: center">I'm a broker</h3>
            <div style="text-align: center">
              <v-btn color="primary">Get started</v-btn><br><br>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" sm="12" md="4" xl="4">
          <v-card class="mx-auto">
            <v-img
              class="white--text align-end"
              height="200px"
              src="../assets/houseview2.png"
            >
            </v-img>
            <br />
            <h3 style="text-align: center">I'm a broker</h3>
            <div style="text-align: center">
              <v-btn color="primary">Get started</v-btn><br><br>
            </div>
     
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="4" xl="4">
          <v-card>
            <v-img
              class="white--text align-end"
              height="200px"
              src="../assets/houseview3.png"
            >
            </v-img>
            <br />
            <h3 style="text-align: center">I'm a broker</h3>
            <div style="text-align: center">
              <v-btn color="primary">Get started</v-btn><br><br>
            </div>
     
          </v-card>
        </v-col>
      </v-row>
      <v-row>
          <v-col cols="12" sm="12" md="4" xl="4">
          <v-card class="mx-auto">
            <v-img
              class="white--text align-end"
              height="200px"
              src="../assets/houseview3.png"
            >
            </v-img
            ><br />
            <h3 style="text-align: center">I'm a broker</h3>
            <div style="text-align: center">
              <v-btn color="primary">Get started</v-btn><br><br>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" sm="12" md="4" xl="4">
          <v-card class="mx-auto">
            <v-img
              class="white--text align-end"
              height="200px"
              src="../assets/houseview1.png"
            >
            </v-img>
            <br />
            <h3 style="text-align: center">I'm a broker</h3>
            <div style="text-align: center">
              <v-btn color="primary">Get started</v-btn><br><br>
            </div>
     
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="4" xl="4">
          <v-card>
            <v-img
              class="white--text align-end"
              height="200px"
              src="../assets/houseview2.png"
            >
            </v-img>
            <br />
            <h3 style="text-align: center">I'm a broker</h3>
            <div style="text-align: center">
              <v-btn color="primary">Get started</v-btn><br><br>
            </div>
     
          </v-card>
        </v-col>
      </v-row>
    </v-container>
   <footer />
   <h3></h3>
  </div>
</template>

<script>
import BottonNav from '../components/BottonNav.vue';
import Footer from '../components/Footer.vue';
import MainNav from "../components/MainNav.vue";
import TopNav from "../components/TopNav.vue";
export default {
  components: { TopNav, MainNav, BottonNav, Footer },
  name: "GetStarted",
};
</script>

<style scoped>
#welcome {
  color: #3b6ef3;
  text-align: center;
  font-size: 2rem;
  margin-left: 100px;
  margin-right: 100px;
  margin-top: 50px;
}
#reach {
  text-align: center;
  font-size: 0.9rem;
  margin-top: 30px;
}
</style>