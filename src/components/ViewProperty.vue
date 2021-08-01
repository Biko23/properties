<template>
  <div>
    <top-nav />
    <main-nav />
    <v-container>
      <v-row>
        <v-col cols="12" sm="12" md="8" lg="8">
          <v-carousel>
            <v-carousel-item
              v-for="propertyVisual in allSinglePropertyVisuals"
              :key="propertyVisual.visuals_id"
              :src="'http://localhost:8094/' + propertyVisual.snapshot"
              reverse-transition="fade-transition"
              transition="fade-transition"
            ></v-carousel-item>
          </v-carousel>
        </v-col>
        <v-col>
          <div style="background-color: #f2f2f2; border-radius: 6px">
            <v-col>
              <p style="color: #3b6ef3">
                Posted By: {{allSingleNeighborhoodVisuals[0].created_by}} <br />
                <span>Property Owner: {{allSingleNeighborhoodVisuals[0].created_by}}</span>
              </p>
            </v-col>
            <v-col>
              <v-btn color="primary" style="width: 160px">Call</v-btn>
              <v-btn color="white" style="margin-left: 10px; width: 160px">
                <span style="color: #3b6ef3"> Chat</span></v-btn>
            </v-col>
            <v-col>
              <v-btn color="primary" block>Make an Offer</v-btn>
            </v-col>
          </div>
          <br />
          <div style="background-color: #f2f2f2; border-radius: 6px">
            <v-col>
              <p style="color: #3b6ef3">
                Price:
                <span style="color: black; margin-left: 230px">$150,000</span>
                <br />
                <span
                  >Equavalent To:
                  <span style="color: black; margin-left: 140px"
                    >UGX 400,000</span
                  ></span
                >
              </p>
            </v-col>

            <v-col>
              <v-btn color="primary" block>Make an Offer</v-btn>
            </v-col>
          </div>
          <div>
            <v-col>
              <h3>House for rent</h3>
              <p style="font-weight: 300">
                2 beds, 2 bathrooms, 1500 sqft-House for rent <br />
                plot 3421, Muyenga, Kampala
              </p>
            </v-col>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col v-for="propertyVisual in allSinglePropertyVisuals" :key="propertyVisual.visuals_id">
          <v-img
            :src="'http://localhost:8094/' + propertyVisual.snapshot"
            aspect-ratio="1"
            class="grey lighten-2"
            height="200"
          ></v-img>
        </v-col>
        <v-col cols="12" md="4">
          <v-img
            src="https://res.cloudinary.com/diued7ugb/image/upload/v1626370006/google-maps-759_1_zqu50z.png"
            :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
            aspect-ratio="1"
            class="grey lighten-2"
            height="200"
          ></v-img>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-col>
          <v-card color="basil">
            <v-card-title class="text-center justify-center py-6">
              <h1 class="font-weight-bold text-h6 basil--text">
                More property Details
              </h1>
            </v-card-title>

            <v-tabs
              v-model="tab"
              background-color="transparent"
              color="basil"
              grow
            >
              <v-tab> Features </v-tab>
              <v-tab> Monthly Costs </v-tab>
              <v-tab> Neighborhood </v-tab>
              <v-tab> Landmarks </v-tab>
              <v-tab> Rating </v-tab>
              <v-tab> Rental Value </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item>
                <v-card color="basil" flat>
                  <v-card-text>
                    <!-- Features content -->
                    <v-data-table
                      :headers="featureHeaders"
                      :items="propertyFeatures"
                      :items-per-page="5"
                      class="elevation-1"
                    ></v-data-table>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card color="basil" flat>
                  <v-card-text>
                    <!-- Monthly costs content -->
                    <v-data-table
                      :headers="monthlyCostHeaders"
                      :items="propertyMonthtyCosts"
                      :items-per-page="5"
                      class="elevation-1"
                    ></v-data-table>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <!-- Neighborhood -->
              <v-tab-item>
                <v-card color="basil" flat>
                  <v-card-text>
                    <!-- Content for neighborhood -->
                    <v-row v-if="allSingleNeighborhoodVisuals.length > 0">
                      <v-col v-for="neighborhoodVisual in allSingleNeighborhoodVisuals" :key="neighborhoodVisual.neighborhood_visuals_id">
                        <v-img
                          :src="'http://localhost:9003/' + neighborhoodVisual.snapshot"
                          aspect-ratio="1"
                          class="grey lighten-2"
                          height="200"
                        ></v-img>
                      </v-col>
                    </v-row>
                    <p v-else>No Neighborhood images to display</p>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <!-- Neighborhood -->
              <!-- Landmark -->
              <v-tab-item>
                <v-card color="basil" flat>
                  <v-card-text>
                    <!-- Content for neighborhood -->
                    <v-row v-if="allSinglePropertyNearbyLandmarkVisuals.length > 0">
                      <v-col v-for="landmarkVisuals in allSinglePropertyNearbyLandmarkVisuals" :key="landmarkVisuals.property_nearby_landmark_id">
                        <v-img
                          :src="'http://localhost:8001/' + landmarkVisuals.snapshot"
                          aspect-ratio="1"
                          class="grey lighten-2"
                          height="200"
                        ></v-img>
                      </v-col>
                    </v-row>
                    <p v-else>No Landmark images to display</p>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <!-- Landmarks end -->
              <v-tab-item>
                <v-card color="basil" flat>
                  <v-card-text class="text-center">
                    <!-- Content rating-->
                    <v-row align="center" class="mx-0">
                      <v-rating
                        :value="4.5"
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="14"
                      ></v-rating>
                      <div class="grey--text ms-4">4.5 (413)</div>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card color="basil" flat>
                  <v-card-title>Rent Amount</v-card-title>
                  <v-card-text>
                    <h3>20000000 /=</h3>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <about />
  <Footer />

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import About from '../views/About.vue';
import Footer from './Footer.vue';
import MainNav from "./MainNav.vue";
import TopNav from "./TopNav.vue";
export default {
  components: { TopNav, MainNav, About, Footer },
  name: "ViewProperty",
  props: ['propertyId'],
  // $route.params.propertyId
  data: () => ({
    propertyFeatures: [
      {
        features_id: 1,
        feature: "Iron sheets",
        description: "Roman Tiles Coffee brown",
      },
      { features_id: 2, feature: "Floors", description: "4" },
      {
        features_id: 3,
        feature: "Type",
        description:
          "3 Bedrooms,1 dinning room, 1 sitting room ,kitchen, and 2 washrooms",
      },
    ],
    propertyMonthtyCosts: [
      {
        monthly_costs_id: 1,
        principal_plus_interest: 20000000.0,
        mortgage_insurance: 4000000.0,
        property_tax: 500000.0,
        home_insurance: 500000.0,
        utility_costs: 500000.0,
      },
    ],
    propertyNeiborhood: [],
    propertyRating: [],
    propertyRentalValue: [
      {
        rental_value_id: 1,
        rental_value_amt: 2000000,
      },
    ],
    featureHeaders: [
      { text: "Feature", value: "feature" },
      { text: "Description", value: "description" },
    ],
    monthlyCostHeaders: [
      { text: "Principal Plus Interest", value: "principal_plus_interest" },
      { text: "Mortgage Insurance", value: "mortgage_insurance" },
      { text: "Tax", value: "property_tax" },
      { text: "Home Insurance", value: "home_insurance" },
      { text: "Utility Costs", value: "utility_costs" },
    ],
    tab: null,
    itemss: ["Appetizers", "Entrees", "Deserts", "Cocktails"],
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, ",
    items: [
      {
        src: "https://res.cloudinary.com/diued7ugb/image/upload/v1626369977/og_dqwykp.jpg",
      },
      {
        src: "https://res.cloudinary.com/diued7ugb/image/upload/v1625732723/house1_svrut7.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
      },
    ],
  }),
  computed: {
    ...mapGetters([
      "allSinglePropertyVisuals",
      "allSinglePropertyNearbyLandmarkVisuals",
      "allSingleNeighborhoodVisuals"
    ])
  },
   methods: {
     ...mapActions([
       "fetchSinglePropertyVisuals", 
       "fetchPropertyNearbyLandmarkVisuals", 
       "fetchPropertyNeighborhoodVisuals"
    ])
  },
  mounted(){
    this.fetchSinglePropertyVisuals(this.propertyId);
    this.fetchPropertyNearbyLandmarkVisuals(this.propertyId);
    this.fetchPropertyNeighborhoodVisuals(this.propertyId);
  },
};
</script>

<style scoped>
</style>