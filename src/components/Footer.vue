<template>
  <div>
    <v-divider></v-divider><br />
    <v-container fluid style="background-color: #3b6ef3">
      <v-row>
        <!-- <v-footer color="#3b6ef3"> -->
        <v-col>
          <v-card-text style="text-align: center">
            <v-btn
              v-for="icon in icons"
              :key="icon"
              class="mx-4 white--text"
              icon
            >
              <v-icon size="24px">
                {{ icon }}
              </v-icon>
            </v-btn>
          </v-card-text>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid style="background-color: #3b6ef3; color: #ffff">
      <v-row>
        <v-col md="3" xs="6">
          <h3 style="color: #ffff">Our Address</h3>
          <p
            style="
              font-size: 14px;
              font-style: normal;
              font-weight: 300;
              line-height: 30px;
              letter-spacing: 0em;
              color: #fffff;
            "
          >
            Stanbic Bank Uganda, Crested Towers <br />
            Plot 17, Hannington Road, <br /> 
            Kampala - Uganda
          </p>
          <p
            style="
              font-size: 14px;
              font-style: normal;
              font-weight: 300;
              line-height: 30px;
              letter-spacing: 0em;
              color: #ffff;
            "
          >
            cccug@stanbic.com
          </p>
        </v-col>

        <v-col md="3" xs="6">
          <h3>Other Useful Links</h3>
          <p
            style="
              color: #ffff;
              font-size: 14px;
              font-style: normal;
              font-weight: 300;
              line-height: 30px;
              letter-spacing: 0em;
            "
          >
            Latest Events
          </p>
          <p
            style="
              font-size: 14px;
              font-style: normal;
              font-weight: 300;
              line-height: 30px;
              letter-spacing: 0em;
              color: #ffff;
            "
          >
            Terms and Conditions
          </p>
          <p
            style="
              font-size: 14px;
              font-style: normal;
              font-weight: 300;
              line-height: 30px;
              letter-spacing: 0em;
              color: #ffff;
            "
          >
            Privacy Policy
          </p>
          <p
            style="
              font-size: 14px;
              font-style: normal;
              font-weight: 300;
              line-height: 30px;
              letter-spacing: 0em;
            "
          >
            Careers
          </p>
          <p
            style="
              font-size: 14px;
              font-style: normal;
              font-weight: 300;
              line-height: 30px;
              letter-spacing: 0em;
            "
          >
            Stanbic Bank Uganda
          </p>
        </v-col>
        <v-col cols="12" md="3" id="col-hiden">
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
    <v-divider></v-divider>
    <v-container fluid style="background-color: #3b6ef3">
      <v-row>
        <v-col>
          <v-card-text class="white--text" style="text-align: center">
            {{ new Date().getFullYear() }} —
            <small
              >©️ Stanbic Bank properties All right reserved. Developed By
              flyhub Limited</small
            >
          </v-card-text>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "Footer",
};
</script>
