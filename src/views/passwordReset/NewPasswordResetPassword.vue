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
                       <v-form v-model="valid" ref="newPasswordForm" lazy-validation>
                            <v-container>
                                <p class="text-h4 text-center">Change Password</p>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-row>
                                        <v-col cols="12" md="12">
                                            <v-text-field
                                                type="password"
                                                v-model="password"
                                                :rules="[rules.required, rules.min, rules.password]"
                                                label="New Password"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="12">
                                            <v-text-field
                                                type="password"
                                                v-model="confirmPassword"
                                                :rules="[(password === confirmPassword) || 'Password must match']"
                                                label="Confirm Password"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="12" style="display: flex; justify-content: space-evenly;">
                                            <base-spinner v-if="submitting"/>
                                            <v-btn 
                                                v-else
                                                block 
                                                color="#3B6EF3" 
                                                :disabled="!valid" 
                                                @click="changePassword"
                                            >
                                                <span style="color: white;">Reset Password</span>
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
  name: 'NewPasswordResetPassword',
  data(){
      return {
        submitting: false,
        message: '',
        title: '',
        state: false,
        valid: true,
        password: '',
        confirmPassword: '',
        rules: {
            required: value => !!value || "Required.",
            min: v => (v && v.length >= 6) || "Min 8 characters",
            password: v => /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(v) || "Password should have an upper case, lower case and letters"
        }
      }
  },
  methods: {
      ...mapActions(['resetPassword']),
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
      async changePassword(){
        if (this.$refs.newPasswordForm.validate()) {
          try {
              this.submitting = true;
              const response = await this.resetPassword(this.password);
              if(response.data.status == 1){
                  this.submitting = false;
                  this.defaultResponse(response.data.message, 'Success', true);
                  setTimeout(() => {
                    this.$router.push('/login');
                  }, 2000);
              } else {
                  this.defaultResponse('Failed to change password', '', true);
                  setTimeout(() => {
                    this.$router.push('/');
                  }, 2000);
              }
          } catch (error) {
              this.defaultResponse('Failed to change password', '', true);
          }
        }
      }
  }
}
</script>

<style>

</style>