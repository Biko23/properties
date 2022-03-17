<template>
  <div id="main-div">
    <base-dialog :message="message" :title="title" :dialogState="state">
      <template v-slot:button>
        <v-btn text @click="state = !state">close</v-btn>
      </template>
    </base-dialog>
    <v-container>
      <div style="text-align: center">
        <h3 style="color: white">Add A property</h3>
        <h4 style="color: #b9cbdb">Step 2/4</h4>
      </div>
      <br />
      <v-form ref="propertyForm1" v-model="valid" lazy-validation>
        <v-row id="form-row">
          <v-col cols="12" md="12">
            <v-row>
               <v-col cols="12" sm="12">
                <v-text-field
                  v-model="property.propertyDescription"
                  :rules="[propertyRules.propertyDescription]"
                  class="custom-label-color"
                  label="Property Name"
                  placeholder="Property name Eg. Musoke Apartments"
                  solo
                ></v-text-field>
              </v-col>
             <v-col cols="12" md="12">
               <v-row>
                   <v-col cols="12" sm="12" md="6">
                      <v-select
                        v-model="propertyType"
                        :rules="[propertyRules.type]"
                        :items="allPropertyTypes"
                        label="Select Property Type"
                        solo
                        return-object
                      ></v-select>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="6">
                      <v-row>
                        <v-col cols="12">
                          <v-btn
                            @click="setFeatures()"
                            id="featuresBtn">
                              Add Features
                          </v-btn>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                              background-color="#e7f0ff"
                              color="#e7f0ff"
                              style="margin-top: -7%; z-index: 0;"
                              v-model="property.featureValidatorField"
                              :rules="[propertyRules.featuresCheck]"
                              class="custom-label-color"
                              readonly
                              flat
                              hidden>
                          </v-text-field>
                        </v-col>
                      </v-row>

                        <div class="text-center">
                          <v-dialog
                            v-model="featuresDialog"
                            width="500"
                          >
                            <v-card>
                              <v-card-title class="text-h5 grey lighten-2">
                                Property Features
                              </v-card-title>
                              
                              <v-simple-table>
                                <template v-slot:default>
                                  <thead>
                                    <tr>
                                      <th class="text-left">
                                        Name
                                      </th>
                                      <th class="text-left">
                                      </th>
                                      <th class="text-center">
                                        Quantity
                                      </th>
                                      <th class="text-left">
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr
                                      v-for="item in features"
                                      :key="item.feature_type_id"
                                    >
                                      <td>{{ item.name }}</td>
                                      <td class="text-right">
                                        <v-icon
                                          class="mr-2" color="blue" @click="adjustQuantity(item, 'increment')"
                                        >mdi-plus
                                        </v-icon>
                                      </td>
                                      <td class="text-center">{{ item.quantity }}</td>
                                      <td class="text-left">
                                        <v-icon
                                          class="mr-2" color="blue" @click="adjustQuantity(item, 'decrement')"
                                        >mdi-minus
                                        </v-icon>
                                      </td>
                                    </tr>
                                  </tbody>
                                </template>
                              </v-simple-table>

                              <v-divider></v-divider>

                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                  color="primary"
                                  text
                                  @click="saveFeatures()"
                                >
                                  Save
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </div>
                        

                    </v-col>
                </v-row>
                <!-- <v-row v-show="featuresSet">                  
                    <v-col class="d-flex" cols="12" sm="6">
                      <h3 style="margin-bottom: 0;">Property features: </h3>
                      <br />
                      <p style="font-weight: 300"> {{ spreadFeatures }}</p>
                    </v-col>
                </v-row> -->
             </v-col>
               <v-col cols="12" sm="12">
                <v-text-field
                  v-model="spreadFeatures"
                  class="custom-label-color"
                  label="Property Features"
                  placeholder="Describe the property beliefly i.e, a two storeyed building with tiles roof located in kampala 20 kms off masaka highway"
                  solo
                  disabled
                ></v-text-field>
              </v-col>
              <v-col class="d-flex" cols="12" sm="12" md="12">
                <v-row>
                  <v-col class="d-flex" cols="12" sm="4">
                    <v-select
                      v-model="property.district_id"
                      :rules="[propertyRules.type]"
                      :items="districts"
                      item-text="district_name"
                      item-value="district_id"
                      @change="fetchDivisions"
                      label="Select District"
                      solo
                    ></v-select>
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="4">
                    <v-select
                      v-model="property.division_id"
                      :rules="[propertyRules.type]"
                      :items="divisions"
                      @change="fetchSuburbs"
                      item-text="division_name"
                      item-value="division_id"
                      label="Select Division"
                      hint="Select district first"
                      solo
                    ></v-select>
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="4">
                    <v-select
                      v-model="property.suburb_id"
                      :rules="[propertyRules.type]"
                      :items="suburbs"
                      item-text="suburb_name"
                      item-value="suburb_id"
                      label="Select Suburb"
                      hint="Select suburb first"
                      solo
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12">
                <h3>Add Property Photo</h3>
                <p
                  style="
                    font-size: 12px;
                    margin-right: 100px;
                    font-style: normal;
                  "
                >
                  Add at least 4 photos for this category. First picture - is
                  the title picture. You can change the order of photos: just
                  grab your photos and drag
                </p>
                <v-row>
                  <v-col cols="12" md="12">
                    <v-row>
                      <v-col cols="12" md="12">
                        <v-text-field
                          v-model="property.description"
                          :rules="[propertyRules.description]"
                          class="custom-label-color"
                          label="Visual description"
                          solo
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12">
                            <UploadImages
                              style="background-color: #e7f0ff; height: 100%; z-index: 100;"
                              :max="6"
                              uploadMsg="Drag n' drop. The first image should be the main image"
                              fileError="Image files only accepted"
                              maxError="Max files exceed"
                              clearAll="Clear"
                              @changed="handleImages"
                            />
                            <br>
                        <br>
                      </v-col>
                      <v-col cols="12" md="12">
                       <v-text-field
                          background-color="#e7f0ff"
                          color="#e7f0ff"
                          style="margin-top: -7%; z-index: 0;"
                          v-model="property.imageValidatorField"
                          :rules="[propertyRules.imageSelectCheck]"
                          class="custom-label-color"
                          readonly
                          flat
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <p style="font-size: 12px; margin-right: 100px">
                  Each picture must not exceed 5 Mb Supported formats are *.jpg,
                  *.gif and *.png
                </p>
              </v-col>
            </v-row>
            <v-row>
              <v-col style="display: flex; flex-direction: row; justify-content: flex-end;">
                <base-spinner style="margin-right: 30px; margin-left: 40px; margin-bottom: 15px;" v-if="submitting"/>
                <v-btn
                  style="background-color: #3b6ef3; width: 200px"
                  :disabled="!valid"
                  @click="storePropertyData"
                  v-else
                >
                  <span
                    style="
                      color: #ffffff;
                      font-size: 18px;
                      font-style: normal;
                      font-weight: 300;
                      line-height: 30px;
                      letter-spacing: 0em;
                      text-align: center;
                      text-transform: capitalize;
                    "
                  >Second Step</span>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-form>
      <br />
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import UploadImages from "vue-upload-drop-images";

export default {
  name: "RegisterProperty",
  components: {
    UploadImages
  },
  data: () => ({
    submitting: false,
    message: '',
    title: '',
    quantity: 0,
    featuresDialog: false,
    features: [],
    featuresSet: false,
    state: false,
    districts: [],
    divisions: [],
    suburbs: [],
    propertyType: {},
    property: {
      type: "",
      district_id: 0,
      division_id: 0,
      suburb_id: 0,
      propertyDescription: "",
      description: "",
      imageValidatorField: "",
      featureValidatorField: "",
      features: [],
      visuals: [],
      headers: [
          {
            sortable: false,
            text: 'name',
            value: 'feature',
          },
          {
            sortable: false,
            text: 'Number',
            value: 'quantity',
          },
          {
            text: 'Actions',
            value: 'actions',
            sortable: false,
            align: 'right',
          },
      ]
    },
    valid: true,
    propertyRules: {
      type: (value) => !!value || "Field is required.",
      description: (v) => (v && v.length >= 4) || "Min characters should be 5",
      propertyDescription: (value) => !!value || "Property Description is required.",
      // features(value) {
      //   for (let index = 0; index < value.length; index++) {
      //     const element = value[index];
          
      //   }
      //   if (value instanceof Array && value.length == 0) {
      //     return "Features are required";
      //   }
      //   return !!value || "Features are required.";
      // },
      featuresCheck: (value) => !!value || 'Features are required.',
      imageSelectCheck: (value) => !!value || 'At least one image is required.'
    },
    hide: true,
  }),
   computed: {
    ...mapGetters([
      "allPropertyTypes", ,
      "allPropertyFeatures", 
      "allDistricts", 
      "allDivisions", 
      "allSuburbs"
    ]),    
    spreadFeatures: function () {
      return this.property.features
        .reduce((acc, currentFeature) => acc + "," + `${currentFeature.quantity} ${currentFeature.name}`, "")
        .slice(1);
    },
  },
  methods: {
    ...mapActions([
      "fetchPropertyTypes",
      "fetchPropertyFeatures",
      "addPropertyDataFromPageOne",
      "fetchPropertyCategories",
      "postAUserLog",
      "fetchAllDistricts",
      "fetchDivisionsByDistrictId",
      "fetchSuburbsByDistrictId"
    ]),
    saveFeatures () {
      const newFeatures = this.features.filter(element => element.quantity > 0)
      this.property.featureValidatorField = newFeatures.length <= 0 ? "" : newFeatures[0];  
      this.featuresDialog = false
      this.property.features = newFeatures
      this.featuresSet = true
      this.setDescription()
    },
    setFeatures () {
      this.featuresDialog = true
      let featuresLength = this.features.length
      if (this.features.length == 0) {
        for (let index = 0; index < this.allPropertyFeatures.length; index++) {
          let feature = {
            name: this.allPropertyFeatures[index].feature,
            feature_type_id: this.allPropertyFeatures[index].features_id,
            quantity: 0
          }
          this.features.push(feature)        
        }
        
      }
    },
    setDescription () {
      console.log(this.propertyType);
      this.property.type = this.propertyType.value
      if (this.propertyType.text == "Land") {
        console.log(this.property.propertyDescription)
        console.log(this.property.features);
        this.property.propertyDescription = this.property.propertyDescription + " - All"
        console.log("We got land....");
      } else {
        for (let index = 0; index < this.property.features.length; index++) {
          const element = this.property.features[index];
          console.log(element);
          if (element.name == "Bedroom") {
          this.property.propertyDescription = this.property.propertyDescription + " - " + element.quantity + element.name            
          }
          
        }
        console.log(this.property.features);

      }
      console.log(this.property);
      console.log(allPropertyTypes);
      // this.featuresDialog = true
      // let featuresLength = this.features.length
      // if (propertyType == "Land") {
      //   this.property.description = "All"        
      // }
      // console.log("Description: ", this.property.description);
    },
    adjustQuantity(item, action) {
      if (action === 'increment') {
        const itemIndex = this.features.findIndex(feature => feature.feature_type_id == item.feature_type_id)
        item.quantity += 1
        this.features.splice(itemIndex, 1, item)
        
      } else {
        if (item.quantity > 0) {
        const itemIndex = this.features.findIndex(feature => feature.feature_type_id == item.feature_type_id)
        item.quantity -= 1
        this.features.splice(itemIndex, 1, item)
        } else {
          this.defaultResponse('No negative values accepted.', 'Error', true);          
        }        
      }
      },
    async fetchDistricts(){
      try {
        const response = await this.fetchAllDistricts();
        if(response.data.status == 1){
          this.districts = this.allDistricts;
        } else {
          this.defaultResponse(response.data.message, 'Error', true);
        }
      } catch (error) {
        this.defaultResponse(error.message, 'Error', true);
      }
    },
    async fetchDivisions(){
      try {
        if(this.property.district_id == 0){
          this.defaultResponse('No district selected yet', 'Error', true);
        } else {
          const response = await this.fetchDivisionsByDistrictId(this.property.district_id);
          if(response.data.status == 1){
            this.divisions = this.allDivisions;
          } else {
            this.defaultResponse(response.data.message, 'Error', true);
          }
        }
      } catch (error) {
        this.defaultResponse(error.message, 'Error', true);
      }
    },
    async fetchSuburbs(){
      try {
        if(this.property.division_id == 0){
          this.defaultResponse('No division selected yet', 'Error', true);
        } else {
          const response = await this.fetchSuburbsByDistrictId(this.property.division_id);
          if(response.data.status == 1){
            this.suburbs = this.allSuburbs;
          } else {
            this.defaultResponse(response.data.message, 'Error', true);
          }
        }
      } catch (error) {
        this.defaultResponse(error.message, 'Error', true);
      }
    },
    handleImages(files) {
      this.property.imageValidatorField = files.length <= 0 ? "" : files[0].name;
      this.property.visuals.splice(0, this.property.visuals.length);
      this.property.visuals.push(...files);
    },
    defaultResponse(msg, heading, status) {
      this.message = msg
      this.title = heading
      this.state = status
      setTimeout(() => {
          this.message = ""
          this.title = ""
          this.state = false
      }, 3000);
    },
    storePropertyData() {
      if (this.$refs.propertyForm1.validate()) {
        this.submitting = true
        console.log(this.property);
        this.addPropertyDataFromPageOne(this.property)
          .then(response => {
             this.submitting = false
              if(response.status == 201){
                this.$router.push("/register2");
              } else {
                this.defaultResponse(response.data.message, 'Error', true);
              }
            }
          )
          .catch(error => {
             this.submitting = false
            this.defaultResponse(error.message, 'Error', true)
            });
      }
    },
  },
  created() {
    this.postAUserLog({
      activity: "Visited the Property Listing first page",
      button_clicked: "Property Listing Page"
    });
    this.fetchPropertyTypes();
    this.fetchPropertyFeatures();
    this.fetchPropertyCategories();
    this.fetchDistricts();
    console.log(this.features)
  },
};
</script>

<style scoped>
#main-div {
  background-color: #3b6ef3;
}

#btnContainer {
  background-color: blue;
  display: block
}

#featuresBtn {
  width: 100%;
  height: 100%;
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

#col-hidden {
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

  #col-hidden {
    display: block;
  }
}

@media only screen and (max-width: 1200px) {
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
}
</style>
