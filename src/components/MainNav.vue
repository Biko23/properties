<template>
<nav>
    <v-app-bar color="#f2f2f2" dark>
        <div style="">
            <v-img style="margin-left: auto; margin-right: auto; display: block" lazy-src="https://picsum.photos/id/11/10/6" max-height="45" max-width="45" src="https://res.cloudinary.com/diued7ugb/image/upload/v1625749459/Vector_pebqf0.png"></v-img>
        </div>

        <a href="/" style="text-decoration: none">
            <v-toolbar-title style="color: #3b6ef3; margin-top: 8px; text-decoration: none">Stanbic Properties</v-toolbar-title>
        </a>

        <v-spacer></v-spacer>
        <v-row justify="space-around" class="hid-navbar">
            <v-menu :key="text" :rounded="rounded" offset-y>
                <template v-slot:activator="{ attrs, on }">
                    <a href="#" color="deep-purple accent-4" class="blue--text ma-7" v-bind="attrs" v-on="on" style="text-decoration: none" icon @click="show1 = !show1">Buy
                        <v-icon color="blue accent-3">
                            {{show1 ? "mdi-chevron-up" : "mdi-chevron-down"}}
                        </v-icon>
                    </a>
                </template>

                <v-list>
                    <links title="Properties for sale" link="/properties-for-sale" />
                    <links title="New Constructions" />
                    <links title="For sale by owner" />
                    <links link="/" title="Open houses" />
                </v-list>
            </v-menu>

            <v-menu :key="text" :rounded="rounded" offset-y>
                <template v-slot:activator="{ attrs, on }">
                    <a href="#" color="deep-purple accent-4" class="blue--text ma-7" v-bind="attrs" v-on="on" style="text-decoration: none" icon @click="show2 = !show2">Sell
                        <v-icon color="blue accent-3">
                            {{show2 ? "mdi-chevron-up" : "mdi-chevron-down"}}
                        </v-icon>
                    </a>
                </template>

                 <v-list>
                    <links title="Sell A Property" link="/register" />
                    <links title="Current market trends" />
                    <links title="Seller's guide" link="/learn" />
                    <links title="Price Conversion Calculator" />
                </v-list>
            </v-menu>

            <v-menu :key="text" :rounded="rounded" offset-y>
                <template v-slot:activator="{ attrs, on }">
                    <a href="#" color="deep-purple accent-4" class="blue--text ma-7" v-bind="attrs" v-on="on" style="text-decoration: none" icon @click="show3 = !show3">Rent
                        <v-icon color="blue accent-3">
                            {{show3 ? "mdi-chevron-up" : "mdi-chevron-down"}}
                        </v-icon>
                    </a>
                </template>
                <div style="display: flex; flex-direction: row;">
                    <v-list>
                        <links link="/register" title="Rental Buildings" />
                        <links link="/login" title="Apartments for Rent" />
                        <links link="/property" title="Houses for Rent" />
                        <links link="/description" title="Your Rentals" />
                    </v-list>
                    <v-divider :vertical="divider"></v-divider>
                    <v-list>
                        <links link="/signup" title="Rental Buildings" />
                        <links link="/signdown" title="Apartments for Rent" />
                        <links link="/" title="Houses for Rent" />
                        <links link="/users" title="Your Rentals" />
                    </v-list>
                </div>
            </v-menu>

            <v-menu :key="text" :rounded="rounded" offset-y>
                <template v-slot:activator="{ attrs, on }">
                    <a href="#" color="deep-purple accent-4" class="blue--text ma-7" v-bind="attrs" v-on="on" style="text-decoration: none" icon @click="show4 = !show4">Home Loan
                        <v-icon color="blue accent-3">
                            {{show4 ? "mdi-chevron-up" : "mdi-chevron-down"}}
                        </v-icon>
                    </a>
                </template>

                <v-list>
                    <links title="Mortgage Lenders" />
                    <links title="Mortgage Rates" />
                    <links title="Mortgage Refinancing" />
                    <links link="/" title="Mortgage Calculator" />
                </v-list>
            </v-menu>

            <v-menu :key="text" :rounded="rounded" offset-y>
                <template v-slot:activator="{ attrs, on }">
                    <a href="#" color="deep-purple accent-4" class="blue--text ma-7" v-bind="attrs" v-on="on" style="text-decoration: none" icon @click="show5 = !show5">Get Started
                        <v-icon color="blue accent-3">
                            {{show5 ? "mdi-chevron-up" : "mdi-chevron-down"}}
                        </v-icon>
                    </a>
                </template>

                <v-list>
                    <links title="As a Landlord" link="/getstarted" />
                    <links title="Mortgage Rates" />
                    <links title="Mortgage Refinancing" />
                    <links link="/" title="Mortgage Calculator" />
                </v-list>
            </v-menu>
        </v-row>

        <v-col class="hid-navbar">
            <router-link to="/login" style="text-decoration: none">Login</router-link>
        </v-col>

        <v-spacer></v-spacer>
        <v-app-bar-nav-icon @click="drawer = true" style="color: #3b6ef3" class="toggle"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
            <v-list-group :value="false" prepend-icon="mdi-cart">
                <template v-slot:activator>
                    <v-list-item-title>Buy</v-list-item-title>
                </template>
                <v-list>
                    <links title="Homes for sale" />
                    <links title="New Constructions" />
                    <links title="For sale by owner" />
                    <links link="/" title="Open houses" />
                </v-list>
            </v-list-group>

            <v-list-group :value="false" prepend-icon="mdi-scale">
                <template v-slot:activator>
                    <v-list-item-title>Sell</v-list-item-title>
                </template>
                <v-list>
                    <links title="Current market trends" />
                    <links title="Sell A Property" />
                    <links title="Price Conversion Calculator" />
                    <links title="Seller's guide" link="/learn" />
                </v-list>
            </v-list-group>

            <v-list-group :value="false" prepend-icon="mdi-scale">
                <template v-slot:activator>
                    <v-list-item-title>Rent</v-list-item-title>
                </template>
                <v-list>
                    <links link="/register" title="Rental Buildings" />
                    <links link="/login" title="Apartments for Rent" />
                    <links link="/property" title="Houses for Rent" />
                    <links link="/description" title="Your Rentals" />
                </v-list>
            </v-list-group>

            <v-list-group :value="false" prepend-icon="mdi-scale">
                <template v-slot:activator>
                    <v-list-item-title>Home Loan</v-list-item-title>
                </template>
                <v-list>
                    <links title="Mortgage Lenders" />
                    <links title="Mortgage Rates" />
                    <links title="Mortgage Refinancing" />
                    <links link="/" title="Mortgage Calculator" />
                </v-list>
            </v-list-group>

            <v-list-group :value="false" prepend-icon="mdi-scale">
                <template v-slot:activator>
                    <v-list-item-title>Get Started</v-list-item-title>
                </template>
                <v-list>
                    <links title="As a Landlord" link="/getstarted"/>
                    <links title="Mortgage Rates" />
                    <links title="Mortgage Refinancing" />
                    <links link="/" title="Mortgage Calculator" />
                </v-list>
            </v-list-group>
        </v-list>
    </v-navigation-drawer>
</nav>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'
import Links from "@/components/Links";

export default {
    name: "MainNaigation",
    components: {
        Links,
    },
    data() {
        return {
            drawer: null,
            show1: false,
            show2: false,
            show3: false,
            show4: false,
            show5: false,
            divider: false,
            btns: [
                ["Removed", "0"],
                ["Large", "lg"],
                ["Custom", "b-xl"],
            ],
            colors: ["deep-purple accent-4", "error", "teal darken-1"]
        };
    },
};
</script>

<style scoped>
.toggle {
    display: none;
}

@media only screen and (max-width: 947px) {
    .toggle {
        display: block;
    }

    .hid-navbar {
        display: none;
    }
}
</style>
