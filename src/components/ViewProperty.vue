<template>
  <div>
    <top-nav />
    <main-nav />
    <v-container>
      <v-row>
        <v-col cols="12" sm="12" md="8" lg="8">
          <v-carousel>
            <v-carousel-item
              v-for="(item, i) in items"
              :key="i"
              :src="item.src"
              reverse-transition="fade-transition"
              transition="fade-transition"
            ></v-carousel-item>
          </v-carousel>
        </v-col>
        <v-col>
          <div style="background-color: #f2f2f2; border-radius: 6px">
            <v-col>
              <p style="color: #3b6ef3">
                Posted By: <br />
                <span>Property Owner</span>
              </p>
            </v-col>
            <v-col>
              <v-btn color="primary" style="width: 160px">Call</v-btn>
              <v-btn color="white" style="margin-left: 10px; width: 160px">
                <span style="color: #3b6ef3"> Chat</span></v-btn
              >
            </v-col>

            <v-col>
              <v-btn color="primary" block>Make an Offer</v-btn>
            </v-col>
          </div>
          <br />
          <div style="background-color: #f2f2f2; border-radius: 6px">
            <v-col>
              <p style="color: #3b6ef3">
                Price:
                <span style="color: black; margin-left: 230px">$150,000</span>
                <br />
                <span
                  >Equavalent To:
                  <span style="color: black; margin-left: 140px"
                    >UGX 400,000</span
                  ></span
                >
              </p>
            </v-col>

            <v-col>
              <v-btn color="primary" block>Make an Offer</v-btn>
            </v-col>
          </div>
          <div>
            <v-col>
              <h3>House for rent</h3>
              <p style="font-weight: 300">
                2 beds, 2 bathrooms, 1500 sqft-House for rent <br />
                plot 3421, Muyenga, Kampala
              </p>
            </v-col>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col>
          <v-img
            src="../assets/houseview1.png"
            :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
            aspect-ratio="1"
            class="grey lighten-2"
            height="200"
          ></v-img>
        </v-col>
        <v-col>
          <v-img
            src="../assets/houseview2.png"
            :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
            aspect-ratio="1"
            class="grey lighten-2"
            height="200"
          ></v-img>
        </v-col>
        <v-col>
          <v-img
            src="../assets/houseview3.png"
            :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
            aspect-ratio="1"
            class="grey lighten-2"
            height="200"
          ></v-img>
        </v-col>
        <v-col cols="12" md="4">
          <v-img
            src="https://res.cloudinary.com/diued7ugb/image/upload/v1626370006/google-maps-759_1_zqu50z.png"
            :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
            aspect-ratio="1"
            class="grey lighten-2"
            height="200"
          ></v-img>
        </v-col>
      </v-row>
    </v-container>


    <v-container>
      <v-row>
        <v-col>
          <v-card color="basil">
            <v-card-title class="text-center justify-center py-6">
              <h1 class="font-weight-bold text-h6 basil--text">More property Details</h1>
            </v-card-title>

            <v-tabs
              v-model="tab"
              background-color="transparent"
              color="basil"
              grow
            >
              <v-tab>
                try 1
              </v-tab>
              <v-tab>
                try 2
              </v-tab>
              <v-tab>
                try 3
              </v-tab>
              <v-tab>
                try 4
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item >
                <v-card color="basil" flat>
                  <v-card-text>
                      <p>This is for the first</p>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item >
                <v-card color="basil" flat>
                  <v-card-text>
                      <p>This is for the first</p>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item >
                <v-card color="basil" flat>
                  <v-card-text>
                      <p>This is for the second</p>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item >
                <v-card color="basil" flat>
                  <v-card-text>
                      <p>This is for the Third</p>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import MainNav from "./MainNav.vue";
import TopNav from "./TopNav.vue";
export default {
  components: { TopNav, MainNav },
  name: "ViewProperty",
  data: () => ({
    tab: null,
    itemss: ["Appetizers", "Entrees", "Deserts", "Cocktails"],
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, ",
    items: [
      {
        src: "https://res.cloudinary.com/diued7ugb/image/upload/v1626369977/og_dqwykp.jpg",
      },
      {
        src: "https://res.cloudinary.com/diued7ugb/image/upload/v1625732723/house1_svrut7.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
      },
    ],
  }),
};
</script>

<style scoped>
</style>