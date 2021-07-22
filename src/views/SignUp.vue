<template>
  <div>
    <top-nav />
    <v-container id="main-container" fluid>
      <v-row>
        <v-col cols="12" sm="12" md="6" lg="6">
             <router-link
            to="/"
            style="
              color: black;
              text-align: center;
              margin-top: 40px;
            
              text-decoration: none;
            "
          >
            <p class="back-home">
              <v-img
                style="margin-left: 100px; margin-right: auto; "
               
                max-height="20"
                max-width="25"
                src="https://res.cloudinary.com/diued7ugb/image/upload/v1626937941/Vector_9_aizknf.png"
              ></v-img
              ><span
                id="back-home"
              >
                Back home</span
              >
            </p>
          </router-link>
          <h1 id="get-started">Get ready to start buying and selling more!</h1>
          <p style="margin-left:100px;">Create an account</p>
        </v-col>
        <v-col>
          <v-form id="form">
             <div>
               <v-img
                  style="margin-left: 100px; margin-top: 10px;position:absolute;"
                  lazy-src="https://picsum.photos/id/11/10/6"
                  max-height="45"
                  max-width="45"
                  src="https://res.cloudinary.com/diued7ugb/image/upload/v1625749459/Vector_pebqf0.png"
                ></v-img>
              <span style="color: #3b6ef3; margin-top:23px;margin-left:-55px;position:absolute;">
                Stanbic Properties
              </span>
            </div><br><br>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    label="Full name"
                    placeholder="Enter your Full name"
                    solo
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    label="Email "
                    placeholder="Enter your email"
                    solo
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    label="Phone number"
                    placeholder="Enter yourPhone number"
                    solo
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    label="Password"
                    placeholder="Enter your password"
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
                  <v-btn color="#e7f0ff" block large>
                    <v-img
                      max-height="30"
                      max-width="20"
                      src="https://res.cloudinary.com/diued7ugb/image/upload/v1626938676/flat-color-icons_google_fsmdyf.png"
                    ></v-img>
                    <span style="padding-left: 5px"> Google</span>
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                <v-btn color="white" block large>
                    <v-img
                      max-height="34"
                      max-width="25"
                      src="https://res.cloudinary.com/diued7ugb/image/upload/v1626939162/Apple_logo_black.svg_rsk1qa.png"
                    >
                      
                    </v-img><span style="padding-left: 10px"></span>
                    Apple
                  </v-btn>
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
#back-home{
margin-left: -190px; margin-top: -20px; position: absolute
}
.back-home{
  margin-top: 40px;
}
@media only screen and (max-width: 768px) {
  #get-started {
  color: #3b6ef3;
  text-align: center;
  font-weight: 400;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
}
#back-home{
margin-left: -95px; margin-top: -20px; position: absolute
}
.back-home{
  margin-left: -70px;
}
#form {
  background-color: #e7f0ff;
  margin-left: auto;
  margin-right: auto;
  width: auto;
  border-radius: 6px;
  text-align: center;
}
}
</style>

