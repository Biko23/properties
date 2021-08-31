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
            :cost="commaFormatted(propertyVisual.actual_value)"
            :postedBy="propertyVisual.created_by"
            :src="'http://localhost:8002/' + propertyVisual.snapshot"
            :to="`/view-rental/${propertyVisual.property_id}?location=${propertyVisual.name}`"
          >
            <template v-slot:share>
              <!--  -->
              <v-menu bottom offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="ma-2" v-bind="attrs" v-on="on" icon>
                    <v-icon>mdi-share-variant</v-icon>
                  </v-btn>
                </template>
                <v-list style="display: flex; flex-direction: column;">
                  <ShareNetwork
                    v-for="network in networks"
                    :network="network.network"
                    style="text-decoration: none;"
                    :key="network.name"
                    :url="`http://localhost:8080/view-rental/${propertyVisual.property_id}?location=${propertyVisual.name}`"
                    :title="sharing.title"
                    :image="sharing.image"
                    :description="sharing.description"
                    :quote="sharing.quote"
                    :hashtags="sharing.hashtags"
                    :twitterUser="sharing.twitterUser"
                  >
                    <v-icon :color="network.color">{{network.icon}}</v-icon>
                  </ShareNetwork>
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
                  style="font-size: 40px; color: #3b6ef3; z-index: 100"
                  @click="onRemove(propertyVisual.property_id)"
                >
                  mdi-heart
                </v-icon>
                <v-icon
                  v-else
                  small
                  class="mr-2"
                  style="font-size: 40px; color: black; z-index: 100"
                  @click="onAdd(propertyVisual.property_id)"
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
  data() {
    return {
      favoriteDialog: "",
      alertMessage: false,
      sharing: {
        title: "Stanbic properties Limited",
        description:'would like you to come and have a look at this property by Stanbic properties',
        image: require('../assets/logo.png'),
        quote: "An Ounce of action is better than 1000 words",
        hashtags: "SHUL",
        twitterUser: "isaacpro01"
      },
      networks: [
        {
          network: "email",
          name: "Email",
          icon: "mdi-email",
          color: "#333333",
          type: "popup"
        },
        {
          network: "facebook",
          name: "Facebook",
          icon: "mdi-facebook",
          color: "#1877f2",
          type: "popup"
        },
        {
          network: 'linkedin',
          name: "LinkedIn",
          icon: "mdi-linkedin",
          color: "#007bb5",
          type: "popup"
        },
        {
          network: 'skype',
          name: "Skype",
          icon: "mdi-skype",
          color: "#00aff0",
          type: "popup"
        },
        {
          network: 'telegram',
          name: "Telegram",
          icon: "mdi-telegram",
          color: "#0088cc",
          type: "popup"
        },
        {
          network: 'twitter',
          name: "Twitter",
          icon: "mdi-twitter",
          color: "#1da1f2"
        },
        {
          network: 'whatsapp',
          name: "Whatsapp",
          icon: "mdi-whatsapp",
          color: "#25d366",
          type: "popup",
        },
      ]
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
      console.log(days);

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
  },
  computed: {
    ...mapGetters([
      "loginState",
      "allPropertyForRent",
      "currentLoggedinUser",
      "allCurrentUserFavoriteProperties",
    ]),
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
