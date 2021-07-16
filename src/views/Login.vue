<template>
  <div>
    <top-nav />
    <v-container id="main-container" fluid>
      <v-row>
        <v-col>
          <h1 id="get-started">Welcome Back!</h1>
          <p id="login-into">Login into your account</p>
        </v-col>
        <v-col>
          <v-form id="form">
              <div >
                   <h3 style="color:#3b6ef3;margin-top:60px">Stanbic Properties</h3>
              </div>
           
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    label="Email or Contact"
                    placeholder="email or account"
                    solo
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    label="Password"
                    placeholder="password"
                    solo
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-btn color="primary" large block> Login </v-btn>
                </v-col>
              </v-row><br><br>
              <v-row>
                <v-divider></v-divider
                ><span style="margin-top: -10px">Or</span> <v-divider
                ></v-divider>
              </v-row>

              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-btn color="primary" block large> Google </v-btn>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-btn color="white" block large> Apple </v-btn>
                </v-col>
              </v-row><br>
              <p style="font-size:0.75rem">Have No Accont? <a href="/signup">Sign up</a></p><br><br>
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
  name: "Login",
  components: { TopNav },
};
</script>

<style scoped>
#main-container {
  background: url("../assets/login.png");
  height: 100vh;
  background-size: cover;
}
#get-started {
  color: #3b6ef3;
  text-align: center;
  font-weight: 500;
  margin-top: 170px;
  margin-left: 70px;
  margin-right: 70x;
}
#login-into{
    margin-top: 70px;
    text-align: center;
    margin-left: 90px;
}
#form {
  background-color: #e7f0ff;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  width: 450px; 
  border-radius: 6px;
  text-align: center;
}
</style>>

