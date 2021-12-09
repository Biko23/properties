<template>
  <v-container>
      <v-row>
          <v-col cols="12" md="6" offset-md="3">
              <v-row style="margin: 20vh auto;">
                  <v-col style="display:flex; align-items: center; justify-content: center;">
                       <v-form>
                            <v-container>
                                <p class="text-h4 text-center">Enter your OTP</p>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-row>
                                        <!--  -->
                                        <v-col cols="12" md="12">
                                            <div class="ma-auto position-relative" style="max-width: 300px">
                                            <!-- <vue-otp-2
                                                length="6"
                                                :otp="resetOTP"
                                                join-character="-"
                                                inputmode="numeric"
                                                pattern="[0-9]*"
                                                @onChange="logOTP"
                                                @onComplete="onFinish" 
                                            /> -->
                                            <v-text-field v-model="resetOTP"/>
                                            <v-btn @click="submitOTP">Submit OTP</v-btn>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" md="12">
                                             <v-btn 
                                                block 
                                                color="#3B6EF3" 
                                            >
                                                <span style="color: white;">Resend OTP</span>
                                            </v-btn>
                                        </v-col>
                                        <v-col cols="12" md="12" style="display: flex; justify-content: center;">
                                            <router-link to="/email-reset-password">Re-enter your email</router-link>
                                        </v-col>
                                        <!--  -->
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
  name: 'OTPResetPassword',
   data: () => ({
      loading: false,
      resetOTP: ''
    }),
  methods: {
      ...mapActions(['validateSubmittedOTP']),
      async submitOTP(){
          try {
           if(this.resetOTP != ''){
                const response = await this.validateSubmittedOTP(this.resetOTP);
                if(response.data.status == 1){
                    this.$router.push('/new-password-reset-page')
                } else {
                    alert(JSON.stringify(response.data.message))
                }
           }
          } catch (error) {
              console.log(error.message);
          }
      },
      logOTP(){
          console.log(this.resetOTP);
      },
      onFinish () {
        this.loading = true
        
      },
    },
}
</script>
<style scoped>
    .vue-otp-2 {
        display: flex;
        justify-content: space-between;
    }
    .vue-otp-2 div {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .vue-otp-2 input {
        max-width: 30px;
        padding: 11.5px 8px;
        font-size: 20px;
        border-radius: 3px;
        border: 1px solid #cecece;
        text-align: center;
    }

    .vue-otp-2 span {
        display: block;
        flex: 1;
        text-align: center;
    }
</style>
