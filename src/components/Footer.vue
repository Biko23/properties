<template>
  <div>
    <v-divider></v-divider><br />
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
            Tel No. (+256) 782-456-789 <br />
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
            id="email-btn"
          >cccug@stanbic.com</p>
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
            <span data-testid="current-year">{{ currentYear() }}</span> —
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
  computed: {
    currentYear() {
      return () => new Date().getFullYear();
    },
  }
};
</script>
