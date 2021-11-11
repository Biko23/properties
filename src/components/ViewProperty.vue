<template>
  <div>
    <v-container>
      <!-- favorite Dialog -->
      <v-dialog
        transition="dialog-top-transition"
        persistent
        v-model="favoriteDialog"
        max-width="600"
      >
        <template>
          <v-card>
            <v-toolbar color="blue" dark>Warning</v-toolbar>
            <v-card-text class="pt-5">
              <p style="font-size: 16px">{{ alertMessage }}</p>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="closeFavoriteDialog">ok</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
      <!-- end favorite Dialog -->
      <v-row>
        <v-col cols="12" sm="12" md="8" lg="8">
          <v-carousel>
            <v-carousel-item
              v-for="propertyVisual in allSinglePropertyVisuals"
              :key="propertyVisual.visuals_id"
              :src="'http://localhost:8002/' + propertyVisual.snapshot"
              reverse-transition="fade-transition"
              transition="fade-transition"
            ></v-carousel-item>
          </v-carousel>
        </v-col>
        <v-col>
          <div style="background-color: #f2f2f2; border-radius: 6px">
            <v-col>
              <!-- <p style="color: #3b6ef3">
                Posted By: {{allSingleNeighborhoodVisuals[0].created_by}} <br />
                <span>Property Owner: {{allSingleNeighborhoodVisuals[0].created_by}}</span>
              </p> -->
            </v-col>
            <!-- <v-col>
              <v-btn color="primary" style="width: 160px">Call</v-btn>
              <v-btn color="white" style="margin-left: 10px; width: 160px">
                <span style="color: #3b6ef3"> Chat</span></v-btn>
            </v-col> -->
            <v-col>
              <a href="mailto:cccug@stanbic.com" style="text-decoration: none">
                <v-btn color="primary" block>Email Us</v-btn>
              </a>
            </v-col>
          </div>
          <br />
          <div style="background-color: #f2f2f2; border-radius: 6px">
            <v-col>
              <div style="display: flex; flex-direction: column">
                <span
                  style="
                    flex: 1;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    flex-wrap: wrap;
                  "
                >
                  <span> Price: </span>
                  <span>
                    UGX {{ commaFormatted(currentPropertyValue.actual_value) }}
                  </span>
                </span>
                <span
                  style="
                    flex: 1;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    flex-wrap: wrap;
                  "
                >
                  <span> Equavalent To: </span>
                  <span> $ {{ dollarExchange() }} </span>
                </span>
              </div>
            </v-col>

            <v-col>
              <a
                href="tel:+256782456789"
                style="text-decoration: none"
                title="+256782456789"
              >
                <v-btn color="primary" block>Call Us</v-btn>
              </a>
            </v-col>
          </div>
          <div
            style="
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              justify-content: space-around;
            "
          >
            <v-col style="flex: 6">
              <h3>Property Details</h3>
              <p style="font-weight: 300">
                {{ spreadFeatures }} <br /><br />
                Location: {{ $route.query.location }}
              </p>
            </v-col>
            <v-col
              style="
                display: flex;
                flex: 1;
                align-items: center;
                justify-content: flex-end;
              "
            >
              <template v-if="loginState">
                <template
                  v-if="
                    currentLoggedinUser.username !==
                    allSinglePropertyVisuals[0].created_by
                  "
                >
                  <v-icon
                    v-if="
                      allCurrentUserFavoriteProperties.includes(
                        allSinglePropertyVisuals[0].property_id
                      )
                    "
                    small
                    style="font-size: 40px; color: #3b6ef3"
                    @click.stop="
                      onRemove(allSinglePropertyVisuals[0].property_id)
                    "
                  >
                    mdi-heart
                  </v-icon>
                  <v-icon
                    v-else
                    small
                    style="font-size: 40px; color: black"
                    @click.stop="onAdd(allSinglePropertyVisuals[0].property_id)"
                  >
                    mdi-heart-outline
                  </v-icon>
                </template>
                <template v-else />
              </template>
              <template v-else>
                <v-icon
                  small
                  style="font-size: 40px; color: black; z-index: 100"
                  @click.stop="showLoginMessage"
                >
                  mdi-heart-outline
                </v-icon>
              </template>
            </v-col>
          </div>
          <!--  -->
          <div>
            <h4 style="margin: 1em 0 0 10px">Social Platform</h4>
            <v-list
              style="
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: flex-start;
                margin-left: 10px;
              "
            >
              <network-sharing 
                :url="`http://localhost:8080/view/${allSinglePropertyVisuals[0].property_id}?location=${$route.query.location}`"
                />
            </v-list>
          </div>
          <!--  -->
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col
          v-for="propertyVisual in allSinglePropertyVisuals"
          :key="propertyVisual.visuals_id"
        >
          <v-img
            :src="'http://localhost:8002/' + propertyVisual.snapshot"
            aspect-ratio="1"
            class="grey lighten-2"
            height="200"
          ></v-img>
        </v-col>
        <v-col cols="12" md="4">
          <v-img
            src="https://res.cloudinary.com/diued7ugb/image/upload/v1626370006/google-maps-759_1_zqu50z.png"
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
              <v-tab> Pricing History</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item>
                <v-card color="basil" flat>
                  <v-card-text>
                    <!-- Features content -->
                    <v-data-table
                      :headers="featureHeaders"
                      :items="allCurrentPropertyFeatures"
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
                      <v-col
                        v-for="neighborhoodVisual in allSingleNeighborhoodVisuals"
                        :key="neighborhoodVisual.neighborhood_visuals_id"
                      >
                        <v-img
                          :src="
                            'http://localhost:9003/' +
                            neighborhoodVisual.snapshot
                          "
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
                    <v-row
                      v-if="allSinglePropertyNearbyLandmarkVisuals.length > 0"
                    >
                      <v-col
                        v-for="landmarkVisuals in allSinglePropertyNearbyLandmarkVisuals"
                        :key="landmarkVisuals.property_nearby_landmark_id"
                      >
                        <v-img
                          :src="
                            'http://localhost:8001/' + landmarkVisuals.snapshot
                          "
                          aspect-ratio="1"
                          class="grey lighten-2"
                          height="200"
                        ></v-img>
                        <p>{{ landmarkVisuals.description }}</p>
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
                  <v-card-text>
                    <v-data-table
                      :headers="priceHistoryHeaders"
                      :items="currentPropertyPriceHistory"
                      :items-per-page="5"
                      class="elevation-1"
                    ></v-data-table>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!--  -->
    <v-container>
      <v-row>
        <v-col>
          <v-card color="basil">
            <v-card-title class="text-center justify-center py-6">
              <h1 class="font-weight-bold text-h6 basil--text">
                Similar Properties
              </h1>
            </v-card-title>
            <v-tabs
              v-model="tab"
              background-color="transparent"
              color="basil"
              grow
            >
              <v-tab></v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item>
                <v-card color="basil" flat>
                  <v-card-text>
                    <!-- Content for neighborhood -->
                    <v-row v-if="allSingleNeighborhoodVisuals.length > 0">
                      <v-col
                        v-for="neighborhoodVisual in allSingleNeighborhoodVisuals"
                        :key="neighborhoodVisual.neighborhood_visuals_id"
                      >
                        <v-img
                          :src="
                            'http://localhost:9003/' +
                            neighborhoodVisual.snapshot
                          "
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
            </v-tabs-items>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!--  -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import NetworkSharing from "./BaseShareComponent.vue";
import About from "../views/About.vue";
import Footer from "./Footer.vue";
import MainNav from "./MainNav.vue";
import TopNav from "./TopNav.vue";
export default {
  components: { NetworkSharing, TopNav, MainNav, About, Footer },
  name: "ViewProperty",
  props: ["property_id"],
  // $route.params.propertyId
  data: () => ({
    favoriteDialog: "",
    alertMessage: false,
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
    monthlyCostHeaders: [
      { text: "Principal Plus Interest", value: "principal_plus_interest" },
      { text: "Mortgage Insurance", value: "mortgage_insurance" },
      { text: "Tax", value: "property_tax" },
      { text: "Home Insurance", value: "home_insurance" },
      { text: "Utility Costs", value: "utility_costs" },
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
      { text: "Feature", value: "name" },
      { text: "Description", value: "name" },
    ],
    priceHistoryHeaders: [
      { text: "Event", value: "event" },
      { text: "Price", value: "price" },
      { text: "Payment Date", value: "when_created" },
    ],
    tab: null
  }),
  computed: {
    ...mapGetters([
      "allSinglePropertyVisuals",
      "allSinglePropertyNearbyLandmarkVisuals",
      "allSingleNeighborhoodVisuals",
      "currentPropertyValue",
      "currentLoggedinUser",
      "currentPropertyPriceHistory",
      "allCurrentPropertyFeatures",
      "allCurrentUserFavoriteProperties",
      "loginState",
    ]),
    dollarExchange() {
      // const USCost = (this.currentPropertyValue.actual_value / 3500).toFixed(2);
      // return () => this.commaFormatted(USCost);
      return () => (this.currentPropertyValue.actual_value / 3500).toFixed(2);
    },
    spreadFeatures: function () {
      return this.allCurrentPropertyFeatures
        .reduce((acc, currentFeature) => acc + "," + currentFeature.name, "")
        .slice(1);
    },
  },
  methods: {
    ...mapActions([
      "fetchSinglePropertyVisuals",
      "fetchPropertyNearbyLandmarkVisuals",
      "fetchPropertyNeighborhoodVisuals",
      "fetchCurrentPropertyValue",
      "fetchPropertyPriceHistories",
      "fetchCurrentPropertySelectedFeatures",
      "addAViewedProperty",
      "removePropertyFromFavorites",
      "addPropertyToFavorites",
    ]),
    addUserView() {
      if (this.loginState === true) {
        this.addAViewedProperty(this.property_id);
      }
    },
    commaFormatted(amount) {
      let price = amount.toLocaleString("en-US");
      return price;
    },
    onRemove(property_id) {
      this.removePropertyFromFavorites(property_id);
    },
    onAdd(property_id) {
      this.addPropertyToFavorites(property_id);
    },
    showLoginMessage() {
      this.favoriteDialog = true;
      this.alertMessage = "Please login to add this property to your favorites";
      setTimeout(() => {
        this.favoriteDialog = false;
        this.alertMessage = "";
      }, 1500);
    },
    closeFavoriteDialog() {
      this.favoriteDialog = false;
      this.alertMessage = "";
    },
  },
  mounted() {
    this.addUserView();
    this.fetchSinglePropertyVisuals(this.property_id);
    this.fetchPropertyNearbyLandmarkVisuals(this.property_id);
    this.fetchPropertyNeighborhoodVisuals(this.property_id);
    this.fetchCurrentPropertyValue(this.property_id);
    this.fetchCurrentPropertySelectedFeatures(this.property_id);
    this.fetchPropertyPriceHistories(this.property_id);
  },
};
</script>

<style scoped>
</style>