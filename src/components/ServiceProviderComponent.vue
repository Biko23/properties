<template>
  <div>
    <top-nav />
    <main-nav />
    <v-container>
      <v-row>
        <v-col style="text-align: center">
          <h1>List of trusted service providers</h1>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <!-- <v-row>
        <v-col cols="12" sm="12" md="3" lg="3">
          <v-card class="mx-auto" max-width="344">
            <v-img src="../assets/signup.png" height="200px"></v-img>

            <v-card-title> Top western road trips </v-card-title>

            <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

            <v-card-actions>
              <v-btn color="orange lighten-2" text> Explore </v-btn>

              <v-spacer></v-spacer>

              <v-btn icon @click="show = !show">
                <v-icon>{{
                  show ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                  I'm a thing. But, like most politicians, he promised more than
                  he could deliver. You won't have time for sleeping, soldier,
                  not with all the bed making you'll be doing. Then we'll go
                  with that data file! Hey, you add a one and two zeros to that
                  or we walk! You're going to do his laundry? I've got to find a
                  way to escape.
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="3" lg="3">
          <v-card class="mx-auto" max-width="344">
            <v-img src="../assets/login.png" height="200px"></v-img>

            <v-card-title> Top western road trips </v-card-title>

            <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

            <v-card-actions>
              <v-btn color="orange lighten-2" text> Explore </v-btn>

              <v-spacer></v-spacer>

              <v-btn icon @click="show = !show">
                <v-icon>{{
                  show ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                  I'm a thing. But, like most politicians, he promised more than
                  he could deliver. You won't have time for sleeping, soldier,
                  not with all the bed making you'll be doing. Then we'll go
                  with that data file! Hey, you add a one and two zeros to that
                  or we walk! You're going to do his laundry? I've got to find a
                  way to escape.
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="3" lg="3">
          <v-card class="mx-auto" max-width="344">
            <v-img src="../assets/signup.png" height="200px"></v-img>

            <v-card-title> Top western road trips </v-card-title>

            <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

            <v-card-actions>
              <v-btn color="orange lighten-2" text> Explore </v-btn>

              <v-spacer></v-spacer>

              <v-btn icon @click="show = !show">
                <v-icon>{{
                  show ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                  I'm a thing. But, like most politicians, he promised more than
                  he could deliver. You won't have time for sleeping, soldier,
                  not with all the bed making you'll be doing. Then we'll go
                  with that data file! Hey, you add a one and two zeros to that
                  or we walk! You're going to do his laundry? I've got to find a
                  way to escape.
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="3" lg="3">
          <v-card class="mx-auto" max-width="344">
            <v-img src="../assets/login.png" height="200px"></v-img>

            <v-card-title> Top western road trips </v-card-title>

            <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

            <v-card-actions>
              <v-btn color="orange lighten-2" text> Explore </v-btn>

              <v-spacer></v-spacer>

              <v-btn icon @click="show = !show">
                <v-icon>{{
                  show ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                  I'm a thing. But, like most politicians, he promised more than
                  he could deliver. You won't have time for sleeping, soldier,
                  not with all the bed making you'll be doing. Then we'll go
                  with that data file! Hey, you add a one and two zeros to that
                  or we walk! You're going to do his laundry? I've got to find a
                  way to escape.
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row> -->
      <v-row id="main-property">
        <v-col
          cols="12"
          xl="2"
          lg="3"
          md="4"
          sm="6"
          xs="12"
          v-for="vendor in allVendors"
          :key="vendor.vendor_id"
        >
          <service-provider-card
            :vendor_name="vendor.vendor_name"
            :vendor_primary_phone_number="vendor.vendor_primary_phone_number"
            :vendorCategory="vendor.vendorCategory.vendor_category_name"
            :points="vendor.points"
            ><div>
              <v-btn  icon
              color="primary" @click="likingVendor(vendor)" 
                ><v-icon>mdi-thumb-up</v-icon></v-btn
              >
              <v-btn icon @click="unlikingVendor(vendor)" ><v-icon>mdi-thumb-down</v-icon></v-btn>
            </div>
          </service-provider-card>

          <!-- C:\Users\A241901\Documents\project\stanbicproperties-marketplace\property-visuals\src\main\resources\uploads -->
        </v-col>
      </v-row>
    </v-container>

    <!-- <ul>
        <li v-for="(vendor) in vendors"  :key="vendor.vendor_name">
          
         
        </li>
      </ul> -->
    <!-- 
      <v-list>
        <v-list-item v-for="(vendor,vendor_name) in allVendors" :key="vendor_name">
            <v-list-item-content>
            <v-list-item-title v-text="vendor.vendor_name"></v-list-item-title>   
          </v-list-item-content>
        </v-list-item
      ></v-list>
      <h1>hello</h1> -->

    <Footer />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Footer from "./Footer.vue";
import MainNav from "./MainNav.vue";
import TopNav from "./TopNav.vue";
import ServiceProviderCard from "./ServiceProviderCard.vue";
export default {
  components: { Footer, MainNav, TopNav, ServiceProviderCard },
  name: "ServiceProviderComponent",

  data: () => ({
    show: false,
    like:false,
    vendors: [],
    newVendor: {
      vendor_name: "",
      vendor_primary_phone_number: "",
      vendor_secondary_phone_number: "",
      vendor_primary_email: "",
      vendor_secondary_email: "",
      category_type: "",
    },
  }),
  computed: {
    ...mapGetters(["allVendors", "currentLoggedinUser","likeState"]),
  },

  created() {
    this.fetchVendors();
  },
  methods: {
    ...mapActions(["fetchVendors", "likeVendor", "unLikeVendor"]),

    async likingVendor(item) {
      const data = {
        vendor_id: item.vendor_id,
        liked_by: this.currentLoggedinUser.user_id,
      };
      try {
        const response = await this.likeVendor(data);
         console.log(response);
        // if (response.status === 201 || response.status === 200) {
        //  this.like = true;
        // }
      } catch (error) {
        console.log(error);
      }
    },

    async unlikingVendor(item) {
      const data = {
        vendor_id: item.vendor_id,
        disliked_by: this.currentLoggedinUser.user_id,
      };
      try {
        const response = await this.unLikeVendor(data);
        console.log(response);
        if (response.status === 201 || response.status === 200) {
          this.like = true
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>