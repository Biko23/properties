<template>
  <div>
    <v-container id="container" fluid>
      <v-row id="property-header">
        <div style="flex: 1">
          <h3>Rentals</h3>
          <small style="font-weight: bold"
            >{{ allPropertyForRent.length }} results</small
          >
        </div>
        <div style="flex: 1">
          <h3 style="color: #3b6ef3">RENT PROPERTY HERE</h3>
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
          v-for="propertyVisual in allPropertyForRent"
          :key="propertyVisual.visuals_id"
        >
          <property-card
            :location="propertyVisual.name"
            :date="formatDate(propertyVisual.when_created)"
            :category="propertyVisual.category"
            :cost="propertyVisual.actual_value"
            :postedBy="propertyVisual.created_by"
            :src="'http://localhost:8002/' + propertyVisual.snapshot"
            :to="`/view-rental/${propertyVisual.property_id}?location=${propertyVisual.name}`"
          >
            <template v-if="currentLoggedinUser.username !== propertyVisual.created_by">
                <v-icon
               v-if="allCurrentUserFavoriteProperties.includes(propertyVisual.property_id)"
                small
                class="mr-2"
                style="font-size: 40px; color: blue; z-index: 100"
                @click="onAdd"
              >
                mdi-heart
              </v-icon>
              <v-icon
                v-else
                small
                class="mr-2"
                style="font-size: 40px; color: black; z-index: 100"
                @click="onRemove"
              >
                mdi-heart-outline
              </v-icon>
            </template>
            <template v-else />
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
export default {
  name: "PropertiesForRentComponent",
  components: {
    PropertyCard,
  },
  methods: {
    ...mapActions(["fetchPropertyForRent", "fetchPropertyCategories", "fetchFavoritePropertiesForComparision"]),
    formatDate(dateToFormat) {
      let currentDate = new Date();
      let returnedFormattedDate = new Date(dateToFormat);
      let difference = Math.abs(returnedFormattedDate - currentDate);
      let days = (difference / (1000 * 3600 * 24)).toFixed(0);
      console.log(days);

      let result;
      switch (+days) {
        case 0:
          result = "Added now";
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
    onRemove() {},
    onAdd() {},
    async fetchAllRentalProperties() {
      try {
        await this.fetchPropertyCategories().then(() =>
          this.fetchPropertyForRent()
        );
      } catch (error) {
        throw new Error("Failed to fetch data");
      }
    },
  },
  computed: {
    ...mapGetters(["allPropertyForRent", "currentLoggedinUser", "allCurrentUserFavoriteProperties"]),
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
</style>
