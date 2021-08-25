<template>
<div>
    <v-container id="container" fluid>
        <v-row no-gutters>
            <v-col cols="12" md="6" xs="12">
                <p id="intro">Are You looking for your dream house or property?</p>
            </v-col>
            <v-col cols="12" md="6" xs="12">
                <!-- <form action=""> -->
                    <div>
                        <input placeholder="Search Properties" v-model="keyword" />
                        <span style="margin-left: -50px; padding-top: 300px">
                            <button @click="searchProperties">
                                <img src="https://res.cloudinary.com/diued7ugb/image/upload/v1625824148/Vector_jyqs4g.svg" alt="" width="20" srcset="" style="margin-top: -12px; position: absolute" />
                            </button>
                        </span>
                    </div>
                <!-- </form> -->
            </v-col>
        </v-row>
    </v-container>

    <v-container id="second-container">
        <v-row>
            <v-col cols="12" md="3" xs="12">
                <v-card max-width="auto" id="card">
                    <div style="
                border-bottom: 2px solid #3b6ef3;
                height: 50px;
                text-align: center;
              ">
                        <div style="padding-top:5px;">
                            <v-img style="margin-left: auto; margin-right: auto; display: block" lazy-src="https://picsum.photos/id/11/10/6" max-height="45" max-width="45" src="https://res.cloudinary.com/diued7ugb/image/upload/v1625749459/Vector_pebqf0.png"></v-img>
                        </div>
                    </div>
                    <v-text>
                        <h3 style="color: #3b6ef3; text-align: center; font-weight: 500">
                            BUY
                        </h3>
                        <p style="
                  font-size: 0.9rem;
                  font-style: normal;
                  font-weight: 300;
                  line-height: 20px;
                  letter-spacing: 0em;
                  text-align: center;
                  margin-left: 5px;
                  margin-right: 5px;
                ">
                            Are you looking for a modern, standout yet affordable home or
                            house to buy for yourself? We have gotten a variety of what you
                            need within and around Kampala.
                        </p>
                        <p style="text-align: center">
                          <router-link to="/properties-for-sale">
                            <v-btn style="background-color: #3b6ef3">
                                <span style="
                      color: #ffffff;
                      font-size: 20px;
                      font-style: normal;
                      font-weight: 300;
                      line-height: 30px;
                      letter-spacing: 0em;
                      text-align: center;
                      text-transform: capitalize;
                    ">
                                    Find More</span>
                            </v-btn>
                          </router-link>
                        </p>
                        <br />
                    </v-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="3" xs="12">
                <v-card max-width="auto" id="card">
                    <div style="border-bottom: 2px solid #3b6ef3; height: 50px">
                        <p style="padding-top:8px;">
                            <v-img style="margin-left: auto; margin-right: auto; display: block" max-height="47" max-width="45" src="https://res.cloudinary.com/diued7ugb/image/upload/v1625749472/Vector_1_lyvwc5.png"></v-img>
                        </p>
                    </div>
                    <v-text>
                        <h3 style="color: #3b6ef3; text-align: center; font-weight: 500">
                            RENT
                        </h3>
                        <p style="
                  font-size: 0.9rem;
                  font-style: normal;
                  font-weight: 300;
                  line-height: 20px;
                  letter-spacing: 0em;
                  text-align: center;
                  margin-left: 5px;
                  margin-right: 5px;
                ">
                            We have gotten for you the best rental houses and homes around.
                            With a number of appproved brokers and properties your rest
                            assured to get the best.
                        </p>
                        <p style="text-align: center">
                            <router-link to="/property">
                                <v-btn style="background-color: #3b6ef3">
                                    <span style="
                        color: #ffffff;
                        font-size: 20px;
                        font-style: normal;
                        font-weight: 300;
                        line-height: 30px;
                        letter-spacing: 0em;
                        text-align: center;
                        text-transform: capitalize;
                      ">
                                        Rent Now</span>
                                </v-btn>
                            </router-link>
                        </p>
                        <br />
                    </v-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="3" xs="12">
                <v-card max-width="auto" id="card">
                    <div style="border-bottom: 2px solid #3b6ef3; height: 50px">
                        <p style="padding-top:8px;">
                            <v-img style="margin-left: auto; margin-right: auto; display: block" lazy-src="https://picsum.photos/id/11/10/6" max-height="45" max-width="50" src="https://res.cloudinary.com/diued7ugb/image/upload/v1626937385/sell_black_24dp_1_hfrwt6.png"></v-img>
                        </p>
                    </div>
                    <v-text>
                        <h3 style="color: #3b6ef3; text-align: center; font-weight: 500">
                            SELL
                        </h3>
                        <p style="
                  font-size: 14px;
                  font-style: normal;
                  font-weight: 300;
                  line-height: 20px;
                  letter-spacing: 0em;
                  text-align: center;
                  margin-left: 5px;
                  margin-right: 5px;
                ">
                            Finding the right buyer for your property can sometimes be
                            tricky. With us, you can sell your property directly to us,
                            yourself or via a broker. Whatever option works for you, we have
                            got you covered.
                        </p>
                        <p style="text-align:center;">
                            <router-link to="/property-requirement">
                                <v-btn style="background-color: #3b6ef3">
                                    <span style="
                        color: #ffffff;
                        font-size: 20px;
                        font-style: normal;
                        font-weight: 300;
                        line-height: 30px;
                        letter-spacing: 0em;
                        text-align: center;
                        text-transform: capitalize;
                      ">
                                        Sell</span>
                                </v-btn>
                            </router-link>
                        </p>
                        <br />
                    </v-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="3" xs="12">
                <v-card max-width="auto" id="card">
                    <div style="border-bottom: 2px solid #3b6ef3; height: 50px">
                        <p style="padding-top:8px;">
                            <v-img style="margin-left: auto; margin-right: auto; display: block; " lazy-src="https://picsum.photos/id/11/10/6" max-height="45" max-width="45" src="https://res.cloudinary.com/diued7ugb/image/upload/v1626936488/Vector_7_oi79oa.png"></v-img>
                        </p>
                    </div>
                    <v-text>
                        <h3 style="color: #3b6ef3; text-align: center; font-weight: 500">
                            MORTGAGE
                        </h3>
                        <p style="
                  font-size: 0.9rem;
                  font-style: normal;
                  font-weight: 300;
                  line-height: 20px;
                  letter-spacing: 0em;
                  text-align: center;
                  margin-left: 5px;
                  margin-right: 5px;
                ">
                            Do you need a loan to service, purchase, or mantain your
                            property? At affordable rates we can help you make your dream
                            come true. You are just a few steps away from achieving this.
                        </p>
                        <p style="text-align: center">
                          <router-link to="/mortgage">
                            <v-btn style="background-color: #3b6ef3">
                                <span style="
                      color: #ffffff;
                      font-size: 20px;
                      font-style: normal;
                      font-weight: 300;
                      line-height: 30px;
                      letter-spacing: 0em;
                      text-align: center;
                      text-transform: capitalize;
                    ">
                                    Get Mortgage</span>
                            </v-btn>
                          </router-link>
                        </p>
                        <br />
                    </v-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container><br />

    <v-divider></v-divider>
    <v-container>
        <v-row>
            <v-col>
                <v-card-actions>
                    <v-btn color="#3b6ef3" text> Buy </v-btn>
                    <v-btn icon @click="show = !show">
                        <v-icon>{{
                show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
                    </v-btn>
                </v-card-actions>

                <v-expand-transition>
                    <div v-show="show">
                        <v-divider></v-divider>
                        <router-link to="/properties-for-sale" class="property-link">Properties for sale</router-link>
                    </div>
                </v-expand-transition>
            </v-col>

            <v-col>
                <v-card-actions>
                    <v-btn color="#3b6ef3" text> Rent </v-btn>
                    <v-btn icon @click="show = !show">
                        <v-icon>{{
                show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
                    </v-btn>
                </v-card-actions>

                <v-expand-transition>
                    <div v-show="show">
                        <v-divider></v-divider>
                        <router-link to="/properties-for-rent" class="property-link">Houses for Rent</router-link><br>
                        <router-link to="/register" class="property-link">List A Rental</router-link><br>
                        <router-link to="/property-details" v-if="iAmACertifiedSeller" class="property-link">Property Details</router-link>
                    </div>
                </v-expand-transition>
            </v-col>

            <v-col>
                <v-card-actions>
                    <v-btn color="#3b6ef3" text> Sell </v-btn>
                    <v-btn icon @click="show = !show">
                        <v-icon>{{
                show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
                    </v-btn>
                </v-card-actions>

                <v-expand-transition>
                    <div v-show="show">
                        <v-divider></v-divider>
                        <router-link to="/property-requirement" class="property-link">Sell A Property</router-link><br>
                        <router-link to="/learn" class="property-link">Seller's guide</router-link><br>
                        <router-link v-if="iAmACertifiedSeller" to="/property-details" class="property-link">Property Details</router-link>
                    </div>
                </v-expand-transition>
            </v-col>

            <v-col>
                <v-card-actions>
                    <v-btn color="#3b6ef3" text> Home Loan </v-btn>
                    <v-btn icon @click="show = !show">
                        <v-icon>{{
                show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
                    </v-btn>
                </v-card-actions>

                <v-expand-transition>
                    <div v-show="show">
                        <v-divider></v-divider>
                        <router-link to="/mortgage" class="property-link">Mortgage Lenders</router-link><br>
                        <router-link to="/mortgage-rates" class="property-link">Mortgage Rates</router-link>
                    </div>
                </v-expand-transition>
            </v-col>
            <v-col>
                <v-card-actions>
                    <v-btn color="#3b6ef3" text> Service Providers </v-btn>
                    <v-btn icon @click="show = !show">
                        <v-icon>{{
                show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
                    </v-btn>
                </v-card-actions>

                <v-expand-transition>
                    <div v-show="show">
                        <v-divider></v-divider>
                        <template v-for="category in allVendorsCategories">
                        <router-link 
                            :to="`/provider/${category.value}`" 
                            :key="category.value" 
                            class="property-link"
                        >{{category.text}}</router-link>
                        <br :key="category.value">
                        </template>
                    </div>
                </v-expand-transition>
            </v-col>
        </v-row>
    </v-container>

    <v-divider></v-divider><br />

    <div style="text-align: center; margin-top: 15px">
        <h3><span style="color: #3b6ef3"> RECENT </span>PROPERTIES</h3>
    </div>

    <v-container>
        <v-row style="display: flex; flex-direction: row; justify-content: space-evenly;">
           <v-col cols="12" md="3" xs="12" v-for="propertyVisual in allLatestProperties" :key="propertyVisual.visuals_id">
                <recent-properties-component
                    :description="propertyVisual.description"
                    :created_by="propertyVisual.created_by"
                    :src="'http://localhost:8002/' + propertyVisual.snapshot"
                />
            </v-col>
           
            <!-- <v-col cols="12" md="3" xs="12">
                <v-card max-width="auto">
                    <v-img src="https://res.cloudinary.com/diued7ugb/image/upload/v1625732723/house1_svrut7.jpg" height="200px"></v-img>

                    <v-card-title style="color: #3b6ef3"> Luxury Villas </v-card-title>

                    <v-card-subtitle>
                        Luxurious and upgraded, this 4 bedroom, 4.5 bathroom home of 5,281
                        sq. ft. (including poolhouse, per independent third-party
                        measurement) rests on a lot of 1.23 acres (per county) on a
                        peaceful cul-de-sac in the Lakeside neighborhood.
                    </v-card-subtitle>
                </v-card>
            </v-col> -->
        </v-row>
    </v-container>
</div>
</template>

<script>
import RecentPropertiesComponent from './RecentPropertiesComponent'
import { mapActions, mapGetters } from 'vuex';
export default {
    name: "Home2",
    components: {
      RecentPropertiesComponent
    },
    data: () => ({
        keyword: '',
        show: false,
        icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    }),
    methods: {
        ...mapActions(["fetchLatestPropertyVisuals", "fetchPropertiesBySearchKeyword", "loadSearchKeywordIntoGlobalState"]),
        searchProperties(){
            this.loadSearchKeywordIntoGlobalState(this.keyword)
                .then(()=> this.$router.push(`/search-result`));
        }
    },
    computed: {
        ...mapGetters(["allLatestProperties", "iAmACertifiedSeller", "allVendorsCategories"])
    },
    created(){
        this.fetchLatestPropertyVisuals();
    }
};
</script>

<style scoped>
.property-link {
    text-decoration: none;
    color: rgb(50, 50, 250);
    font-size: 14px;
    line-height: 2rem;
}

.property-link:hover {
    text-decoration: underline;
}

::placeholder {
    color: #3b6ef3;
    font-size: 1rem;
    padding: 30px;
    font-weight: 250;
}

.text-field {
    color: #90c143 !important;
}

#intro {
    color: #ffffff;
    font-size: 1.5rem;
    font-weight: 400;
    text-align: center;
    margin-top: 180px;
}

input {
    margin-top: 180px;
    background-color: #f2f2f2;
    height: 50px;
    padding: 20px;
    width: 500px;
    border-radius: 6px;
}

input:focus { 
    outline: none !important;
    border-color: #1261b6;
    border: 2px solid #0f6ed4;
    box-shadow: 0 0 50px #0f6ed4;
}
textarea:focus { 
    outline: none !important;
    border-color: #0a56a7;
    border: 2px solid #0f6ed4;
    box-shadow: 0 0 40px #0b59ac;
}

#card {
    background-color: #f4f5f8;
}

#container {
    background-image: url("https://res.cloudinary.com/diued7ugb/image/upload/v1626688591/vj-von-art-BP1Ze0qcp-c-unsplash_tlgt7k.jpg");
    /* background-image: url("https://res.cloudinary.com/diued7ugb/image/upload/v1626688778/dillon-kydd-XGvwt544g8k-unsplash_lrvzid.jpg"); */
    background-size: cover;
    height: 75vh;
    width: 100%;
}

#second-container {
    margin-top: -50px;
    z-index: 10;
}

.about-us-container {
    background-color: #f4f5f8;
    height: 310px;
}

@media only screen and (max-width: 768px) {
    #container {

        height: 30vh;
        width: 100%;
    }

    #second-container {
        margin-top: auto;
    }

    .about-us-container {
        background-color: #ebeef2;
        height: auto;
    }

    #intro {
        color: #ffffff;
        font-size: 0.95rem;
        font-weight: 400;
        text-align: center;
        margin-top: auto;
    }

    input {
        margin-top: 40px;
        background-color: #f2f2f2;
        height: 50px;
        width: 320px;
        margin-left: auto;
        border-radius: 6px;
    }

    ::placeholder {
        color: #3b6ef3;
        font-size: 0.9rem;
        font-weight: 500;
        padding: 10px;
    }

    #col-hiden {
        display: none;
    }
}
@media only screen and (max-width: 1080px) {

}
</style>
