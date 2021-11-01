<template>
<div>
    <base-dialog :message="message" :title="title" :dialogState="state">
        <template v-slot:button>
            <v-btn text @click="state = !state">close</v-btn>
        </template>
    </base-dialog>
    <v-container id="main-container" fluid>
        <v-row>
            <v-col cols="12" sm="12" md="6" lg="6">
                <router-link to="/" style="
              color: black;
              text-align: center;
              margin-top: 40px;

              text-decoration: none;
            ">
                    <p class="back-home">
                        <v-img style="margin-left: 100px; margin-right: auto; " max-height="20" max-width="25" src="https://res.cloudinary.com/diued7ugb/image/upload/v1626937941/Vector_9_aizknf.png"></v-img><span id="back-home">
                            Back home</span>
                    </p>
                </router-link>
                <h1 id="get-started">Get ready to start buying and selling more!</h1>
                <p style="margin-left:100px;">Create an account</p>
            </v-col>
            <v-col>
                <v-form id="form" ref="signupForm" v-model="valid" lazy-validation>
                    <div>
                        <v-img style="margin-left: 100px; margin-top: 10px;position:absolute;" lazy-src="https://picsum.photos/id/11/10/6" max-height="45" max-width="45" src="https://res.cloudinary.com/diued7ugb/image/upload/v1625749459/Vector_pebqf0.png"></v-img>
                        <span style="color: #3b6ef3; margin-top:23px;margin-left:-55px;position:absolute;">
                            Stanbic Properties
                        </span>
                    </div><br><br>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="userSignupDetails.name" :rules="[rules.required, rules.nameMin, rules.char]" label="Full name" placeholder="Enter your Full name" solo></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="userSignupDetails.email" :rules="emailRules" label="Email " placeholder="Enter your email" solo></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="userSignupDetails.username" :rules="[rules.required, rules.min]" label="Username " placeholder="Enter Username" solo></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="userSignupDetails.telephone" :rules="phoneNumberRules" label="Phone number" placeholder="Enter yourPhone number" solo></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="userSignupDetails.password" :rules="[rules.required, rules.min, rules.password]" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" label="Password" hint="At least 8 characters" @click:append="show1 = !show1" counter placeholder="Enter your password" solo></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="userSignupDetails.confirmPassword" :rules="[(userSignupDetails.password === userSignupDetails.confirmPassword) || 'Password must match']" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" label="Confirm password" @click:append="show1 = !show1" counter placeholder="Confirm password" solo></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="12" md="12">
                                 <base-spinner v-if="submitting" />
                                <v-btn color="primary" :disabled="!valid" @click="postNewUserData" block v-else> Sign Up </v-btn>
                            </v-col>
                        </v-row>
                        <!-- <v-row>
                              <v-divider></v-divider
                              ><span style="margin-top: -10px">Or</span> <v-divider
                              ></v-divider>
                            </v-row> -->
                        <!-- <v-row>
                              <v-col cols="12" sm="6" md="6">
                                <v-btn color="#e7f0ff" block large>
                                  <v-img
                                    max-height="30"
                                    max-width="20"
                                    src="https://res.cloudinary.com/diued7ugb/image/upload/v1626938676/flat-color-icons_google_fsmdyf.png"
                                  ></v-img>
                                  <span style="padding-left: 5px"> Google</span>
                                </v-btn>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                              <v-btn color="white" block large>
                                  <v-img
                                    max-height="34"
                                    max-width="25"
                                    src="https://res.cloudinary.com/diued7ugb/image/upload/v1626939162/Apple_logo_black.svg_rsk1qa.png"
                                  >

                                  </v-img><span style="padding-left: 10px"></span>
                                  Apple
                                </v-btn>
                              </v-col>
                            </v-row> -->
                        <br>
                        <p style="font-size:0.75rem">Have an Accont?
                            <router-link to="/login">Login</router-link>
                        </p>
                    </v-container>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
import {
    mapActions
} from 'vuex';
export default {
    name: "SignUp",
    data: () => ({
        show1: false,
        submitting: false,
        message: '',
        title: '',
        state: false,
        valid: true,
        userSignupDetails: {},
        rules: {
            required: value => !!value || "Required.",
            min: v => (v && v.length >= 6) || "Min 8 characters",
            password: v => /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(v) || "Password should have an upper case, lower case and letters",
            nameMin: v => (v && v.length >= 2) || "Min 3 characters",
            char: v => /^\w+([a-zA-Z ])+$/.test(v) || "Only characters allowed"
        },
        emailRules: [
            v => !!v || "Required",
            v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ],
        phoneNumberRules: [
            v => !!v || "Phone Number Required",
            v => (v && v.length >= 10) || "Number should not be less than 9",
            v => (v && v.length < 16) || "Number should not exceed 15 characters",
            v => /[0-9]/.test(v) || "Number should not contains letters"
        ],
    }),
    methods: {
        ...mapActions(["signupANewUser"]),
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
        async postNewUserData() {
            try {
                if (this.$refs.signupForm.validate()) {
                    this.userSignupDetails.created_by = this.userSignupDetails.username;
                    this.userSignupDetails.updated_by = this.userSignupDetails.username;
                    this.submitting = true;
                    const response = await this.signupANewUser(this.userSignupDetails);
                    if (response.status === 201) {
                        this.submitting = false;
                        this.defaultResponse('Account successfully created', 'Success', true);
                        setTimeout(() => {
                            this.$router.push('/login');
                        }, 3000);
                        return;
                    }
                    if(response.status === 200) {
                        this.submitting = false;
                        this.defaultResponse(response.data.message, 'Error', true);
                    }
                }
            } catch (error) {
                this.submitting = false;
                this.defaultResponse(error.message, 'Error', true);
            }
        },
        closeDialog() {
            this.messageDialog = false;
            this.$router.push('/login')
        },
        closeFailureDialog() {
            this.failureDialog = false;
        }
    },
    computed: {
        passwordMatch() {
            return () => this.userSignupDetails.password === this.userSignupDetails.confirmPassword ? "" : "Password must match";
        }
    },
};
</script>

<style scoped>
#main-container {
    background: url("../assets/signup.png");

    background-size: cover;
}

#get-started {
    color: #3b6ef3;
    text-align: center;
    font-weight: 400;
    margin-top: 30px;
    margin-left: 70px;
    margin-right: 70x;
}

#form {
    background-color: #e7f0ff;
    margin-left: auto;
    margin-right: auto;
    width: 400px;
    border-radius: 6px;
    text-align: center;
}

#back-home {
    margin-left: -190px;
    margin-top: -20px;
    position: absolute
}

.back-home {
    margin-top: 40px;
}

@media only screen and (max-width: 768px) {
    #get-started {
        color: #3b6ef3;
        text-align: center;
        font-weight: 400;
        margin-top: 30px;
        margin-left: auto;
        margin-right: auto;
    }

    #back-home {
        margin-left: -95px;
        margin-top: -20px;
        position: absolute
    }

    .back-home {
        margin-left: -70px;
    }

    #form {
        background-color: #e7f0ff;
        margin-left: auto;
        margin-right: auto;
        width: auto;
        border-radius: 6px;
        text-align: center;
    }
}
</style>
