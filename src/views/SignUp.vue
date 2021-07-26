<template>
  <div>
    <top-nav />
    <v-container id="main-container" fluid>
      <v-row>
        <v-col>
          <a href="/" style="color:black;text-align:center;margin-top:140px;margin-left:100px;text-decoration:none;">Back home</a>
          <h1 id="get-started">Get ready to start buying and selling more!</h1>
          <p style="margin-left:100px;">Create an account</p>
        </v-col>
        <v-col>
          <v-form id="form">
            <h3>Stanbic Properties</h3>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    label="Full name"
                    placeholder="Placeholder"
                    solo
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    label="Full name"
                    placeholder="Placeholder"
                    solo
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    label="Full name"
                    placeholder="Placeholder"
                    solo
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    label="Full name"
                    placeholder="Placeholder"
                    solo
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-btn color="primary" block> Sign Up </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-divider></v-divider
                ><span style="margin-top: -10px">Or</span> <v-divider
                ></v-divider>
              </v-row>

              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-btn color="primary" block> Google </v-btn>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-btn color="primary" block> Apple </v-btn>
                </v-col>
              </v-row><br>
              <p style="font-size:0.75rem">Have an Accont? 
              <router-link to="/login">Login</router-link>
              </p>
            </v-container>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import TopNav from "../components/TopNav.vue";

export default {
  name: "SignUp",
  components: { TopNav },
};
</script>

<style scoped>
#main-container {
  background: url("../assets/signup.png");
  height: 100vh;
  background-size: cover;
}
#get-started {
  color: #3b6ef3;
  text-align: center;
  font-weight: 400;
  margin-top: 30px;
  margin-left: 70px;
  margin-right: 70x;
}
#form {
  background-color: #e7f0ff;
  margin-left: auto;
  margin-right: auto;
  width: 400px;
  border-radius: 6px;
  text-align: center;
}
</style>

