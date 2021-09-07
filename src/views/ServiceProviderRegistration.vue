<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" sm="12" md="12" xl="12">
          <h3 style="text-align: center; margin-top: 20px">
            Your profile service provider
          </h3>
          <v-form id="form" style="background-color: #e7f0ff">
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <p>Full name</p>
                  <v-text-field
                    label="Full name"
                    placeholder="Enter your full name"
                    solo
                    v-model="newVendor.vendor_name"
                  ></v-text-field>
                </v-col>
              </v-row>
              <!-- <v-row>
                <v-col cols="12" sm="12" md="12">
                  <p>Username:</p>
                  <v-text-field
                    label="Username"
                    placeholder="Username"
                    solo
                   
                  ></v-text-field>
                </v-col>
              </v-row> -->
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <p>Telephone:</p>
                  <v-text-field
                    label="Telephone"
                    placeholder="Telephone number"
                    solo
                    v-model="newVendor.vendor_primary_phone_number"
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-select
                    :items="allVendorsCategories"
                    label="Select Category"
                    solo
                    v-model="newVendor.category_type"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <p>Email</p>
                  <v-text-field
                    label="Email "
                    placeholder="forexample@gmail.com"
                    solo
                    v-model="newVendor.vendor_primary_email"
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-btn color="primary" block @click="postingVendor"
                    >Register As Provider</v-btn
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BottonNav from "../components/BottonNav.vue";
import MainNav from "../components/MainNav.vue";
import TopNav from "../components/TopNav.vue";
export default {
  components: { TopNav, MainNav, BottonNav },
  name: "VendorProfile",

  data: () => ({
    vendorCategories: [],
    editedIndex: -1,
    newVendor: {
      vendor_name: "",
      vendor_primary_phone_number: "",
      vendor_secondary_phone_number: "",
      vendor_primary_email: "",
      vendor_secondary_email: "",
      category_type: "",
    },
    defaultItem: {
      vendor_name: "",
      vendor_primary_phone_number: "",
      vendor_secondary_phone_number: "",
      vendor_primary_email: "",
      vendor_secondary_email: "",
      category_type: "",
    },
    valid: true,
    vendorRules: {
      required: (v) => !!v || "Required field",
      min: (v) => (v && v.length > 3) || "Value should be greater than 4",
      phoneLength: (v) =>
        (v && v.length >= 10) || "Number should not be less than 9",
      email: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    },
  }),
  computed: {
    ...mapGetters(["allVendorsCategories", "currentLoggedinUser"]),
  },

  created() {
    this.fetchVendorsCategories();
  },
  mounted() {
    this.loadVendorData();
  },
  methods: {
    ...mapActions(["fetchVendorsCategories", "postVendor", "postAUserLog"]),
    async postingVendor() {
       this.postAUserLog({
            activity: `Registered as a Service provider Page`,
            button_clicked: "Register As A Provider Button"
        });
      try {
        const response = await this.postVendor(this.newVendor);
        if (response.status === 201 || response.status === 200) {
          this.$router.push("/register");
        }
      } catch (error) {
        console.log(error);
      }
    },
    loadVendorData() {
      this.newVendor = Object.assign({}, this.currentLoggedinUser);
    },
  },
};
</script>

<style scoped>
#form {
  background-color: #e7f0ff;
  margin-left: auto;
  margin-right: auto;
  width: 900px;
  border-radius: 6px;
}
#reach {
  text-align: center;
  font-size: 0.9rem;
  margin-top: 30px;
}
</style>