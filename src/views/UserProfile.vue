<template>
  <div>
    <top-nav />
    <main-nav />
    <v-container>
      <v-row>
        <v-col cols="12" sm="12" md="12" xl="12">
          <h3 style="text-align:center;margin-top:20px;">Your profile</h3>
          <v-form id="form" style="background-color: #e7f0ff">
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <p>Full name</p>
                  <v-text-field
                    label="Full name"
                    placeholder="Enter your full name"
                    solo
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <p>Username:</p>
                  <v-text-field
                    label="Username"
                    placeholder="Placeholder"
                    solo
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <p>Photo</p>
                  <v-text-field solo style="width:60px; border-radius:80%"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <h1>Security information</h1>
                  <p>Email</p>
                  <v-text-field
                    label="Email "
                    placeholder="forexample@gmail.com"
                    solo
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <p>2 step verification</p>
                  <v-text-field
                    label="Email "
                    placeholder="forexample@gmail.com"
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
                ><span style="margin-top: -10px">Or</span>
                <v-divider></v-divider>
              </v-row>

              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-btn color="primary" block> Google </v-btn>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-btn color="primary" block> Apple </v-btn>
                </v-col> </v-row
              ><br />
              <p style="font-size: 0.75rem">
                Have an Accont? <a href="/login">Login</a>
              </p>
            </v-container>
          </v-form>
        </v-col>
      </v-row>
    </v-container>

    <footer />
    <h3></h3>
  </div>
</template>

<script>
import BottonNav from "../components/BottonNav.vue";
import Footer from "../components/Footer.vue";
import MainNav from "../components/MainNav.vue";
import TopNav from "../components/TopNav.vue";
export default {
  components: { TopNav, MainNav, BottonNav, Footer },
  name: "UserProfile",
};
</script>

<style scoped>
#form {
  background-color: #e7f0ff;
  margin-left: auto;
  margin-right: auto;
  width: 900px;
  border-radius: 6px;
 
}
#reach {
  text-align: center;
  font-size: 0.9rem;
  margin-top: 30px;
}
</style>