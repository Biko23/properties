<template>
<div id="main-div">
    <top-nav />
    <main-nav />

    <v-container>
        <div style="text-align: center">
            <h3 style="color: white">Requirements for adding A Rental</h3>
            <h4 style="color: #b9cbdb">Step 1/4</h4>
        </div>
        <br />
        <v-row id="form-row">
            <v-col cols="12" md="12">
                <v-row>
                    <v-col cols="12" md="4">
                        <v-row>
                            <v-col>
                                <v-card class="mx-auto" max-width="400">
                                    <v-img class="white--text align-end" height="200px" src="../assets/requirements.jpeg">
                                        <v-card-title>Requirements</v-card-title>
                                    </v-img>

                                    <v-card-subtitle class="pb-0">
                                        Registering as a Renter
                                    </v-card-subtitle>

                                    <v-card-text class="text--primary">
                                        <div>&#8594; A Renter can be a broker or a Landlord</div>
                                        <div>&#8594;You need to fullfill the following <b style="font-size: 20px; margin-left: 20px;">&#8595;</b></div>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-btn color="orange lighten-2" @click="showCard1 = !showCard1" text>
                                            Requirements
                                        </v-btn>

                                        <v-spacer></v-spacer>

                                        <v-btn icon @click="showCard1 = !showCard1">
                                            <v-icon>{{ showCard2 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                                        </v-btn>
                                    </v-card-actions>

                                    <v-expand-transition>
                                        <div v-show="showCard1">
                                            <v-divider></v-divider>

                                            <v-card-text>
                                                <div>&#8594; Provide more info about yourself <router-link to="profile">here</router-link>.</div><br />
                                                <div>&#8594; Get Approved by SPL team.</div><br />
                                                <div>&#8594; Upon approval you start Listing.</div>
                                            </v-card-text>
                                        </div>
                                    </v-expand-transition>

                                </v-card>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-row>
                            <v-col>
                                <v-card class="mx-auto" max-width="400">
                                    <v-img class="white--text align-end" height="200px" src="../assets/sellingsteps.jpg">
                                        <v-card-title>Listing Steps</v-card-title>
                                    </v-img>

                                    <v-card-subtitle class="pb-0">
                                        Steps to register a rental
                                    </v-card-subtitle>

                                    <v-card-text class="text--primary">
                                        <div>&#8594; There are steps to upload a rental</div>
                                        <div>&#8594;These are shown below <b style="font-size: 20px; margin-left: 20px;">&#8595;</b></div>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-btn color="orange lighten-2" @click="showCard2 = !showCard2" text>
                                            Listing Steps
                                        </v-btn>

                                        <v-spacer></v-spacer>

                                        <v-btn icon @click="showCard2 = !showCard2">
                                            <v-icon>{{ showCard2 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                                        </v-btn>
                                    </v-card-actions>

                                    <v-expand-transition>
                                        <div v-show="showCard2">
                                            <v-divider></v-divider>
                                            <v-card-text>
                                                <div>Step 2: Rental info required.</div><br />
                                                <div>Step 3: Neighborhood info required.</div><br />
                                                <div>Step 4: Landmark Info required.</div>
                                            </v-card-text>
                                        </div>
                                    </v-expand-transition>

                                </v-card>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-row>
                            <v-col>
                                <v-card class="mx-auto" max-width="400">
                                    <v-img class="white--text align-end" height="200px" src="../assets/approved.jpeg">
                                        <v-card-title>Rental Approval</v-card-title>
                                    </v-img>

                                    <v-card-subtitle class="pb-0">
                                        Steps for Rental approval
                                    </v-card-subtitle>

                                    <v-card-text class="text--primary">
                                        <div>&#8594; There are steps to approve a property</div>
                                        <div>&#8594;These are shown below <b style="font-size: 20px; margin-left: 20px;">&#8595;</b></div>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-btn color="orange lighten-2" @click="showCard3 = !showCard3" text>
                                            Approval Steps
                                        </v-btn>

                                        <v-spacer></v-spacer>

                                        <v-btn icon @click="showCard3 = !showCard3">
                                            <v-icon>{{ showCard2 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                                        </v-btn>
                                    </v-card-actions>

                                    <v-expand-transition>
                                        <div v-show="showCard3">
                                            <v-divider></v-divider>
                                            <v-card-text>
                                                <div>Step 1: On upload rental goes to SPL.</div><br />
                                                <div>Step 2: Due deligence is done.</div><br />
                                                <div>Step 3: Rental gets approved and appear on the website.</div>
                                            </v-card-text>
                                        </div>
                                    </v-expand-transition>

                                </v-card>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col style="
                display: flex;
                flex-direction: row;
                justify-content: center;
              ">
                        <template v-if="loginState">
                            <router-link to="/register-rental">
                                <v-btn color="primary">Proceed to Next Step</v-btn>
                            </router-link>
                        </template>
                        <template v-else>
                            <p>
                                If it is your first time visiting us, click
                                <router-link to="/signup">
                                    here
                                </router-link>
                                to register or log in 
                                <router-link to="/login">
                                    here
                                </router-link>
                            </p>
                        </template>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <br />
    </v-container>
    <about />
    <Footer />
    <botton-nav />
</div>
</template>

<script>
import TopNav from "@/components/TopNav.vue";
import MainNav from "@/components/MainNav.vue";
import BottonNav from "../components/BottonNav.vue";
import About from "./About.vue";
import Footer from "../components/Footer.vue";
import {
    mapGetters
} from 'vuex';

export default {
    name: "RegisterRentalPropertyRequirement",
    data: () => ({
        showCard1: false,
        showCard2: false,
        showCard3: false
    }),
    components: {
        TopNav,
        MainNav,
        BottonNav,
        About,
        Footer
    },
    methods: {},
    computed: {
        ...mapGetters(["loginState"])
    },
    // currentLoggedinUser
    created() {},
};
</script>

<style scoped>
#main-div {
    background-color: #3b6ef3;
}

#form-row {
    background-color: #e7f0ff;
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 6px;
}

#description {
    margin-top: -200px;
}

.custom-placeholer-color input::placeholder {
    color: red !important;
    opacity: 1;
}

.custom-label-color .v-label .solo {
    color: blue;
    opacity: 1;
}

#col-hidden {
    display: none;
}

@media only screen and (max-width: 768px) {
    #main-div {
        background-color: #3b6ef3;
    }

    #form-row {
        background-color: #e7f0ff;
        width: auto;
        margin-left: auto;
        margin-right: auto;
        border-radius: 6px;
    }

    #description {
        margin-top: auto;
    }

    #col-hidden {
        display: block;
    }
}

@media only screen and (max-width: 1200px) {
    #main-div {
        background-color: #3b6ef3;
    }

    #form-row {
        background-color: #e7f0ff;
        width: auto;
        margin-left: auto;
        margin-right: auto;
        border-radius: 6px;
    }
}
</style>
