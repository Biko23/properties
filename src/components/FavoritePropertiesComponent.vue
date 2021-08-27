<template>
  <div>
    <v-container id="container" fluid>
      <v-row id="property-header">
        <div style="flex: 1">
          <h3>Properties</h3>
          <small style="font-weight: bold"
            >{{ allDetailedCurrentFavoriteList.length }} results</small
          >
        </div>
        <div style="flex: 1">
          <h3 style="color: #3b6ef3">Favorite List</h3>
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
          v-for="(favoriteProperty, index) in allDetailedCurrentFavoriteList"
          :key="index"
        >
          <property-card
            :location="favoriteProperty.name"
            :date="formatDate(favoriteProperty.when_saved)"
            :category="favoriteProperty.category"
            :cost="favoriteProperty.actual_value"
            :postedBy="favoriteProperty.created_by"
            :src="'http://localhost:8002/' + favoriteProperty.snapshot"
            :to="`/view/${favoriteProperty.property_id}?location=${favoriteProperty.name}`"
          >
          </property-card>
        </v-col>
      </v-row> </v-container
    ><br />
  </div>
</template>

<script>
import PropertyCard from "@/components/PropertyCard";
import dateFormat from "dateformat";
// import { formatDate } from '@/helpers/helpers'
import { mapActions, mapGetters } from "vuex";
export default {
  name: "PropertiesForSaleComponent",
  components: {
    PropertyCard,
  },
  data() {
    return {
      myIcon: "mdi-heart",
    };
  },
  methods: {
    ...mapActions([
      "fetchAllDetailedCurrentUserProperties"
    ]),
    // refactoring needed
    formatDate(dateToFormat) {
      let currentDate = new Date();
      let returnedFormattedDate = new Date(dateToFormat);
      let difference = Math.abs(returnedFormattedDate - currentDate);
      let days = (difference / (1000 * 3600 * 24)).toFixed(0);
      console.log(days);

      let result;
      switch (+days) {
        case 0:
          result = "Saved today";
          break;
        case 1:
          result = "Saved a day ago";
          break;
        case 2:
          result = "Saved 2 days ago";
          break;
        case 3:
          result = "Saved 3 days ago";
          break;
        case 4:
          result = "Saved 4 days ago";
          break;
        case 5:
          result = "Saved 5 days ago";
          break;
        case 6:
          result = "Saved 6 days ago";
          break;
        case 7:
          result = "Saved 7 days ago";
          break;
        default:
          result =
            "Saved on " +
            dateFormat(returnedFormattedDate, "dddd, mmmm dS, yyyy");
          break;
      }
      return result;
    },
  },
  computed: {
    ...mapGetters([
      "allDetailedCurrentFavoriteList"
    ]),
  },
  created() {
    this.fetchAllDetailedCurrentUserProperties();
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
