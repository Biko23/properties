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
                            <v-text>Full Name:</v-text>
                        </v-col>
                        <v-col cols="12" sm="12" md="7">
                            <v-text>{{currentLoggedinUser.vendor_name}}</v-text>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12" md="5">
                            <v-text>Username:</v-text>
                        </v-col>
                        <v-col cols="12" sm="12" md="7">
                            <v-text>{{currentLoggedinUser.username}}</v-text>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12" md="5">
                            <v-text>Primary Phone:</v-text>
                        </v-col>
                        <v-col cols="12" sm="12" md="7">
                            <v-text>{{currentLoggedinUser.vendor_primary_phone_number}}</v-text>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12" md="5">
                            <v-text>Primary Email:</v-text>
                        </v-col>
                        <v-col cols="12" sm="12" md="7">
                            <v-text>{{currentLoggedinUser.vendor_primary_email}}</v-text>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12" md="5">
                            <v-text>Secondary Phone:</v-text>
                        </v-col>
                        <v-col cols="12" sm="12" md="7">
                            <v-text>{{currentLoggedinUser.vendor_secondary_phone_number}}</v-text>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12" md="5">
                            <v-text>Secondary Email:</v-text>
                        </v-col>
                        <v-col cols="12" sm="12" md="7">
                            <v-text>{{currentLoggedinUser.vendor_secondary_email}}</v-text>
                        </v-col>
                    </v-row>
                     <v-row>
                        <v-col cols="12" sm="12" md="5">
                            <v-text>Location:</v-text>
                        </v-col>
                        <v-col cols="12" sm="12" md="7">
                            <v-text>{{currentLoggedinUser.business_location}}</v-text>
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
