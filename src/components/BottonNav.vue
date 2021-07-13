<template>
     <div id="col-hidden">
      <v-app-bar color="#4477fb" dense dark>
        <v-btn value="recent" style="background-color:#4477fb;width">
          <img
            src="https://res.cloudinary.com/diued7ugb/image/upload/v1625949058/sms_black_24dp_3_og1r7y.png"
            alt=""
            width="30"
            srcset=""
            style=""
          />
          <span style="color:#ef9e9e;">14</span>

          <!-- <v-icon>mdi-history</v-icon> -->
        </v-btn>
        <v-btn style="background-color:#4477fb;">
          <img
            src="https://res.cloudinary.com/diued7ugb/image/upload/v1625949073/notifications_black_24dp_2_jvvady.png"
            alt=""
            width="30"
            srcset=""
            style=""
          />
          <span style="color:#ef9e9e;">14</span>

          <!-- <v-icon>mdi-history</v-icon> -->
        </v-btn>

        <v-btn style="background-color:#4477fb;">
          <img
            src="https://res.cloudinary.com/diued7ugb/image/upload/v1625948894/home_black_24dp_5_sng2rd.png"
            alt=""
            width="30"
            srcset=""
            style=""
          />

          <!-- <v-icon>mdi-history</v-icon> -->
        </v-btn>

        <v-btn value="recent" style="width: 80px; margin-left: auto;background-color:#4477fb;">
          <span>Buy/Rent</span>

          <!-- <v-icon>mdi-history</v-icon> -->
        </v-btn>

        <v-btn value="recent" style="width: 60px; margin-left: auto; background-color:#4477fb;">
          <span>Sell</span>

          <!-- <v-icon>mdi-history</v-icon> -->
        </v-btn>
      </v-app-bar>
    </div>
</template>
<script>
export default {
    name:'BottomNav'
}
</script>

<style scoped>
#main-div {
  background-color: #3b6ef3;
}
#form-row {
  background-color: #e7f0ff;
  width: 1000px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 6px;
}
#description {
  margin-top: -200px;
}
.custom-placeholer-color input::placeholder {
  color: red !important;
  opacity: 1;
}

.custom-label-color .v-label .solo {
  color: blue;
  opacity: 1;
}
#col-hidden{
    display: none;
}
@media only screen and (max-width: 768px) {
  #main-div {
    background-color: #3b6ef3;
  }
  #form-row {
    background-color: #e7f0ff;
    width: auto;
    margin-left: auto;
    margin-right: auto;
    border-radius: 6px;
  }
  #description {
    margin-top: auto;
  }
  #col-hidden{
    display: block;
}
}
</style>