<template>
<div>
    <v-container>
        <v-row>
            <v-col cols="12" sm="12" md="8" xl="8" offset-lg="2" offset-md="2">
                <h3 style="
                    color: #3b6ef3;
                    font-weight: 400;
                    text-align: center;
                    margin-top: 20px;
                ">Settings</h3>
                <br />
                <v-container 
                style="
                    background-color: rgb(231, 240, 255);
                    padding: 0 20%;
                    border-radius: 1%;
                    "
                >
                    <v-row>
                        <v-col cols="12" sm="12" md="5">
                            <span>Full Name:</span>
                        </v-col>
                        <v-col cols="12" sm="12" md="7">
                            <span>{{currentLoggedinUser.vendor_name}}</span>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12" md="5">
                            <span>Username:</span>
                        </v-col>
                        <v-col cols="12" sm="12" md="7">
                            <span>{{currentLoggedinUser.username}}</span>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12" md="5">
                            <span>Primary Phone:</span>
                        </v-col>
                        <v-col cols="12" sm="12" md="7">
                            <span>{{currentLoggedinUser.vendor_primary_phone_number}}</span>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12" md="5">
                            <span>Primary Email:</span>
                        </v-col>
                        <v-col cols="12" sm="12" md="7">
                            <span>{{currentLoggedinUser.vendor_primary_email}}</span>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12" md="5">
                            <span>Secondary Phone:</span>
                        </v-col>
                        <v-col cols="12" sm="12" md="7">
                            <span>{{currentLoggedinUser.vendor_secondary_phone_number}}</span>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12" md="5">
                            <span>Secondary Email:</span>
                        </v-col>
                        <v-col cols="12" sm="12" md="7">
                            <span>{{currentLoggedinUser.vendor_secondary_email}}</span>
                        </v-col>
                    </v-row>
                     <v-row>
                        <v-col cols="12" sm="12" md="5">
                            <span>Location:</span>
                        </v-col>
                        <v-col cols="12" sm="12" md="7">
                            <span>{{currentLoggedinUser.business_location}}</span>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <router-link to="/editprofile" style="text-decoration:none;">
                                <v-btn depressed color="#3b6ef3" block>
                                    <span style="color: white;">Edit Profile</span></v-btn>
                            </router-link>
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
    </v-container><br><br>
</div>
</template>
<script>
import {
    mapGetters
} from 'vuex';

export default {
    name: 'Home',
    computed: {
        ...mapGetters(["currentLoggedinUser"]),
    }
}
</script>
