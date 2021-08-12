<template>
  <div>
    <v-container id="container" fluid>
      <p id="intro">With us you can sell your home with no fear</p>
      <p id="intro2">Directly to us, through an agent, or yourself</p>
    </v-container>
    <br />
    <div style="text-align: center; margin-top: 15px">
      <h3><span style="color: #3b6ef3"> LET'S </span>GUIDE YOU</h3>
    </div>
    <v-container>
      <v-row>
        <v-col></v-col>
        <v-col cols="12" md="5" style="background-color: #f2f2f2">
          <div>
            <v-card-title>Sell your home directly to us </v-card-title>

            <v-card-subtitle>
              Getting a competitive cash offer from Stanbic Properties is an
              easy path to sell your home, with more control and less prepwork.
              You sell your home as-is and get paid with no surprises, while we
              take care of the rest.
              <h4>Ask how much we can pay</h4>
              <br />
              <v-row>
                <v-col cols="12" sm="12">
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                      v-model="name"
                      :rules="nameRules"
                      label="From"
                      required
                      solo
                    ></v-text-field>

                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="To"
                      required
                      solo
                    ></v-text-field>

                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="Property Details"
                      required
                      solo
                    ></v-text-field>
                    <v-btn color="primary" class="mr-4" @click="reset">
                      Submit
                    </v-btn>
                  </v-form>
                </v-col>
              </v-row>
            </v-card-subtitle>
          </div>
        </v-col>
        <v-col cols="12" md="5">
          <v-card max-width="auto">
            <v-img
              src="../assets/finishhouse.jpg"
              height="500px"
            ></v-img>
          </v-card>
        </v-col>
        <v-col></v-col> </v-row
      ><br /><br />

      <v-row>
        <v-col></v-col>
        <v-col cols="12" md="5">
          <v-card max-width="auto">
            <v-img
              src="../assets/broker.jpg"
              height="300px"
            ></v-img>
          </v-card>
        </v-col>
        <v-col cols="12" md="5" style="background-color: #f2f2f2">
          <div>
            <v-card-title> Sell your home via a Broker </v-card-title>

            <v-card-subtitle style="margin:auto; padding:10px;">
              When you work with a real estate agent, you'll get selling support
              at every step, from prepping and listing your home to marketing
              that gets buyers in the door.

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
        <v-col></v-col> </v-row
      ><br /><br />

      <v-row
        ><br />
        <v-col></v-col>
        <v-col cols="12" md="5" style="background-color: #f2f2f2">
          <div>
            <v-card-title> Sell your home yourself</v-card-title>

            <v-card-subtitle style="margin:auto; padding:10px;">
              Sell your home yourself Deciding to sell your home yourself is
              referred to as for-sale-by-owner (FSBO). The FSBO process is
              similar to traditional selling, but without the help of a real
              estate agent. In this case, you’re responsible for the home prep,
              marketing, showings, and negotiations.
              <p style="text-align: center; ">
                <v-btn style="background-color: #3b6ef3;  width:100px">
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
              src="../assets/landlord.jpg"
              height="300px"
            ></v-img>
          </v-card>
        </v-col>
        <v-col></v-col>
      </v-row>
    </v-container><br>
    <Footer />
  </div>
</template>
<script>
import Footer from "./Footer.vue";
export default {
  components: { Footer },
  name: "LearnComponent",
};
</script>
<style scoped>
#intro {
  color: #ffffff;
  font-size: 1.5rem;
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