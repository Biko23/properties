<template>
  <v-container>
      <v-row>
          <v-col cols="12" md="6" offset-md="3">
              <v-row style="margin: 20vh auto;">
                  <v-col style="display:flex; align-items: center; justify-content: center;">
                       <v-form v-model="valid">
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
                                        <v-col cols="12" md="12">
                                            <v-btn 
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
      changePassword(){
          alert(JSON.stringify({password: this.password, confirm: this.confirmPassword}))
      },
      async changePassword(){
          try {
              const response = await this.resetPassword(this.password);
              if(response.data.status == 1){
                  alert(JSON.stringify(response.data.message))
                  setTimeout(() => {
                    this.$router.push('/login');
                  }, 2000);
              } else {
                  alert(JSON.stringify(response.data.message));
                  setTimeout(() => {
                    this.$router.push('/');
                  }, 2000);
              }
          } catch (error) {
              console.log(error.message);
          }
      }
  }
}
</script>

<style>

</style>