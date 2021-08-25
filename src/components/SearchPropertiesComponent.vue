<template>
  <div>
    <v-container id="container" fluid>
      <v-row id="property-header">
        <div id="result-total">
          <h3>Properties</h3>
          <small style="font-weight: bold"
            >{{ allSearchedResults.length }} results</small
          >
        </div>
        <div id="search-field" style="position: relative">
          <v-autocomplete
            background-color="white"
            filled
            :outlined="true"
            append-icon=""
            :autofocus="true"
            auto-select-first
            placeholder="Search Properties"
            :items="allAutocompletedList"
            v-model="searchKeyword"
          />
          <v-icon
            small
            class="mr-2"
            style="
              font-size: 40px;
              color: blue;
              position: absolute;
              right: 0;
              top: 10%;
              z-index: 100;
            "
            @click.stop="searchProperties"
          >
            mdi-magnify
          </v-icon>
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
          v-for="(currentProperty, index) in allSearchedResults"
          :key="index"
        >
          <property-card
            :location="currentProperty.name"
            :date="formatDate(currentProperty.when_created)"
            :cost="currentProperty.actual_value"
            :postedBy="currentProperty.created_by"
            :src="'http://localhost:8002/' + currentProperty.snapshot"
            :to="`/view/${currentProperty.property_id}?location=${currentProperty.name}`"
            :onClick="changeIcon"
            :icon="myIcon"
          />
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
  //   components: {
  //     'v-header': Header,
  //     'v-button': Button
  //   }
  name: "SearchPropertiesComponent",
  components: {
    PropertyCard,
  },
  props: ["keyword"],
  data: () => ({
    searchKeyword: "",
    myIcon: "mdi-heart",
  }),
  methods: {
    ...mapActions(["fetchPropertiesBySearchKeyword", "fetchAutoCompleteWords"]),
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
          result = dateFormat(returnedFormattedDate, "dddd, mmmm dS, yyyy");
          break;
      }
      return result;
    },
    async searchProperties() {
      try {
        await this.fetchPropertiesBySearchKeyword(this.searchKeyword);
        this.searchKeyword = "";
      } catch (error) {
        console.log(error);
      }
    },
    changeIcon() {
      this.myIcon === "mdi-heart"
        ? (this.myIcon = "mdi-heart-outline")
        : (this.myIcon = "mdi-heart");
    },
  },
  computed: {
    ...mapGetters(["allSearchedResults", "allAutocompletedList"]),
  },
  created() {
    this.fetchPropertiesBySearchKeyword();
    this.fetchAutoCompleteWords();
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

#result-total {
    flex: 1
}
/* #search-section {
    display: flex; 
    flex: 1;
    flex-direction: row;
    flex-wrap: wrap; 
    align-items: center;
} */

#search-field {
  flex: 1;
  display: flex;
  justify-content: flex-start;
}
#main-property {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

::placeholder {
  color: #3b6ef3;
  font-size: 1rem;
  padding: 30px;
  font-weight: 250;
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
