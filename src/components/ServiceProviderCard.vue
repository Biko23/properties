<template>
  <!-- <router-link :to="to" style=" text-decoration:none;"> -->
  <v-card max-width="auto">
    <v-card-subtitle class="time">Name {{ vendor_name }} </v-card-subtitle>
    <v-img :src="src" height="200px"></v-img>
    <v-card-subtitle>
      <small style="font-weight: bold; color: #000000; margin-bottom: 0">{{
        vendor_primary_phone_number
      }}</small
      ><br />
      <small>Category: {{ vendorCategory }}</small
      ><br />
      <small>Likes: {{ points }}</small>
    </v-card-subtitle>
    <!-- <v-btn style="margin: 5px" @click="onClick">Like</v-btn> -->
    <slot></slot>
    <!-- <v-btn style="margin: 5px">Deslike</v-btn> -->
  </v-card>
  <!-- </router-link> -->
</template>

<script>

export default {
  name: "PropertyCard",
  data: () => ({
    vendorCategories: [],
    editedIndex: -1,
   
  }),
 
//   methods: {
  

//     async likingVendor(item) {
//       console.log(item);
//       try {
//         const response = await this.likeVendor(this.newVendor);
//         console.log(response);
//         if (response.status === 201 || response.status === 200) {
//           this.$router.push("/login");
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     },
//   },
  props: {
    vendor_name: {
      type: String,
      default: "No name",
    },
    vendor_primary_phone_number: {
      type: String,
      default: "No available email",
    },
    vendorCategory: {
      type: String,
      default: "Vendor Category",
    },
    points: {
      type: Number,
      default: 0,
    },
    onClick: {
      type: Function,
      default: ()=>{
          console.log("Hello");
      }

    },
       src: {
            type: String,
            default: require("../assets/provider.jpg")
        },
    to: {
      type: String,
      default: "/view",
    },
  },
};
</script>

<style scoped>
.time {
  position: absolute;
  z-index: 10;
  top: 10;
  font-weight: bold;
  color: #000000;
  padding: 5px;
  background-color: #ffffff;
  display: inline-block;
}
</style>
