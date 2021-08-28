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
          <h3>Properties for Sale</h3>
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
            cache-items
            auto-select-first
            placeholder="Search Properties"
            :items="allAutocompletedList"
            v-model="searchKeyword"
            :search-input.sync="search"
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
            :cost="commaFormatted(currentProperty.actual_value)"
            :category="currentProperty.category"
            :postedBy="currentProperty.created_by"
            :src="'http://localhost:8002/' + currentProperty.snapshot"
            :to="`/view/${currentProperty.property_id}?location=${currentProperty.name}`"
          >
            <!--  -->
            <template v-if="loginState">
              <template
                v-if="
                  currentLoggedinUser.username !== currentProperty.created_by
                "
              >
                <v-icon
                  v-if="
                    allCurrentUserFavoriteProperties.includes(
                      currentProperty.property_id
                    )
                  "
                  small
                  class="mr-2"
                  style="font-size: 40px; color: #3b6ef3; z-index: 100"
                  @click="onRemove(currentProperty.property_id)"
                >
                  mdi-heart
                </v-icon>
                <v-icon
                  v-else
                  small
                  class="mr-2"
                  style="font-size: 40px; color: black; z-index: 100"
                  @click="onAdd(currentProperty.property_id)"
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
                style="font-size: 40px; color: black; z-index: 100"
                @click="showLoginMessage"
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
    favoriteDialog: "",
    alertMessage: false,
    searchKeyword: "",
    search: null,
    searchKey: "",
    myIcon: "mdi-heart",
  }),
  methods: {
    ...mapActions([
      "fetchPropertiesBySearchKeyword",
      "fetchAutoCompleteWords",
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
    async searchProperties() {
      try {
        if (this.search != null) {
          this.searchKey = this.search;
        } else {
          this.searchKey = this.searchKeyword;
        }
        await this.fetchPropertiesBySearchKeyword(this.searchKey);
        this.searchKeyword = "";
        this.search = null;
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
    ...mapGetters([
      "allSearchedResults",
      "allAutocompletedList",
      "currentLoggedinUser",
      "allCurrentUserFavoriteProperties",
      "loginState",
    ]),
  },
  created() {
    this.fetchPropertiesBySearchKeyword();
    this.fetchAutoCompleteWords();
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

#result-total {
  flex: 1;
}

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
