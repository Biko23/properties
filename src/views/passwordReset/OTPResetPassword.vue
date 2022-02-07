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
                       <v-form>
                            <v-container>
                                <p class="text-h4 text-center">Enter your OTP</p>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-row>
                                        <!--  -->
                                        <v-col cols="12" md="8" offset-md="2">
                                            <div 
                                                class="ma-auto mt-3 mb-3 position-relative" 
                                                style="display: flex; justify-content: space-evenly;"
                                            >
                                                <base-spinner v-if="submittingToken"/>
                                                <vue-otp-2
                                                    v-else
                                                    length="6"
                                                    join-character="-"
                                                    inputmode="numeric"
                                                    pattern="[0-9]*"
                                                    @onComplete="onFinish" 
                                                />
                                            </div>
                                        </v-col>
                                        <v-col cols="12" md="8" offset-md="2" style="display: flex; justify-content: center;">
                                             <base-spinner v-if="submitting"/>
                                             <v-btn
                                                v-else 
                                                block 
                                                color="#3B6EF3"
                                                @click="resendOTP" 
                                            >
                                                <span style="color: white;">I can't see the OTP</span>
                                            </v-btn>
                                        </v-col>
                                        <v-col cols="12" md="12" style="display: flex; justify-content: space-evenly;">
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
        submitting: false,
        message: '',
        title: '',
        state: false,
        otp: [],
        submittingToken: false
    }),
  methods: {
    ...mapActions([
        'generatePasswordResetOTP', 
        'validateSubmittedOTP'
    ]),
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
      async submitOTP(resetOTP){
          try {
            this.submittingToken = true;
            const response = await this.validateSubmittedOTP(resetOTP);
            if(response.data.status == 1){
                this.submittingToken = false;
                setTimeout(() => this.$router.push('/new-password-reset-page'), 3000);        
            } else {
                this.submittingToken = false;
                this.defaultResponse(response.data.message, 'Error', true);
            }
          } catch (error) {
            this.submittingToken = false;
            this.defaultResponse(error.message, 'Error', true);
          }
      },
     async onFinish (otp) {
        this.otp = otp
        const finalOTP = (this.otp).reduce((a, b) => `${a}${b}`);
        await this.submitOTP(finalOTP);  
      },
    async resendOTP(){
        try {
            this.submitting = true;
            const response = await this.generatePasswordResetOTP(this.$store.getters.resetEmail);
            if(response.data.status == 1){
                this.submitting = false;
                this.defaultResponse(`A new OTP has been re-sent to ${this.$store.getters.resetEmail}`, 'Success', true);                
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
