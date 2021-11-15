<template>
  <div>
    <base-dialog :message="message" :title="title" :dialogState="state">
        <template v-slot:button>
            <v-btn text @click="state = !state">close</v-btn>
        </template>
    </base-dialog>
    <v-container id="container" fluid>
      <v-row id="property-header">
        <div id="result-total">
          <h3>Rentals</h3>
          <small style="font-weight: bold"
            >{{ allPropertyForRent.length }} results</small
          >
        </div>
        <div id="search-field">
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
        </div>
      </v-row>
      <v-row id="main-property">
        <v-col
          cols="12"
          xl="2"
          lg="3"
          md="4"
          sm="6"
          xs="12"
          v-for="(propertyVisual, index) in filteredProperties()"
          :key="index"
        >
          <property-card
            :location="propertyVisual.name"
            :date="formatDate(propertyVisual.when_created)"
            :category="propertyVisual.category"
            :propertyCode="propertyVisual.property_number"
            :cost="commaFormatted(propertyVisual.actual_value)"
            :postedBy="propertyVisual.created_by"
            :src="'http://localhost:8002/' + propertyVisual.snapshot"
            :to="`/view-rental/${propertyVisual.property_id}?code=${propertyVisual.property_number}&location=${propertyVisual.name}`"
          >
            <template v-slot:share>
              <v-menu bottom offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="ma-2" v-bind="attrs" v-on="on" icon>
                    <v-icon 
                      style="font-size: 36px;"
                      title="Share this property"
                      >mdi-share-variant</v-icon>
                  </v-btn>
                </template>
                <v-list style="display: flex; flex-direction: column;">
                  <network-sharing @click.native="logActivity(propertyVisual.property_id)"
                    :url="`http://localhost:8080/view-rental/${propertyVisual.property_id}?code=${propertyVisual.property_number}&location=${propertyVisual.name}`"
                  />
                </v-list>
              </v-menu>
            </template>
            <!--  -->
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
                  small
                  class="mr-2"
                  style="font-size: 40px; color: #3b6ef3; z-index: 100; padding-bottom: 7px;"
                  @click="onRemove(propertyVisual.property_id)"
                  title="Add to Favorites"
                >
                  mdi-heart
                </v-icon>
                <v-icon
                  v-else
                  small
                  class="mr-2"
                  style="font-size: 40px; color: black; z-index: 100; padding-bottom: 7px;"
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
                small
                class="mr-2"
                style="font-size: 40px; color: black; z-index: 100; padding-bottom: 7px;"
                @click="showLoginMessage"
                title="Add to Favorites"
              >
                mdi-heart-outline
              </v-icon>
            </template>
            <!--  -->
          </property-card>
        </v-col>
      </v-row> </v-container
    ><br />
  </div>
</template>

<script>
import PropertyCard from "@/components/PropertyCard";
import dateFormat from "dateformat";
import { mapActions, mapGetters } from "vuex";
import NetworkSharing from './BaseShareComponent.vue';
export default {
  name: "PropertiesForRentComponent",
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
      state: false
    };
  },
  methods: {
    ...mapActions([
      "fetchPropertyForRent",
      "fetchPropertyCategories",
      "fetchFavoritePropertiesForComparision",
      "removePropertyFromFavorites",
      "addPropertyToFavorites",
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
      }, 3000);
    },
    commaFormatted(amount) {
      let price = amount.toLocaleString("en-US");
      return price;
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
      this.defaultResponse("Please login to add this property to your favorites", 'Error', true);
    },
    async fetchAllRentalProperties() {
      try {
        await this.fetchPropertyCategories()
        .then(response => {
          if(response.data.status == 1){
            this.fetchPropertyForRent()
            .then(sales => {
              if(sales.data.status == 0){
                this.defaultResponse(sales.data.message, 'Error', true);
              }
            }).catch(error => this.defaultResponse(error.message, 'Error', true))
          } else {
            this.defaultResponse(response.data.message, 'Error', true);
          }
        })
      } catch (error) {
        this.defaultResponse(error.message, 'Error', true);
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
    }
  },
  computed: {
    ...mapGetters([
      "loginState",
      "allPropertyForRent",
      "currentLoggedinUser",
      "allCurrentUserFavoriteProperties",
    ]),
    filteredProperties() {
      if (this.selection === null && this.endPrice === null) {
        return () => this.allPropertyForRent;
      } else if (this.selection !== null) {
        this.startPrice = 0;
        this.endPrice = null;
        return () =>
          (this.allPropertyForRent = this.allPropertyForRent.filter(
            (property) =>
              property.category == this.selection ||
              property.name == this.selection
          ));
      } else if (this.endPrice !== null) {
        this.selection = null;
        if (this.startPrice > this.endPrice) {
          return () =>
            (this.allPropertyForRent = this.allPropertyForRent.filter(
              (property) =>
                property.actual_value <= this.startPrice &&
                property.actual_value >= this.endPrice
            ));
        } else {
          return () =>
            (this.allPropertyForSale = this.allPropertyForRent.filter(
              (property) =>
                property.actual_value >= this.startPrice &&
                property.actual_value <= this.endPrice
            ));
        }
      }
    },
    propertyCategories() {
      return () => this.allPropertyForRent.map((property) => property.category);
    },
    propertyLocation() {
      return () => this.allPropertyForRent.map((property) => property.name);
    },
    propertyCost() {
      const prices = this.allPropertyForRent.map(
        (property) => property.actual_value
      );
      const result = prices.sort((a, b) => a - b);
      return () => result;
    },
  },
  created() {
    this.fetchAllRentalProperties();
    this.fetchFavoritePropertiesForComparision();
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

@media only screen and (max-width: 768px) {
  #property-header {
    flex-direction: column;
  }

  #search-field {
    order: 1;
  }

  #result-total {
    order: 2;
  }
}
</style>
