<template>
<div>
    <top-nav />
    <v-container id="main-container" fluid>
        <!-- success Dialog -->
        <v-dialog transition="dialog-top-transition" persistent v-model="messageDialog" max-width="600">
            <template>
                <v-card>
                    <v-toolbar color="success" dark>Success</v-toolbar>
                    <v-card-text>
                        {{responseMessage}}
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn text @click="closeDialog">close</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
        <!-- end Success Dialog -->
        <!-- failure Dialog -->
        <v-dialog transition="dialog-top-transition" persistent v-model="failureDialog" max-width="600">
            <template>
                <v-card>
                    <v-toolbar color="red" dark>Error</v-toolbar>
                    <v-card-text>
                        {{responseMessage}}
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn text @click="closeFailureDialog">close</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
        <!-- end Failure Dialog -->
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
                                <v-text-field v-model="userSignupDetails.name" :rules="[rules.required, rules.min]" label="Full name" placeholder="Enter your Full name" solo></v-text-field>
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
                                <v-text-field v-model="userSignupDetails.password" :rules="[rules.required, rules.min]" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" label="Password" hint="At least 7 characters" @click:append="show1 = !show1" counter placeholder="Enter your password" solo></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="userSignupDetails.confirmPassword" :rules="[rules.required]" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" label="Confirm password" @click:append="show1 = !show1" counter placeholder="Confirm password" solo></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <v-btn color="primary" :disabled="!valid" @click="postNewUserData" block> Sign Up </v-btn>
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
import TopNav from "../components/TopNav.vue";

export default {
    name: "SignUp",
    data: () => ({
        show1: false,
        responseMessage: '',
        messageDialog: false,
        failureDialog: false,
        valid: true,
        userSignupDetails: {
            name: "",
            email: "",
            telephone: "",
            username: "",
            password: "",
            confirmPassword: "",
            created_by: "Isaac",
            updated_by: "Isaac"
        },
        rules: {
            required: value => !!value || "Required.",
            min: v => (v && v.length >= 7) || "Min 8 characters"
        },
        emailRules: [
            v => !!v || "Required",
            v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ],
        phoneNumberRules: [
            v => !!v || "Phone Number Required",
            v => (v && v.length >= 10) || "Number should not be less than 9",
            v => (v && v.length < 11) || "Number should not exceed 10 characters",
            v => /[0-9]/.test(v) || "Number should not contains letters"
        ],
    }),
    components: {
        TopNav
    },
    methods: {
        ...mapActions(["signupANewUser"]),
        async postNewUserData() {
            try {
                if (this.$refs.signupForm.validate()) {
                    const response = await this.signupANewUser(this.userSignupDetails);
                    if (response.status === 201 || response.status === 200) {
                        this.messageDialog = true;
                        this.responseMessage = 'Account created successfully!!';
                        setTimeout(() => {
                            this.messageDialog = false;
                            this.responseMessage = '';
                            this.$router.push('/login');
                        }, 2000);
                        return;
                    }
                    
                    if(response.status !== 201 || response.status !== 200) {
                        this.failureDialog = true;
                        this.responseMessage = response.data.message;
                        setTimeout(() => {
                            this.failureDialog = false;
                            this.responseMessage = '';
                        }, 3000);
                    }
                }
            } catch (error) {
                this.failureDialog = true;
                this.responseMessage = error;
                setTimeout(() => {
                    this.failureDialog = false;
                    this.responseMessage = '';
                }, 1000);
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
