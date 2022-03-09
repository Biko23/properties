<template>
  <div>
     <base-dialog :message="message" :title="title" :dialogState="state">
        <template v-slot:button>
            <v-btn text @click="state = !state">close</v-btn>
        </template>
    </base-dialog>
    <v-container>
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
          <div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-around;">
            <v-col style="flex: 6">
              <h3>Property Details</h3>
              <p style="font-weight: 600; margin-top: 5px;">CODE: {{ $route.query.code }}</p>
              <p style="margin-bottom: 0;">Location:</p>
              <p style="font-weight: 300;"> {{ $route.query.location }}</p>
            </v-col>
            <v-col 
              style="
                display: flex; 
                flex: 1; 
                align-items: flex-start; 
                justify-content: flex-end;
              "
            >
              <v-row>
                <v-col>
                  <template v-if="loginState">
                    <v-btn 
                      v-if="
                        (checkUserInterestInProperty == 0 || checkUserInterestInProperty == undefined) && 
                        currentLoggedinUser.username !== allSinglePropertyVisuals[0].created_by"
                      color="primary" 
                      @click="expressInterestInProperty"
                    >Interested</v-btn>
                    <p v-else></p> 
                  </template>
                  <template v-else>
                    <v-btn
                      title="Express interested"
                      @click="showLoginInterestMessage"
                      color="primary"
                    >Interested</v-btn>
                  </template>
                </v-col>
                <v-col style="display: flex; justify-content: center;">
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
                        title="Remove from favorites"
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
                        title="Add to favorites"
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
                      title="Add to favorites"
                      @click.stop="showLoginMessage"
                    >
                      mdi-heart-outline
                    </v-icon>
                  </template>
                </v-col>
              </v-row>
            </v-col>
          </div>
          <div style="margin-left: 10px;">
            <p style="margin-bottom: 0;">Features</p>
            <p style="font-weight: 300"> {{ spreadFeatures }}</p>
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
                :url="`http://localhost:8080/view/${allSinglePropertyVisuals[0].property_id}?code=${codeParam}&location=${locationParam}&cost=${costParam}&district=${districtParam}&category=${categoryParam}&type=${typeParam}`"
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
            <v-card-text v-if="fetching">
              <v-card elevation="4" class="mx-auto">
                <base-spinner style="align-items: center;"/>
              </v-card>
            </v-card-text>
             <v-card-text v-else>
               <v-row>
                  <v-col v-if="filteredSimilarProperties.length <= 0">
                    <center><h3>No Similar Properties Available</h3></center>
                  </v-col>
                 <v-col cols="12" xs="12" sm="6" md="4" lg="3" v-for="(item, index) in filteredSimilarProperties" :key="index">
                  <PropertyCard 
                    :location="item.name"
                    :date="item.when_created"
                    :category="item.category"
                    :cost="item.actual_value"
                    :propertyCode="item.property_number"
                    :postedBy="item.created_by"
                    :src="'http://localhost:8002/' + item.snapshot"
                    :to="`/view-similar-property/${item.property_id}?code=${item.property_number}&location=${item.name}&cost=${item.actual_value}&district=${item.district}&category=${item.category}&type=${item.listed_type}`"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <!-- 
                  :date="formatDate(propertyVisual.when_created)"
                  :cost="commaFormatted(propertyVisual.actual_value)"
                 -->
        </v-col>
      </v-row>
    </v-container>
    <!--  -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import NetworkSharing from "./BaseShareComponent.vue";
import PropertyCard from './PropertyCard'
export default {
  components: { NetworkSharing, PropertyCard },
  name: "ViewProperty",
  props: ["property_id"],
  data: () => ({
    favoriteDialog: "",
    alertMessage: false,
    message: '',
    title: '',
    state: false,
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
      { text: "Quantity", value: "quantity" },
    ],
    priceHistoryHeaders: [
      { text: "Event", value: "event" },
      { text: "Price", value: "price" },
      { text: "Payment Date", value: "when_created" },
    ],
    tab: null,
    fetching: false,
    similarProperties: []
  }),
  computed: {
    ...mapGetters([
      "allSinglePropertyVisuals",
      "allSinglePropertyNearbyLandmarkVisuals",
      "allSingleNeighborhoodVisuals",
      "currentPropertyValue",
      "currentPropertyPriceHistory",
      "allCurrentPropertyFeatures",
      "loginState",
      "currentLoggedinUser",
      "allCurrentUserFavoriteProperties",
      "checkUserInterestInProperty",
      "allSimilarProperties"
    ]),
    filteredSimilarProperties(){
      return this.similarProperties.filter(property => this.property_id != property.property_id)
    },
    dollarExchange() {
      return () => (this.currentPropertyValue.actual_value / 3500).toFixed(2);
    },
    spreadFeatures: function () {
      return this.allCurrentPropertyFeatures
        .reduce((acc, currentFeature) => acc + "," + `${currentFeature.quantity} ${currentFeature.name}`, "")
        .slice(1);
    },
    codeParam(){
      return this.$route.query.code
    },
    typeParam(){
      return this.$route.query.type
    },
    categoryParam(){
      return this.$route.query.category
    },
    districtParam(){
      return this.$route.query.district
    },
    costParam(){
      return this.$route.query.cost
    },
    locationParam(){
      return this.$route.query.location
    }
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
      "checkIfUserIsAlreadyInterestedInAProperty",
      "expressInterestInBuyingAProperty",
      "getSimilarProperties",
      "postAUserLog"
    ]),
    defaultResponse(msg, heading, status) {
      this.message = msg
      this.title = heading
      this.state = status
      setTimeout(() => {
          this.message = ""
          this.title = ""
          this.state = false
      }, 2000);
    },
    async fetchSimilarProperties(){
      try {
        const propertyDetails = {
          property_value: this.$route.query.cost,
          property_type: this.$route.query.category,
          property_district: this.$route.query.district,
          listed_for: this.$route.query.type
        }
        this.fetching = true;
        const response = await this.getSimilarProperties(propertyDetails);
        if(response.data.status == 0){
          this.fetching = false;
          this.defaultResponse(response.data.message, 'Error', true);
        } else if (response.data.status == 1){
          this.fetching = false;
          this.similarProperties = this.allSimilarProperties
        }
      } catch (error) {
        this.fetching = false;
        this.defaultResponse(error.message, 'Error', true);
      }
    },
    // ==========================================
    async confirmIfPropertyIsAlreaydAddedToInterests(){
      if(this.loginState == true){
        try {
          const response = await this.checkIfUserIsAlreadyInterestedInAProperty(this.property_id);
          if(response.data.status == 0){
            this.defaultResponse(response.data.message, 'Error', true);
          }        
        } catch (error) {
          this.defaultResponse(error.message, 'Error', true);
        }
      }
    },
    async expressInterestInProperty(){
      try {
        const response = await this.expressInterestInBuyingAProperty(this.property_id);
         if(response.data.status == 1){
          this.confirmIfPropertyIsAlreaydAddedToInterests();
          this.defaultResponse('Interest submitted to SPL, they will engage you soon', 'Success', true);
          const payload = {
            "activity":`Added Property with id ${this.property_id} to my interested properties`, 
            "button_clicked":"Add property to my interested properties"
          }
          this.postAUserLog(payload);
        } else {
          this.defaultResponse(response.data.message, 'Error', true);
        } 
      } catch (error) {
        this.defaultResponse(error.message, 'Error', true);
      }
    },
    // ===============================================
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
      this.defaultResponse("Please login to add this property to your favorites", "", true)
    },
    showLoginInterestMessage() {
      this.defaultResponse("Please login to perform this action", "", true)
    }
  },
  mounted() {
    console.log("Is this the property view page?");
    this.addUserView();
    this.fetchSinglePropertyVisuals(this.property_id);
    this.fetchPropertyNearbyLandmarkVisuals(this.property_id);
    this.fetchPropertyNeighborhoodVisuals(this.property_id);
    this.fetchCurrentPropertyValue(this.property_id);
    this.fetchCurrentPropertySelectedFeatures(this.property_id);
    this.fetchPropertyPriceHistories(this.property_id);
    this.confirmIfPropertyIsAlreaydAddedToInterests();
    this.fetchSimilarProperties();
  },
};
</script>

<style scoped>
</style>