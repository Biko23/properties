<template>
<div>
    <top-nav />
    <main-nav />
    <v-container id="container" fluid>
        <v-carousel cycle hide-delimiter-background show-arrows-on-hover>
            <v-carousel-item v-for="(image,i) in images" :key="i" :src="image.src">
                <v-row class="fill-height" align="center" justify="center">
                    <div class="text-h4">
                        <p id="intro">{{image.title}}</p>
                        <p id="intro2">{{image.subTitle}}</p>
                    </div>
                </v-row>
            </v-carousel-item>
        </v-carousel>
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
                    <v-card-title>Stanbic Bank</v-card-title>
                    <v-card-subtitle>
                        It can be possible to start constructing your rentals or dream home with House Construction financing today
                        <!-- <br /> -->
                        <!-- <v-row row d-flex>
                            <v-text-field v-model="name" label="Address" required outlined></v-text-field>
                            <v-btn style="
                    background-color: #3b6ef3;
                    margin-top: 0.5em;
                    margin-left: 0.5em;
                  ">
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
                                    See Offer</span>
                            </v-btn>
                        </v-row> -->
                    </v-card-subtitle>
                    <v-card-subtitle class="loan-heading">MAXIMUM LOAN AMOUNT</v-card-subtitle>
                    <v-card-subtitle class="loan-subheading">UGX 1 Billion</v-card-subtitle>
                    <v-card-title class="loan-heading">MINIMUM AMOUNT AVAILABLE</v-card-title>
                    <v-card-subtitle class="loan-subheading">UGX 30 Million</v-card-subtitle>
                    <!-- <v-card-title class="loan-heading">FLEXIBLE REPAYMENT PERIODS</v-card-title>
                    <v-card-subtitle class="loan-subheading">20 years</v-card-subtitle> -->
                </div>
            </v-col>
            <v-col cols="12" md="5">
                <v-card class="mx-auto" max-width="auto">
                    <v-img src="../assets/construction.jpg" height="250px"></v-img>
                    <v-card-title class="text-h5" style="dsplay: inline; text-align: center; color: blue;">
                        House Construction Loan
                    </v-card-title>
                </v-card>
            </v-col>
            <v-col></v-col>
        </v-row><br /><br>

        <v-row>
            <v-col></v-col>
            <v-col cols="12" md="5">
                <v-card max-width="auto">
                    <v-img src="../assets/housepurchase.jpg" height="250px"></v-img>
                    <v-card-title class="text-h5" style="dsplay: inline; text-align: center; color: blue;">
                        House Purchase Loan
                    </v-card-title>
                </v-card>
            </v-col>
            <v-col cols="12" md="5" style="background-color: #f2f2f2">
                <div>
                    <v-card-title>Stanbic Bank</v-card-title>
                    <v-card-subtitle>
                        Are you are looking to buy a house or flat? Buy an existing house, condominium or apartment with this great mortgage solution. It can be possible to be a home owner at the best rates on the market. Get your property with reputable developers, with affordable insurance from our trusted partners.

                        <!-- <p style="text-align: center; margin-top: 1rem">
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
                                    Get a Broker</span>
                            </v-btn>
                        </p> -->
                    </v-card-subtitle>
                    <v-card-subtitle class="loan-heading">MAXIMUM LOAN AMOUNT</v-card-subtitle>
                    <v-card-subtitle class="loan-subheading">UGX 1 Billion</v-card-subtitle>
                    <v-card-title class="loan-heading">MINIMUM AMOUNT AVAILABLE</v-card-title>
                    <v-card-subtitle class="loan-subheading">UGX 30 Million</v-card-subtitle>
                </div>
            </v-col>
            <v-col></v-col>
        </v-row><br><br>

        <v-row><br />
            <v-col></v-col>
            <v-col cols="12" md="5" style="background-color: #f2f2f2">
                <div>
                    <v-card-title>Stanbic Bank</v-card-title>

                    <v-card-subtitle>
                        Do you need to complete your dream home? It Can Be possible to meet your goal.
                        <!-- <p style="text-align: center; margin-top: 1rem">
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
                                    Sell
                                </span>
                            </v-btn>
                        </p> -->
                    </v-card-subtitle>
                    <v-card-subtitle class="loan-heading">MAXIMUM LOAN AMOUNT</v-card-subtitle>
                    <v-card-subtitle class="loan-subheading">UGX 1 Billion</v-card-subtitle>
                    <v-card-title class="loan-heading">MINIMUM AMOUNT AVAILABLE</v-card-title>
                    <v-card-subtitle class="loan-subheading">UGX 30 Million</v-card-subtitle>
                </div>
            </v-col>
            <v-col cols="12" md="5">
                <v-card max-width="auto">
                    <v-img src="../assets/finish2.jpg" height="200px"></v-img>
                    <v-card-title class="text-h5" style="dsplay: inline; text-align: center; color: blue;">
                        House Completion Loan
                    </v-card-title>
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
    components: {
        Footer,
        TopNav,
        MainNav
    },
    name: "Mortgage",
    data() {
        return {
            images: [{
                    src: 'https://res.cloudinary.com/diued7ugb/image/upload/v1626688778/dillon-kydd-XGvwt544g8k-unsplash_lrvzid.jpg',
                    title: 'Financing your next home starts here.',
                    subTitle: 'Directly to us, through an agent, or yourself'
                },
                {
                    src: 'https://res.cloudinary.com/diued7ugb/image/upload/v1626688591/vj-von-art-BP1Ze0qcp-c-unsplash_tlgt7k.jpg',
                    title: 'Financing your next home starts here.',
                    subTitle: 'Directly to us, through an agent, or yourself'
                },
                {
                    src: 'https://res.cloudinary.com/diued7ugb/image/upload/v1626688778/dillon-kydd-XGvwt544g8k-unsplash_lrvzid.jpg',
                    title: 'Financing your next home starts here.',
                    subTitle: 'Directly to us, through an agent, or yourself'
                }
            ]
        }
    }
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

.loan-heading {
    font-size: 16px;
    font-weight: 500;
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 0;
    padding-bottom: 0;
}

.loan-subheading {
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 0;
    font-size: 16px;
}

#card {
    background-color: #f4f5f8;
}

#container {
    padding: 0;
    margin: 0 0 1rem 0;
    height: 75vh;
    width: 100%;
}

@media only screen and (max-width: 768px) {
    #container {
        height: auto;
        width: auto;
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
