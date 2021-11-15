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
          <transition name="slide-fade">
            <!-- v-if="favoriteProperty.property_id ? hide : ''" -->
            <!-- v-if="hide" -->
            <property-card
              :location="favoriteProperty.name"
              :date="formatDate(favoriteProperty.when_saved)"
              :category="favoriteProperty.category"
              :propertyCode="favoriteProperty.property_number"
              :cost="commaFormatted(favoriteProperty.actual_value)"
              :postedBy="favoriteProperty.created_by"
              :src="'http://localhost:8002/' + favoriteProperty.snapshot"
              :to="
                favoriteProperty.listed_for_name == ('Rent' || 'rent' || 'RENT')
                  ? `/view-rental/${favoriteProperty.property_id}?code=${favoriteProperty.property_number}&location=${favoriteProperty.name}`
                  : `/view/${favoriteProperty.property_id}?code=${favoriteProperty.property_number}&location=${favoriteProperty.name}`
              "
            >
              <template v-slot:type>
                <small style="font-size: 14px"
                  >Type: <b>{{ favoriteProperty.listed_for_name }}</b></small
                ><br />
              </template>
              <template v-slot:default>
                <v-icon
                  small
                  class="mr-2"
                  style="font-size: 40px; color: #3b6ef3; z-index: 100"
                  @click="onRemove(favoriteProperty.property_id)"
                >
                  mdi-heart
                </v-icon>
              </template>
            </property-card>
          </transition>
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
      hide: true,
    };
  },
  methods: {
    ...mapActions([
      "fetchAllDetailedCurrentUserProperties",
      "removePropertyFromFavoriteSection",
      "postAUserLog",
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
    commaFormatted(amount) {
      let price = amount.toLocaleString("en-US");
      return price;
    },
    onRemove(property_id) {
      this.removePropertyFromFavoriteSection(property_id).then(() => {
        const payload = {
          activity: `Removed Property with id ${property_id} from favorites`,
          button_clicked: "Favorite Button",
        };
        this.postAUserLog(payload);
        this.hide = false;
      });
    },
  },
  computed: {
    ...mapGetters(["allDetailedCurrentFavoriteList"])
  },
  created() {
    this.postAUserLog({
      activity: "Visited the favorites page",
      button_clicked: "View Favorite Page",
    });
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

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
