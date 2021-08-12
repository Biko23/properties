<template>
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
            <links title="As a Landlord" link="/getstarted" />
            <links title="Mortgage Rates" />
            <links title="Mortgage Refinancing" />
            <links link="/" title="Mortgage Calculator" />
          </v-list>
        </v-list-group>
      </v-list>
</template>
<script>
import Links from "@/components/Links";
export default {
    name: 'MobileMainNav',
    components: {
        Links
    }

}
</script>