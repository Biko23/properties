<template>
  <div>
    <v-container id="container" fluid>
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
            :cost="commaFormatted(propertyVisual.actual_value)"
            :postedBy="propertyVisual.created_by"
            :src="'http://localhost:8002/' + propertyVisual.snapshot"
            :to="`/view-rental/${propertyVisual.property_id}?location=${propertyVisual.name}`"
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
                  <network-sharing
                    :url="`http://localhost:8080/view-rental/${propertyVisual.property_id}?location=${propertyVisual.name}`"
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

          <!-- C:\Users\A241901\Documents\project\stanbicproperties-marketplace\property-visuals\src\main\resources\uploads -->
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
      favoriteDialog: "",
      alertMessage: false,
       selection: null,
      startPrice: 0,
      endPrice: null
    };
  },
  methods: {
    ...mapActions([
      "fetchPropertyForRent",
      "fetchPropertyCategories",
      "fetchFavoritePropertiesForComparision",
      "removePropertyFromFavorites",
      "addPropertyToFavorites",
    ]),
    commaFormatted(amount) {
      let price = amount.toLocaleString("en-US");
      return price;
    },
    formatDate(dateToFormat) {
      let currentDate = new Date();
      let returnedFormattedDate = new Date(dateToFormat);
      let difference = Math.abs(returnedFormattedDate - currentDate);
      let days = (difference / (1000 * 3600 * 24)).toFixed(0);

      let result;
      switch (+days) {
        case 0:
          result = "Added today";
          break;
        case 1:
          result = "1 days ago";
          break;
        case 2:
          result = "2 days ago";
          break;
        case 3:
          result = "3 days ago";
          break;
        case 4:
          result = "4 days ago";
          break;
        case 5:
          result = "5 days ago";
          break;
        case 6:
          result = "6 days ago";
          break;
        case 7:
          result = "7 days ago";
          break;
        default:
          result = dateFormat(returnedFormattedDate, "ddd, mmm dS, yyyy");
          break;
      }
      return result;
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
    async fetchAllRentalProperties() {
      try {
        await this.fetchPropertyCategories().then(() =>
          this.fetchPropertyForRent()
        );
      } catch (error) {
        throw new Error("Failed to fetch data");
      }
    },
     resetSelection() {
      if (this.selection != null || this.endPrice != null) {
        this.selection = null;
        this.startPrice = 0;
        this.endPrice = null;
      }
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
