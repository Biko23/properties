<template>
<div>
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
        <h3><span style="color: #3b6ef3">YOUR</span> DREAM HOME</h3>
    </div>
    <v-container>
        <div style="margin-bottom: 10px;">
            <h3 style="font-weight: 300; font-size: 20px;">PROPERTY, HOME LOANS AND MORTGAGES</h3>
        </div>
        <v-row style="justify-content: center;">
            <v-col cols="12" md="6" class="mb-5">
                <v-card class="mx-auto" max-width="600">
                    <v-card-title style="font-weight: 300; margin-bottom: 10px;" class="text-h4">House Completion Loan</v-card-title>
                    <v-card-subtitle class="text--primary">
                        Do you need to complete your dream home? It Can Be possible to meet your goal.
                    </v-card-subtitle>

                    <v-row>
                        <v-col cols="12" md="6" sm="12">
                            <v-card-text class="text--primary" style="margin-top: 10px;">
                                <div style="font-size: 40px; font-weight: 300;">20 years</div><br>
                                <div style="font-size: 12px;">FLEXIBLE REPAYMENT PERIODS</div>
                            </v-card-text>
                        </v-col>
                        <v-col cols="12" md="6" sm="12">
                            <v-card-text class="text--primary" style="margin-top: 10px;">
                                <div style="font-size: 40px; font-weight: 300;">30 Million<sup>UGX</sup></div><br>
                                <div style="font-size: 12px;">MINIMUM AMOUNT AVAILABLE</div>
                            </v-card-text>
                        </v-col>
                        <v-col cols="12" md="6" sm="12">
                            <v-card-text class="text--primary" style="margin-top: 10px;">
                                <div style="font-size: 40px; font-weight: 300;">1 Billion<sup>UGX</sup></div><br>
                                <div style="font-size: 12px;">MAXIMUM LOAN AMOUNT</div>
                            </v-card-text>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
                    <v-col cols="12" md="5">
          <v-card max-width="auto">
            <v-img
              src="../assets/housecompletion.jpg"
              height="350px"
            ></v-img>
          </v-card>
        </v-col>
        </v-row>
        <v-row>
                    <v-col cols="12" md="5">
          <v-card max-width="auto">
            <v-img
              src="../assets/houseloan.jpg"
              height="402px"
            ></v-img>
          </v-card>
        </v-col>
            <v-col cols="12" md="6" class="mb-5">
                <v-card class="mx-auto" max-width="600">
                    <v-card-title style="font-weight: 300; margin-bottom: 10px;" class="text-h4">House Purchase Loan</v-card-title>
                    <v-card-subtitle class="text--primary">
                        Have you identified land to buy or would you like to get in touch with reputable property developers? It can be possible to finance your goal to become a landowner with the Land Purchase Loan.
                    </v-card-subtitle>

                    <v-row>
                        <v-col cols="12" md="6" sm="12">
                            <v-card-text class="text--primary" style="margin-top: 10px;">
                                <div style="font-size: 40px; font-weight: 300;">20 years</div><br>
                                <div style="font-size: 12px;">FLEXIBLE REPAYMENT PERIODS</div>
                            </v-card-text>
                        </v-col>
                        
                        <v-col cols="12" md="6" sm="12">
                            <v-card-text class="text--primary" style="margin-top: 10px;">
                                <div style="font-size: 40px; font-weight: 300;">30 Million<sup>UGX</sup></div><br>
                                <div style="font-size: 12px;">MINIMUM AMOUNT AVAILABLE</div>
                            </v-card-text>
                        </v-col>
                        <v-col cols="12" md="6" sm="12">
                            <v-card-text class="text--primary" style="margin-top: 10px;">
                                <div style="font-size: 40px; font-weight: 300;">1 Billion<sup>UGX</sup></div><br>
                                <div style="font-size: 12px;">MAXIMUM LOAN AMOUNT</div>
                            </v-card-text>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="6" class="mb-5">
                <v-card class="mx-auto" max-width="600">
                    <v-card-title style="font-weight: 300; margin-bottom: 10px;" class="text-h4">Land Purchase Loan</v-card-title>
                    <v-card-subtitle class="text--primary">
                        Are you are looking to buy a house or flat? Buy an existing house, condominium or apartment with this great mortgage solution. It can be possible to be a home owner at the best rates on the market. Get your property with reputable developers, with affordable insurance from our trusted partners. Reach out today.
                    </v-card-subtitle>

                    <v-row>
                        <v-col cols="12" md="6" sm="12">
                            <v-card-text class="text--primary" style="margin-top: 10px;">
                                <div style="font-size: 40px; font-weight: 300;">5 years</div><br>
                                <div style="font-size: 12px;">REPAYMENT PERIOD Up TO</div>
                            </v-card-text>
                        </v-col>
                        <v-col cols="12" md="6" sm="12">
                            <v-card-text class="text--primary" style="margin-top: 10px;">
                                <div style="font-size: 40px; font-weight: 300;">30 Million<sup>UGX</sup></div><br>
                                <div style="font-size: 12px;">MINIMUM LOAN AMOUNT</div>
                            </v-card-text>
                        </v-col>
                        <v-col cols="12" md="6" sm="12">
                            <v-card-text class="text--primary" style="margin-top: 10px;">
                                <div style="font-size: 40px; font-weight: 300; width: 16rem;">300 Million<sup>UGX</sup></div><br>
                                <div style="font-size: 12px;">MAXIMUM LOAN AMOUNT</div>
                            </v-card-text>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
                    <v-col cols="12" md="5">
          <v-card max-width="auto">
            <v-img
              src="../assets/land.jpg"
              height="420px"
            ></v-img>
          </v-card>
        </v-col>
        </v-row><br /><br>
    </v-container>
</div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: "MortgageRates",
    data() {
        return {
            images: [{
                    src: 'https://res.cloudinary.com/diued7ugb/image/upload/v1626688778/dillon-kydd-XGvwt544g8k-unsplash_lrvzid.jpg',
                    title: 'Financing your next home starts here.',
                    subTitle: 'Directly to us, through an agent, or yourself'
                },

            ]
        }
    },
      methods: {
        ...mapActions(["postAUserLog"])
    },
    created(){
        this.postAUserLog({
            activity: "Visited Mortgage Rates page",
            button_clicked: "Mortgage Rate Page"
        });
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
