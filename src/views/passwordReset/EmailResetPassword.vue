<template>
  <v-container>
      <v-row>
          <v-col cols="12" md="6" offset-md="3">
              <v-row style="margin: 20vh auto;">
                  <v-col style="display:flex; align-items: center; justify-content: center;">
                       <v-form v-model="valid">
                            <v-container>
                                <p class="text-h4 text-center">Enter your email</p>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-row>
                                        <v-col cols="12" md="12">
                                            <v-text-field
                                                v-model="email"
                                                :rules="emailRules"
                                                label="Email"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="12">
                                            <v-btn 
                                                block 
                                                color="#3B6EF3" 
                                                :disabled="!valid" 
                                                @click="submitUserEmail"
                                            >
                                                <span style="color: white;">Request Reset OTP</span>
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                            </v-container>
                        </v-form>
                  </v-col>
              </v-row>
          </v-col>
      </v-row>
  </v-container>
</template>
<script>

import { mapActions } from 'vuex';
export default {
  name: 'EmailResetPassword',
  data(){
      return {
          valid: true,
          email: '',
          emailRules: [
            v => !!v || "Required",
            v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ]
      }
  },
  methods: {
      ...mapActions(['generatePasswordResetOTP']),
      async submitUserEmail(){
          try {
              const response = await this.generatePasswordResetOTP(this.email);
              if(response.data.status == 1){
                  this.$router.push('/otp-reset-password')
              } else {
                  alert(JSON.stringify(response.data.message))
              }
          } catch (error) {
              console.log(error.message);
          }
        //   if(this.email != ''){
              
        //   } else {
        //       alert('Email is required')
        //   }
      }
  }
}
</script>

<style>

</style>