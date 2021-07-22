<template>
  <div>
      <top-nav />
      <main-nav />
    <v-container id="container" fluid>
      <p id="intro">Financing your next home starts here</p>
      <p id="intro2">Directly to us, through an agent, or yourself</p>
    </v-container>
    <br />
    <div style="text-align: center; margin-top: 15px">
      <h3><span style="color: #3b6ef3"> HOW </span>IT WORKS</h3>
    </div>
    <v-container>
      <v-row>
        <v-col></v-col>
        <v-col cols="12" md="5" style="background-color: #f2f2f2">
          <div>
            <v-card-title>Sell your home directly to us </v-card-title>

            <v-card-subtitle>
              I'm a thing. But, like most politicians, he promised more than he
              could deliver. You won't have time for sleeping, soldier, not with
              all the bed making you'll be doing.
              <h4>See how much we can pay</h4>
              <br />
              <v-row row d-flex>
                <v-text-field
                  v-model="name"
                  label="Address"
                  required
                  outlined
                ></v-text-field>
                <v-btn
                  style="
                    background-color: #3b6ef3;
                    margin-top: 0.5em;
                    margin-left: 0.5em;
                  "
                >
                  <span
                    style="
                      color: #ffffff;
                      font-size: 20px;
                      font-style: normal;
                      font-weight: 300;
                      line-height: 30px;
                      letter-spacing: 0em;
                      text-align: center;
                      text-transform: capitalize;
                    "
                  >
                    See Offer</span
                  >
                </v-btn>
              </v-row>
            </v-card-subtitle>
          </div>
        </v-col>
        <v-col cols="12" md="5">
          <v-card max-width="auto">
            <v-img
              src="https://res.cloudinary.com/diued7ugb/image/upload/v1625732723/house1_svrut7.jpg"
              height="200px"
            ></v-img>
          </v-card>
        </v-col>
        <v-col></v-col> </v-row
      ><br /><br>

      <v-row>
        <v-col></v-col>
        <v-col cols="12" md="5">
          <v-card max-width="auto">
            <v-img
              src="https://res.cloudinary.com/diued7ugb/image/upload/v1625732723/house1_svrut7.jpg"
              height="200px"
            ></v-img>
          </v-card>
        </v-col>
        <v-col cols="12" md="5" style="background-color: #f2f2f2">
          <div>
            <v-card-title> Sell your home via a Broker </v-card-title>

            <v-card-subtitle>
              I'm a thing. But, like most politicians, he promised more than he
              could deliver. You won't have time for sleeping, soldier, not with
              all the bed making you'll be doing.

              <p style="text-align: center; margin-top: 1rem">
                <v-btn style="background-color: #3b6ef3">
                  <span
                    style="
                      color: #ffffff;
                      font-size: 20px;
                      font-style: normal;
                      font-weight: 300;
                      line-height: 30px;
                      letter-spacing: 0em;
                      text-align: center;
                      text-transform: capitalize;
                    "
                  >
                    Get a Broker</span
                  >
                </v-btn>
              </p>
            </v-card-subtitle>
          </div>
        </v-col>
        <v-col></v-col>
      </v-row><br><br>

      <v-row
        ><br />
        <v-col></v-col>
        <v-col cols="12" md="5" style="background-color: #f2f2f2">
          <div>
            <v-card-title> Sell your home yourself</v-card-title>

            <v-card-subtitle>
              I'm a thing. But, like most politicians, he promised more than he
              could deliver. You won't have time for sleeping, soldier, not with
              all the bed making you'll be doing.
              <p style="text-align: center; margin-top: 1rem">
                <v-btn style="background-color: #3b6ef3">
                  <span
                    style="
                      color: #ffffff;
                      font-size: 20px;
                      font-style: normal;
                      font-weight: 300;
                      line-height: 30px;
                      letter-spacing: 0em;
                      text-align: center;
                      text-transform: capitalize;
                    "
                  >
                    Sell
                  </span>
                </v-btn>
              </p>
            </v-card-subtitle>
          </div>
        </v-col>
        <v-col cols="12" md="5">
          <v-card max-width="auto">
            <v-img
              src="https://res.cloudinary.com/diued7ugb/image/upload/v1625732723/house1_svrut7.jpg"
              height="200px"
            ></v-img>
          </v-card>
        </v-col>
        <v-col></v-col>
      </v-row>
    </v-container>
    <Footer />
  </div>
</template>
<script>
import Footer from "../components/Footer";
import MainNav from '../components/MainNav.vue';
import TopNav from '../components/TopNav.vue';
export default {
  components: { Footer,TopNav, MainNav },
  name: "Mortgage",
};
</script>
<style scoped>
#intro {
  color: #ffffff;
  font-size: 2rem;
  font-weight: 400;
  text-align: center;
  margin-top: 180px;
}
#intro2 {
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 400;
  text-align: center;
}
#card {
  background-color: #f4f5f8;
}
#container {
  background-image: url("https://res.cloudinary.com/diued7ugb/image/upload/v1626688778/dillon-kydd-XGvwt544g8k-unsplash_lrvzid.jpg");
  background-size: cover;
  height: 75vh;
  width: 100%;
}

@media only screen and (max-width: 768px) {
  #container {
    height: 30vh;
    width: 100%;
  }
  #intro {
    color: #ffffff;
    font-size: 1rem;
    font-weight: 400;
    text-align: center;
    margin-top: auto;
  }
  #intro2 {
    color: #ffffff;
    font-size: 0.8rem;
    font-weight: 400;
    text-align: center;
  }
  #col-hiden {
    display: none;
  }
}
</style>