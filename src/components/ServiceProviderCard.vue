<template>
  <v-card max-width="auto">
    <v-card-subtitle id="name" data-testid="vendor-element">{{ vendor_name }} </v-card-subtitle>
    <div>
      <v-img :src="src" height="200px" data-testid="image-element"></v-img>
    </div>
    <v-card-subtitle>
      <small style="font-weight: bold; color: #000000; margin-bottom: 0" data-testid="number-element">{{
        vendor_primary_phone_number
      }}</small
      ><br />
      <small data-testid="category-element">Category: {{ vendorCategory }}</small
      ><br />
      <small data-testid="like-element">Likes: {{ points }}</small>
    </v-card-subtitle>
    <slot></slot>
  </v-card>
</template>

<script>
export default {
  name: "ServiceProviderCard",
  props: {
    vendor_name: {
      type: String,
      default: "No name",
    },
    vendor_primary_phone_number: {
      type: String,
      default: "No available number",
    },
    vendorCategory: {
      type: String,
      default: "No Category",
    },
    points: {
      type: Number,
      default: 0,
    },
    src: {
      type: String,
      default: require('../assets/provider.jpg')
    }
  }
};
</script>

<style scoped>
#name {
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
