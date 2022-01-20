<template>
  <v-container>
    <base-dialog :message="message" :title="title" :dialogState="state">
        <template v-slot:button>
            <v-btn text @click="state = !state">close</v-btn>
        </template>
    </base-dialog>
      <v-row>
          <v-col cols="12" md="6" offset-md="3">
              <v-row style="margin: 20vh auto;">
                  <v-col style="display:flex; align-items: center; justify-content: center;">
                       <v-form ref="emailResetForm" v-model="valid" lazy-validation>
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
                                        <v-col cols="12" md="12" style="display: flex; justify-content: center;">
                                            <base-spinner v-if="submitting"/>
                                            <v-btn 
                                                v-else
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
        message: '',
        title: '',
        state: false,
        valid: true,
        email: '',
        submitting: false,
        emailRules: [
            v => !!v || "Email Required",
            v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ]
      }
  },
  methods: {
      ...mapActions(['generatePasswordResetOTP']),
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
      async submitUserEmail(){
          if (this.$refs.emailResetForm.validate()) {
            try {
                this.submitting = true;
                const response = await this.generatePasswordResetOTP(this.email);
                if(response.data.status == 1){
                    this.submitting = false;
                    this.defaultResponse(response.data.message, 'Success', true);
                    setTimeout(() => this.$router.push('/otp-reset-password'), 3000);
                    
                } else {
                    this.submitting = false;
                    this.defaultResponse(response.data.message, 'Error', true);
                }
            } catch (error) {
                this.submitting = false;
                this.defaultResponse(error.message, 'Error', true);
            }
          }
      }
  }
}
</script>

<style>

</style>