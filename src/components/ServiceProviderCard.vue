<template>
  <v-card max-width="auto">
    <v-card-subtitle class="time">{{ vendor_name }} </v-card-subtitle>
    <div>
      <v-img :src="src" height="200px"></v-img>
    </div>
    <v-card-subtitle>
      <small style="font-weight: bold; color: #000000; margin-bottom: 0">{{
        vendor_primary_phone_number
      }}</small
      ><br />
      <small>Category: {{ vendorCategory }}</small
      ><br />
      <small>Likes: {{ points }}</small>
    </v-card-subtitle>
    <slot></slot>
  </v-card>
</template>

<script>
export default {
  name: "PropertyCard",
  data: () => ({
    vendorCategories: [],
    editedIndex: -1,
  }),
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
    src: {
      type: String,
      default: require("../assets/provider.jpg"),
    },
    src2: {
      type: String,
      default: require("../assets/builder.jpg"),
    }
  }
};
</script>

<style scoped>
.time {
  position: absolute;
  z-index: 1;
  top: 10;
  font-weight: bold;
  color: #000000;
  padding: 5px;
  background-color: #ffffff;
  display: inline-block;
}
</style>
