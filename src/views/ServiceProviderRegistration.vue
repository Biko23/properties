<template>
  <div>
    <top-nav />
    <main-nav />
    <v-container>
      <v-row>
        <v-col cols="12" sm="12" md="12" xl="12">
          <h3 style="text-align:center;margin-top:20px;">Your profile service provider</h3>
          <v-form id="form" style="background-color: #e7f0ff">
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <p>Full name</p>
                  <v-text-field
                    label="Full name"
                    placeholder="Enter your full name"
                    solo
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <p>Username:</p>
                  <v-text-field
                    label="Username"
                    placeholder="Username"
                    solo
                  ></v-text-field>
                </v-col>
              </v-row>
                            <v-row>
                <v-col cols="12" sm="12" md="12">
                  <p>Telephone:</p>
                  <v-text-field
                    label="Telephone"
                    placeholder="Telephone number"
                    solo
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                  <v-col  cols="12" sm="12" md="12">
                         <v-select
                :items="allVendorsCategories"
                label="Select Category"
                solo
              ></v-select>
                  </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <p>Photo</p>
                  <v-text-field solo style="width:60px; border-radius:80%"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <h1>Security information</h1>
                  <p>Email</p>
                  <v-text-field
                    label="Email "
                    placeholder="forexample@gmail.com"
                    solo
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <p>2 step verification</p>
                  <v-text-field
                    label="Email "
                    placeholder="forexample@gmail.com"
                    solo
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-btn color="primary" block> Sign Up </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-divider></v-divider
                ><span style="margin-top: -10px">Or</span>
                <v-divider></v-divider>
              </v-row>

              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-btn color="primary" block> Google </v-btn>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-btn color="primary" block> Apple </v-btn>
                </v-col> </v-row
              ><br />
              <p style="font-size: 0.75rem">
                Have an Accont? <a href="/login">Login</a>
              </p>
            </v-container>
          </v-form>
        </v-col>
      </v-row>
    </v-container>

    <footer />
    <h3></h3>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BottonNav from "../components/BottonNav.vue";
import Footer from "../components/Footer.vue";
import MainNav from "../components/MainNav.vue";
import TopNav from "../components/TopNav.vue";
export default {
  components: { TopNav, MainNav, BottonNav, Footer },
  name: "VendorProfile",

   data: () => ({
        search: '',
        editVendordialog: false,
        dialogDelete: false,
        viewDialog: false,
        newVendorDialog: false,
        headers: [{
                text: 'Name',
                value: 'vendor_name'
            },
            {
                text: 'Primary Phone',
                value: 'vendor_primary_phone_number'
            },
            {
                text: 'Primary Email',
                value: 'vendor_primary_email'
            },
            {
                text: 'Category',
                value: 'vendorCategory.vendor_category_name'
            },
            {
                text: 'Actions',
                value: 'actions',
                sortable: false
            }
        ],
        vendors: [],
        vendorCategories: [],
        editedIndex: -1,
        viewedVendor: {
            vendor_name: '',
            vendor_primary_phone_number: '',
            vendor_secondary_phone_number: '',
            vendor_primary_email: '',
            vendor_secondary_email: '',
            category_type: ''
        },
        newVendor: {
            vendor_name: '',
            vendor_primary_phone_number: '',
            vendor_secondary_phone_number: '',
            vendor_primary_email: '',
            vendor_secondary_email: '',
            category_type: ''
        },
        editedVendor: {
            vendor_name: '',
            vendor_primary_phone_number: '',
            vendor_secondary_phone_number: '',
            vendor_primary_email: '',
            vendor_secondary_email: '',
            category_type: ''
        },
        defaultItem: {
            vendor_name: '',
            vendor_primary_phone_number: '',
            vendor_secondary_phone_number: '',
            vendor_primary_email: '',
            vendor_secondary_email: '',
            category_type: ''
        },
        valid: true,
        vendorRules: {
            required: v => !!v || "Required field",
            min: v => (v && v.length > 3) || "Value should be greater than 4",
            phoneLength: v => (v && v.length >= 10) || "Number should not be less than 9",
            email: v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        }
    }),
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Add New Vendor' : 'Edit Item'
        },
        ...mapGetters(['allVendorsCategories'])
    },
    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        }
    },
    created() {
        // this.fetchVendors()
         this.fetchVendorsCategories()
    },

    methods: {
        ...mapActions(['fetchVendorsCategories']),
        // async fetchVendors() {
        //     try {
        //         const response = await vendorService.getVendors()
        //         this.vendors = response.data
        //     } catch (error) {
        //         console.log(error)
        //     }
        // },
        // async fetchVendorCategories() {
        //     try {
        //         const response = await vendorCategoryService.getVendorCategories()
        //         this.vendorCategories = response.data.map(category => {
        //             return {
        //                 value: category.vendor_category_id,
        //                 text: category.vendor_category_name
        //             }
        //         })
        //     } catch (error) {
        //         console.log(error)
        //     }
        // },
        async addAVendor() {
            if (this.$refs.addVendorForm.validate()) {
                try {
                    const response = await vendorService.postVendors(this.newVendor)
                    if (response.status === 201) {
                        this.vendors.unshift(this.newVendor)
                        this.newVendor = Object.assign({}, this.defaultItem)
                        this.newVendorDialog = false
                    }
                } catch (error) {
                    console.log(error)
                    this.newVendorDialog = false
                }
            }
        },
        viewItem(item) {
            this.editedIndex = this.vendors.indexOf(item)
            this.viewedVendor = Object.assign({}, item)
            this.viewDialog = true
        },
        editVendor(item) {
            this.editedIndex = this.vendors.indexOf(item)
            this.editedVendor = Object.assign({}, item)
            this.editVendordialog = true
        },
        deleteItem(item) {
            this.editedIndex = this.vendors.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },
        async deleteItemConfirm() {
            try {
                const response = await vendorService.deleteAVendor(this.editedItem)
                if (response.status == 200) {
                    this.vendors.splice(this.editedIndex, 1)
                    this.closeDelete()
                }
            } catch (error) {
                console.log(error)
            }
        },
        close() {
            this.editVendordialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        async save() {
            if (this.$refs.editVendorForm.validate()) {
                try {
                    const response = await vendorService.updateAVendor(this.editedVendor)
                    if (response.status == 200 && this.editedIndex > -1) {
                        Object.assign(this.vendors[this.editedIndex], this.editedVendor)
                    } else if (response.status == 200 && this.editedIndex <= -1) {
                        this.vendors.push(this.editedVendor)
                    }
                    this.close()
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }
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