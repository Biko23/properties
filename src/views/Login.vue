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
                <router-link to="/"
                    id="backLink"
                >
                    <p>
                        <v-icon
                            size="30"
                            style="padding: 0 10px 0 0;"
                        >mdi-keyboard-backspace</v-icon>
                        <span>Back home</span>
                    </p>
                </router-link>
                <h1 id="get-started">Welcome Back!</h1>
                <p  id="get-started">Login into your account</p>
            </v-col>
            <v-col>
                <v-form id="form" ref="loginForm" v-model="valid" lazy-validation>
                    <div style="padding-top: 30px;">
                        <v-icon
                            size="50"
                            style="color: #3b6ef3; padding-bottom: 16px; ">mdi-home-outline</v-icon>
                        <span 
                            style="
                                color: #3b6ef3; 
                                font-size: 24px;
                            ">
                            Stanbic Properties
                        </span>
                    </div>
                    <br/>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="loginDetails.username" :rules="[rules.required]" label="Username or Email or phone number" placeholder="Username or Email or phone number" solo></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="loginDetails.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required]" @click:append="show1 = !show1" label="Password" placeholder="password" :type="show1 ? 'text' : 'password'" solo></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <v-progress-circular v-if="submitting" indeterminate color="primary"></v-progress-circular>
                                <!-- <base-spinner v-if="submitting"/> -->
                                <v-btn color="primary" :disabled="!valid" @click="postLoginData" large block v-else>
                                    Login
                                </v-btn>
                            </v-col>
                        </v-row>
                        <!-- <br v-if="responseMessage != ''"> -->

                        <!-- Commented Two lines below because "responseMessage is NOT defined" -->
                        <!-- <span v-if="responseMessage != ''" style="color: red;">{{responseMessage}}</span>
                        <br /><br /> -->


                        <!-- <v-row>
                <v-divider></v-divider><span style="margin-top: -10px">Or</span>
                <v-divider></v-divider>
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
                </v-col> </v-row 
              >-->
                        <br />
                        <p style="font-size: 0.85rem">
                            Have No Accont?
                            <router-link to="/signup">Sign up</router-link>
                        </p>
                        <p style="font-size: 0.75rem">
                            <router-link to="/email-reset-password">Forgot Password</router-link>
                        </p>
                        <br /><br />
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
} from "vuex";

export default {
    name: "Login",
    data: () => ({
        show1: false,
        valid: true,
        submitting: false,
        message: '',
        title: '',
        state: false,
        rules: {
            required: (value) => !!value || "Required."
        },
        loginDetails: {
            username: "",
            password: "",
        },
    }),
    methods: {
        ...mapActions([
            "login", 
            "fetchLoggedUser", 
            "fetchTotalFavoriteCount", 
            "postAUserLog"
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
        async postLoginData() {
            try {
                if (this.$refs.loginForm.validate()) {
                    this.submitting = true;
                    const response = await this.login(this.loginDetails);
                    if (response.status === 200) {
                        this.submitting = false;
                        if (response.data.hasOwnProperty("token")) {
                            this.fetchLoggedUser().then(() => {                                
                               this.fetchTotalFavoriteCount();
                               const payload = {
                                   "activity":"Login", 
                                   "button_clicked":"Login button"
                               }
                               this.postAUserLog(payload);
                                this.$router.replace(
                                    sessionStorage.getItem("redirectPath") || "/"
                                );
                                sessionStorage.removeItem("redirectPath");
                            });
                        } else if (response.data.status === 0) {
                            this.defaultResponse(response.data.message, '', true);
                        }
                    }
                }
            } catch (error) {
                this.$log.error('Error:', error)
                this.submitting = false;
                this.defaultResponse(error.message, 'Error', true);
            }
        }
    },
};
</script>

<style scoped>
#main-container {
    background: url("../assets/login.png");
    height: 100vh;
    background-size: cover;
}

#get-started {
    color: #3b6ef3;
    text-align: center;
    font-weight: 400;
    margin-top: auto;
    margin-left: auto;
    margin-right: auto;
}

#backLink {
    text-align: left;
    color: black;
    text-decoration: none;
}

#login-into {
    margin-top: 70px;
    text-align: center;
    margin-left: 90px;
}

#form {
    background-color: #e7f0ff;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    width: 450px;
    border-radius: 6px;
    text-align: center;
}

.image-logo {
    margin-left: 120px;
    margin-top: 10px;
    position: absolute;
}

@media only screen and (max-width: 768px) {
    #main-container {
        height: auto;
    }

    #form {
        background-color: #e7f0ff;
        margin-left: auto;
        margin-right: auto;
        margin-top: 50px;
        width: auto;
        border-radius: 6px;
        text-align: center;
    }

    #get-started {
        color: #3b6ef3;
        text-align: center;
        font-weight: 300;
        margin-top: auto;
        margin-left: auto;
        margin-right: auto;
    }

    #login-into {
        margin-top: auto;
        text-align: center;
        margin-left: auto;
    }

    .image-logo {
        margin-left: 90px;
        margin-top: 10px;
        position: absolute;
    }
}
</style>
