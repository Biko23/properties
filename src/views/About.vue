<template>
  <div class="about">
    <v-container class="about-us-container" fluid>
      <v-row>
        <v-col sm="1"></v-col>
        <v-col
          cols="12"
          md="3"
          xs="12"
          style="margin-left: -33px; margin-top: 60px"
        >
          <v-img
            src="https://res.cloudinary.com/diued7ugb/image/upload/v1625732723/house1_svrut7.jpg"
            gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
          ></v-img>
        </v-col>

        <v-col cols="12" md="4" xs="12" style="margin-top: 25px">
          <div style="text-align: left">
            <h3><span style="color: #3b6ef3"> ABOUT </span>US</h3>
          </div>
          <p
            style="
              font-size: 13px;
              font-style: normal;
              font-weight: 300;
              line-height: 20px;
              letter-spacing: 0em;
              margin-right: 50px;
              color: black;
            "
          >
            Stanbic properties is building the first modern real estate platform
            in Uganda, pairing the industry’s top talent with technology to make
            the search, buy, rent and sell experience intelligent and seamless
          </p>
          <p
            style="
              font-size: 13px;
              font-style: normal;
              font-weight: 300;
              line-height: 20px;
              letter-spacing: 0em;
              margin-right: 50px;
              color: black;
            "
          >
            With an Exprienced team, Stanbic Properties is led by a team of
            experienced innovators. These proven pioneers across technology,
            real estate, marketing, and finance are solving real estate’s most
            complex challenges.
          </p>
        </v-col>
        <v-col cols="12" md="4" xs="12" style="margin-top: 25px">
          <div style="text-align: left">
            <h3><span style="color: #3b6ef3"> WHY </span>US</h3>
          </div>
          <p
            style="
              font-size: 13px;
              font-style: normal;
              font-weight: 300;
              line-height: 20px;
              letter-spacing: 0em;
              margin-right: 50px;
            "
          >
            As an innovative residential real estate firm, we empower our agents
            so they have more time for advising their clients. With the
            solutions-driven mindset of a startup and the sophistication of a
            luxury brand, Stanbic Properties is the future of real estate.
          </p>
          <p
            style="
              font-size: 13px;
              font-style: normal;
              font-weight: 300;
              line-height: 20px;
              letter-spacing: 0em;
              margin-right: 50px;
            "
          >
            To lead the industry requires the smartest tools built by the
            brightest minds across engineering, design, and strategy. Through
            our proprietary platform, SBL is changing how agents and clients
            navigate the process of finding or selling a home.
          </p>
        </v-col>
        <v-col sm="1"></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>

<style scoped>
.about-us-container {
  background-color: #f7faff;
  height: 310px;
}

@media only screen and (max-width: 796px) {
  .about-us-container {
    background-color: #ebeef2;
    height: auto;
  }
}
</style>
