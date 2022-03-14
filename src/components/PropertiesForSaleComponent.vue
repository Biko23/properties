<template>
  <div>
    <base-dialog :message="message" :title="title" :dialogState="state">
        <template v-slot:button>
            <v-btn text @click="state = !state">close</v-btn>
        </template>
    </base-dialog>
    <v-container id="container" fluid>
      <v-row>
        <v-col cols="12" md="3" style="display: flex; flex-direction: row;">
          <div>
            <span style="margin: 0; padding: 0; margin-right: 20px;">Advanced Search {{ advancedSearch ? 'On' : 'Off' }}</span>
            <v-switch v-model="advancedSearch" style="margin: 0; padding: 0;"></v-switch>
          </div>
          <div id="result-total">
            <h3>Properties</h3>
            <small style="font-weight: bold">{{ allPropertyForSale.length }} results</small>
          </div>
        </v-col>
        <v-col cols="12" md="9">
          <!--  -->
          <v-row id="property-header" v-if="advancedSearch">
            <!-- <div id="result-total">
              <h3>Searched</h3>
              <small style="font-weight: bold"
                >{{ allPropertyForSale.length }} results</small
              >
            </div> -->
            <div id="advanced-search-field">
              <v-btn
                depressed
                rounded
                style="margin: 10px 5px 0 0"
                color="#3b6ef3"
                @click="refetchAllProperties"
                ><span style="color: white">All</span></v-btn
              >
              <v-select
                v-model="priceParameter"
                :items="priceRanges"
                item-value="id"
                item-text="range"
                label="Price range"
                solo
              ></v-select>
              <v-select v-model="searchParameters.main_feature" :items="allPropertyFeatures" item-value="text"
                item-text="text" label="Feature" solo></v-select>
              <v-select
                v-model="searchParameters.category"
                :items="allPropertyTypes"
                item-value="text"
                item-text="text"
                label="Category"
                solo
              ></v-select>
              <v-select
                v-model="searchParameters.landmark"
                :items="allPropertyLandmarkTypes"
                item-value="text"
                item-text="text"
                label="Landmark"
                solo
              ></v-select>
              <v-select
                v-model="searchParameters.district"
                :items="allDistricts"
                @change="getDivisionsByDistrictSelected"
                label="District"
                item-value="district_name"
                item-text="district_name"
                solo
              ></v-select>
              <v-select
                v-model="searchParameters.division"
                :items="allDivisions"
                @change="getSuburbsByDistrictSelected"
                item-value="division_name"
                item-text="division_name"
                label="Division"
                solo
              ></v-select>
              <v-select
                v-model="searchParameters.suburb"
                :items="allSuburbs"
                item-value="suburb_name"
                item-text="suburb_name"
                label="Suburb"
                solo
              ></v-select>
              <v-btn
                color="primary"
                @click="advancedSearchMethod"
                height="40px"
                style="margin-left: 10px;"
              >Search</v-btn>
            </div>
          </v-row>
          <!--  -->
          <!--  -->
          <v-row id="property-header" v-else>
            <!-- <div id="result-total">
              <h3>Properties</h3>
              <small style="font-weight: bold"
                >{{ allPropertyForSale.length }} results</small
              >
            </div> -->
            <!-- <div id="search-field">
              <v-btn
                depressed
                rounded
                style="margin: 10px 5px 0 0"
                color="#3b6ef3"
                @click="resetSelection"
                ><span style="color: white">All</span></v-btn
              >
              <v-select
                v-model="startPrice"
                :items="propertyCost()"
                label="Start Price"
                solo
              ></v-select>
              <v-select
                v-model="endPrice"
                :items="propertyCost()"
                label="End Price"
                solo
              ></v-select>
              <v-select
                v-model="selection"
                :items="propertyCategories()"
                label="Category"
                solo
              ></v-select>
              <v-select
                v-model="selection"
                :items="propertyLocation()"
                label="Location"
                solo
              ></v-select>
            </div> -->
          </v-row>
          <!--  -->
        </v-col>
      </v-row>
      <v-row v-if="loading">
        <v-col cols="12" offset="5" md="1" style="margin: 5em auto;">
        <base-spinner />
        </v-col>
      </v-row>
      <v-row id="main-property" v-else>
        <v-col cols="12" v-if="allPropertyForSale.length == 0">
          <center class="text-h4">Not properties with requested specifics available</center>
        </v-col>
        <v-col cols="12" xl="2" lg="3" md="4" sm="6" xs="12"
          v-else
          v-for="(propertyVisual, index) in allPropertyForSale"
          :key="index"
        >
        <!-- v-for="(propertyVisual, index) in filteredProperties()" -->
          <property-card
            :location="propertyVisual.name"
            :date="formatDate(propertyVisual.when_created)"
            :category="propertyVisual.category"
            :cost="commaFormatted(propertyVisual.actual_value)"
            :propertyCode="propertyVisual.property_number"
            :postedBy="propertyVisual.created_by"
            :src="'http://localhost:8002/' + propertyVisual.snapshot"
            :to="`/view/${propertyVisual.property_id}?code=${propertyVisual.property_number}&location=${propertyVisual.name}&cost=${propertyVisual.actual_value}&district=${propertyVisual.district}&category=${propertyVisual.category}&type=Sale`"
          >
            <template v-slot:share>
              <!--  -->
              <v-menu bottom offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="ma-2" v-bind="attrs" v-on="on" icon>
                    <v-icon 
                      style="font-size: 36px;"
                      title="Share this property"
                      >mdi-share-variant</v-icon>
                  </v-btn>
                </template>
                <v-list style="display: flex;">
                  <network-sharing
                    @click.native="logActivity(propertyVisual.property_id)"
                    :url="`http://localhost:8080/view/${propertyVisual.property_id}?code=${propertyVisual.property_number}&location=${propertyVisual.name}&cost=${propertyVisual.actual_value}&district=${propertyVisual.district}&category=${propertyVisual.category}&type=Sale`"
                  />
                </v-list>
              </v-menu>
            </template>
            <!-- Add to favorites -->
            <template v-if="loginState">
              <template
                v-if="
                  currentLoggedinUser.username !== propertyVisual.created_by
                "
              >
                <v-icon
                  v-if="
                    allCurrentUserFavoriteProperties.includes(
                      propertyVisual.property_id
                    )
                  "
                  class="mr-2"
                  style="font-size: 40px; color: #3b6ef3; z-index: 100; padding-bottom: 7px;"
                  @click="onRemove(propertyVisual.property_id)"
                  title="Add to Favorites"
                >
                  mdi-heart
                </v-icon>
                <v-icon
                  v-else
                  class="mr-2"
                  style="font-size: 40px; color: black; z-index: 100;  padding-bottom: 7px;"
                  @click="onAdd(propertyVisual.property_id)"
                  title="Add to Favorites"
                >
                  mdi-heart-outline
                </v-icon>
              </template>
              <template v-else />
            </template>
            <template v-else>
              <v-icon
                class="mr-2"
                style="font-size: 40px; color: black; z-index: 100;  padding-bottom: 7px;"
                @click="showLoginMessage"
                title="Add to Favorites"
              >
                mdi-heart-outline
              </v-icon>
            </template>
            <!-- End adding to Favorites -->
          </property-card>
        </v-col>
      </v-row>
    </v-container>
    <br />
  </div>
</template>

<script>
import PropertyCard from "@/components/PropertyCard";
import dateFormat from "dateformat";
import NetworkSharing from './BaseShareComponent.vue';
import { mapActions, mapGetters } from "vuex";
export default {
  name: "PropertiesForSaleComponent",
  components: {
    PropertyCard,
    NetworkSharing
  },
  data() {
    return {
      selection: null,
      startPrice: 0,
      endPrice: null,
      message: '',
      title: '',
      state: false,
      advancedSearch: true,
      loading: false,
      priceParameter: 0,
      searchParameters: {
        lower_price: 0,
        upper_price: 0,
        main_feature: undefined,
        category: undefined,
        landmark: undefined,
        district: undefined,
        division: undefined,
        suburb: undefined
      },
      priceRanges: [
        {id: 1, range: '0 - 1M'},
        {id: 2, range: '1.01 - 2M'},
        {id: 3, range: '2.01 - 5M'},
        {id: 4, range: '5 - 10M'},
        {id: 5, range: '10.1 - 20M'},
        {id: 6, range: '20.1 - 40M'},
        {id: 7, range: '40.1 - 70M'},
        {id: 8, range: '70.1 - 100M'},
        {id: 9, range: '100.1 - 150M'},
        {id: 10, range: '150.1 - 200M'},
        {id: 11, range: '200.1M +'}
      ]
    }
  },
  watch: {
    priceParameter() {
      return this.changePriceRange();
    },
  },
  methods: {
    ...mapActions([
      "fetchPropertyForSale",
      "fetchPropertyCategories",
      "fetchFavoritePropertiesForComparision",
      "addPropertyToFavorites",
      "removePropertyFromFavorites",
      "postAUserLog",
      "fetchPropertyFeatures",
      "fetchPropertyTypes",
      "fetchPropertyLandmarkTypes",
      "fetchAllDistricts",
      "fetchDivisionsByDistrictId",
      "fetchSuburbsByDistrictId",
      "getAllDivisions",
      "getAllSuburbs",
      "getAdvancedSearchedProperties"
    ]),
    defaultResponse(msg, heading, status) {
      this.message = msg
      this.title = heading
      this.state = status
      setTimeout(() => {
          this.message = ""
          this.title = ""
          this.state = false
      }, 3000);
    },
    commaFormatted(amount) {
      let price = amount.toLocaleString("en-US");
      return price;
    },
    async refetchAllProperties(){
      try {
        await this.fetchAllProperties();
        await this.fetchAllDistricts();
        await this.getAllDivisions();
        await this.getAllSuburbs();
        this.priceParameter = 0;
        this.searchParameters = Object.assign({}, {
          lower_price: 0,
          upper_price: 0,
          main_feature: undefined,
          category: undefined,
          landmark: undefined,
          district: undefined,
          division: undefined,
          suburb: undefined
        })
      } catch (error) {
        throw new Error(error.message)
      }
    },
    changePriceRange(){
      const PRICERANGES = {
        1: {lower_price: 0, upper_price: 1000000},
        2: {lower_price: 1000001, upper_price: 2000000},
        3: {lower_price: 2000001, upper_price: 5000000},
        4: {lower_price: 5000001, upper_price: 10000000},
        5: {lower_price: 10000001, upper_price: 20000000},
        6: {lower_price: 20000001, upper_price: 40000000},
        7: {lower_price: 40000001, upper_price: 70000000},
        8: {lower_price: 70000001, upper_price: 100000000},
        9: {lower_price: 100000001, upper_price: 150000000},
        10: {lower_price: 150000001, upper_price: 200000000},
        11: {lower_price: 200000001, upper_price: 0}
      }
      return PRICERANGES[this.priceParameter] 
        ? (this.searchParameters.lower_price = PRICERANGES[this.priceParameter].lower_price,
          this.searchParameters.upper_price = PRICERANGES[this.priceParameter].upper_price)
        : (this.searchParameters.lower_price = 0,
          this.searchParameters.upper_price = 0);
    },
    formatDate(dateToFormat) {
      let currentDate = new Date();
      let returnedFormattedDate = new Date(dateToFormat);
      let difference = Math.abs(returnedFormattedDate - currentDate);
      let days = (difference / (1000 * 3600 * 24)).toFixed(0);

      const DATES = {
        "0": "Added today",
        "1": "1 day ago",
        "2": "2 days ago",
        "3": "3 days ago",
        "4": "4 days ago",
        "5": "5 days ago",
        "6": "6 days ago",
        "7": "7 days ago"
      }
      
      return DATES[days] ?? dateFormat(returnedFormattedDate, "ddd, mmm dS, yyyy");
    },
    onRemove(property_id) {
      this.removePropertyFromFavorites(property_id)
        .then(()=>{
          const payload = {
            "activity":`Removed Property with id ${property_id} from favorites`, 
            "button_clicked":"Favorite Button"
          }
          this.postAUserLog(payload);
        });
    },
    onAdd(property_id) {
      this.addPropertyToFavorites(property_id)
        .then(()=>{
          const payload = {
            "activity":`Added Property with id ${property_id} in favorites`, 
            "button_clicked":"Favorite Button"
          }
          this.postAUserLog(payload);
        });
    },
    showLoginMessage() {
      this.defaultResponse("Please login to add this property to your favorites", '', true);
    },
    async fetchAllProperties() {
      try {
        await this.fetchPropertyCategories()
        .then(response => {
          if(response.data.status == 1){
            this.fetchPropertyForSale()
            .then(sales => {
              if(sales.data.status == 0){
                this.defaultResponse(sales.data.message, 'Error1', true);
              }
            }).catch(error => this.defaultResponse(error.message, 'Error2', true))
          } else {
            this.defaultResponse(response.data.message, 'Error3', true);
          }
        })
      } catch (error) {
        this.defaultResponse(error.message, 'Error4', true);
      }
    },
    resetSelection() {
      if (this.selection != null || this.endPrice != null) {
        this.selection = null;
        this.startPrice = 0;
        this.endPrice = null;
      }
    },
     logActivity(property_id){
      const payload = {
          "activity":`Shared A Property with id ${property_id}`, 
          "button_clicked":"Share Button"
      }
      this.postAUserLog(payload);
    },
    async getDivisionsByDistrictSelected(){
      let selectedDistrictId;
      if(this.searchParameters.district != null){
        const selectedDistrict = this.allDistricts.filter(district => district.district_name == this.searchParameters.district);
        selectedDistrictId = selectedDistrict[0].district_id;
      }
      try {
        await this.fetchDivisionsByDistrictId(selectedDistrictId);
      } catch (error) {
        throw new Error(error.message)
      }
    },
    async getSuburbsByDistrictSelected(){
      let selectedDivisionId;
      if(this.searchParameters.division != null){
        const selectedDivision = this.allDivisions.filter(division => division.division_name == this.searchParameters.division);
        selectedDivisionId = selectedDivision[0].division_id;
      }
      try {
        await this.fetchSuburbsByDistrictId(selectedDivisionId);
      } catch (error) {
        throw new Error(error.message)
      }
    },
    async advancedSearchMethod(){
      try {
        this.loading = true;
        const response = await this.getAdvancedSearchedProperties(this.searchParameters);
        this.loading = false;
        if(response.data.status == 0){ 
        } else {
        }
      } catch (error) {
        this.loading = false;
        throw new Error(error.message)
      }
    }
  },
  computed: {
    ...mapGetters([
      "allPropertyForSale",
      "loginState",
      "currentLoggedinUser",
      "allCurrentUserFavoriteProperties",
      "allPropertyFeatures",
      "allPropertyTypes",
      "allPropertyLandmarkTypes",
      "allDistricts",
      "allDivisions",
      "allSuburbs"
    ]),
    filteredProperties() {
      if (this.selection === null && this.endPrice === null) {
        return () => this.allPropertyForSale;
      } else if (this.selection !== null) {
        this.startPrice = 0;
        this.endPrice = null;
        return () =>
          (this.allPropertyForSale = this.allPropertyForSale.filter(
            (property) =>
              property.category == this.selection ||
              property.name == this.selection
          ));
      } else if (this.endPrice !== null) {
        this.selection = null;
        if (this.startPrice > this.endPrice) {
          return () =>
            (this.allPropertyForSale = this.allPropertyForSale.filter(
              (property) =>
                property.actual_value <= this.startPrice &&
                property.actual_value >= this.endPrice
            ));
        } else {
          return () =>
            (this.allPropertyForSale = this.allPropertyForSale.filter(
              (property) =>
                property.actual_value >= this.startPrice &&
                property.actual_value <= this.endPrice
            ));
        }
      }
    },
    propertyCategories() {
      return () => this.allPropertyForSale.map((property) => property.category);
    },
    propertyLocation() {
      return () => this.allPropertyForSale.map((property) => property.name);
    },
    propertyCost() {
      const prices = this.allPropertyForSale.map(
        (property) => property.actual_value
      );
      const result = prices.sort((a, b) => a - b);
      return () => result;
    },
  },
  created() {
    this.fetchAllProperties();
    this.fetchFavoritePropertiesForComparision();
    this.fetchPropertyFeatures();
    this.fetchPropertyTypes();
    this.fetchPropertyLandmarkTypes();
    this.fetchAllDistricts();
    this.getAllDivisions();
    this.getAllSuburbs();
  },
};
</script>

<style scoped>
#property-header {
  margin: 0 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#main-property {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

#result-total {
  flex: 1;
}

#search-field {
  flex: 1;
  display: flex;
  justify-content: flex-start;
}

#advanced-search-field {
  flex: 9;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
}

@media only screen and (max-width: 768px) {
  #property-header {
    flex-direction: column;
  }

  #search-field {
    order: 1;
  }
  #advanced-search-field {
    order: 1;
    flex-wrap: wrap;
  }

  #result-total {
    order: 2;
  }
}
</style>
