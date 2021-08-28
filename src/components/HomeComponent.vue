<template>
<div>
    <!-- 
         <v-container id="container" fluid>
        <v-row >
            <v-col cols="12" sm="6" md="6" xs="12">
                <p id="intro">Are You looking for your dream house or property?</p>
            </v-col>
            <v-col cols="12" sm="6" md="6" xs="12" >

                        <input placeholder="Search Properties" v-model="keyword" />
                        <span style="margin-left: -50px; padding-top: 300px">
                            <button @click="searchProperties">
                                <img src="https://res.cloudinary.com/diued7ugb/image/upload/v1625824148/Vector_jyqs4g.svg" alt="" width="20" srcset="" style="margin-top: -12px; position: absolute" />
                            </button>
                        </span>
            </v-col>
        </v-row>
    </v-container>
     -->
    <v-container id="container" fluid>
        <div id="search-section">
            <div style="flex: 1">
                <p id="intro">Are You looking for your dream house or property?</p>

            </div>
            <div id="search-field" style="position: relative;">
                <v-autocomplete background-color="white" filled :outlined="true" append-icon="" :autofocus="true" cache-items auto-select-first placeholder="Search Properties" :items="allAutocompletedList" v-model="keyword" :search-input.sync="search" />
                <v-icon small class="mr-2" style="
                        font-size: 40px; 
                        color: blue; 
                        position: absolute;
                        right: 0;
                        top: 10%;
                        z-index: 50;
                    " @click.stop="searchProperties">
                    mdi-magnify
                </v-icon>
            </div>
        </div>
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
                    <div>
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
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" md="3" xs="12">
                <v-card max-width="auto" id="card">
                    <div style="border-bottom: 2px solid #3b6ef3; height: 50px">
                        <p style="padding-top:8px;">
                            <v-img style="margin-left: auto; margin-right: auto; display: block" max-height="47" max-width="45" src="https://res.cloudinary.com/diued7ugb/image/upload/v1625749472/Vector_1_lyvwc5.png"></v-img>
                        </p>
                    </div>
                    <!--  -->
                    <div>
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
                            <router-link to="/properties-for-rent">
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
                    </div>
                    <!--  -->
                </v-card>
            </v-col>
            <v-col cols="12" md="3" xs="12">
                <v-card max-width="auto" id="card">
                    <div style="border-bottom: 2px solid #3b6ef3; height: 50px">
                        <p style="padding-top:8px;">
                            <v-img style="margin-left: auto; margin-right: auto; display: block" lazy-src="https://picsum.photos/id/11/10/6" max-height="45" max-width="50" src="https://res.cloudinary.com/diued7ugb/image/upload/v1626937385/sell_black_24dp_1_hfrwt6.png"></v-img>
                        </p>
                    </div>
                    <div>
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
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" md="3" xs="12">
                <v-card max-width="auto" id="card">
                    <div style="border-bottom: 2px solid #3b6ef3; height: 50px">
                        <p style="padding-top:8px;">
                            <v-img style="margin-left: auto; margin-right: auto; display: block; " lazy-src="https://picsum.photos/id/11/10/6" max-height="45" max-width="45" src="https://res.cloudinary.com/diued7ugb/image/upload/v1626936488/Vector_7_oi79oa.png"></v-img>
                        </p>
                    </div>
                    <div>
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
                    </div>
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
                        <router-link to="/rental-requirement" class="property-link">List A Rental</router-link><br>
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
                        <template v-for="(category, index) in allVendorsCategories">
                            <router-link :to="`/provider/${category.value}`" :key="category.value" class="property-link">{{category.text}}</router-link>
                            <br :key="index + 10000000">
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
                <recent-properties-component :description="propertyVisual.description" :created_by="propertyVisual.created_by" :src="'http://localhost:8002/' + propertyVisual.snapshot" />
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
import {
    mapActions,
    mapGetters
} from 'vuex';
export default {
    name: "Home2",
    components: {
        RecentPropertiesComponent
    },
    data: () => ({
        keyword: '',
        search: null,
        searchKey: "",
        show: false,
        icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    }),
    methods: {
        ...mapActions([
            "fetchLatestPropertyVisuals",
            "fetchPropertiesBySearchKeyword",
            "loadSearchKeywordIntoGlobalState",
            "fetchAutoCompleteWords",
            "fetchPropertyCategories"
        ]),
        searchProperties() {
            if (this.search != null) {
                this.searchKey = this.search;
            } else {
                this.searchKey = this.keyword;
            }
            this.loadSearchKeywordIntoGlobalState(this.searchKey)
                .then(() => {
                    this.$router.push(`/search-result`);
                    this.keyword = "";
                    this.search = null;
                });
        },
        async fetchAutoCompleteWordsDelay(){
            try {
                await setTimeout(()=>{
                    this.fetchAutoCompleteWords();
                },500);
            } catch (error) {
                console.log(error);
            }
        }
    },
    computed: {
        ...mapGetters([
            "allLatestProperties",
            "iAmACertifiedSeller",
            "allVendorsCategories",
            "allAutocompletedList"
        ])
    },
    mounted() {
        this.fetchAutoCompleteWordsDelay();
    },
    created() {
        this.fetchPropertyCategories();
        this.fetchLatestPropertyVisuals();
    }
};
</script>

<style scoped>
/* isaac styles */
#search-section {
    display: flex;
    flex: 1;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
}

#search-field {
    flex: 1;
    display: flex;
    justify-content: flex-start;
}

/* end isaac styles */
.property-link {
    text-decoration: none;
    color: rgb(50, 50, 250);
    font-size: 14px;
    line-height: 2rem;
}

.property-link:hover {
    text-decoration: underline;
}

#input ::placeholder {
    color: #3b6ef3;
    font-size: 1rem;
    padding: 2px;
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
}

#input {
    margin-top: 180px;
    background-color: #f2f2f2;
    height: 50px;
    padding: 20px;
    width: 500px;
    border-radius: 6px;
}

#card {
    background-color: #f4f5f8;
}

#container {
    background-image: url("https://res.cloudinary.com/diued7ugb/image/upload/v1626688591/vj-von-art-BP1Ze0qcp-c-unsplash_tlgt7k.jpg");
    /* background-image: url("https://res.cloudinary.com/diued7ugb/image/upload/v1626688778/dillon-kydd-XGvwt544g8k-unsplash_lrvzid.jpg"); */
    background-size: cover;
    display: flex;
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

/* @media only screen and (min-width: 320px) {
        input {
        margin-top: 40px;
        background-color: #f2f2f2;
        height: 50px;
        width: auto;
        margin-left: auto;
        margin-right: auto;
        border-radius: 6px;
    }
}

@media only screen and (max-width: 414px) {
        input {
        margin-top: 40px;
        background-color: #f2f2f2;
        height: 50px;
        width: 350px;
        margin-left: auto;
        margin-right: auto;
        border-radius: 6px;
    }
} */

@media only screen and (max-width: 768px) {
    #container {
        display: flex;
        height: auto;
        width: auto;
    }

    #search-section {
        flex-direction: column;
    }

    #search-field {
        flex: 4;
    }

    #second-container {
        margin-top: auto;
    }

    .about-us-container {
        background-color: #ebeef2;
        height: auto;
    }

    #intro {
        font-size: 0.95rem;
    }

    #input {
        margin-top: 40px;
        background-color: #f2f2f2;
        height: 50px;
        width: 350px;

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

/* @media only screen and (max-width: 978px) {
    #container {

        height: auto;
        width: auto;
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
        width: 350px;

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
} */
</style>
