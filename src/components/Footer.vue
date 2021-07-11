<template>
<div>
    <v-divider></v-divider><br />
    <div style="text-align: center; margin-top: 15px">
        <h3><span style="color: #3b6ef3"> RECENT </span>PROPERTIES</h3>
    </div>

    <v-container>
        <v-row>
            <v-col cols="12" md="3" xs="12">
                <v-card max-width="auto">
                    <v-img src="https://res.cloudinary.com/diued7ugb/image/upload/v1625732723/house1_svrut7.jpg" height="200px"></v-img>

                    <v-card-title style="color: #3b6ef3"> Luxury Villas </v-card-title>

                    <v-card-subtitle>
                        I'm a thing. But, like most politicians, he promised more than he
                        could deliver. You won't have time for sleeping, soldier, not with
                        all the bed making you'll be doing.
                    </v-card-subtitle>
                </v-card>
            </v-col>

            <v-col cols="12" md="3" xs="12">
                <v-card max-width="auto">
                    <v-img src="https://res.cloudinary.com/diued7ugb/image/upload/v1625732723/house1_svrut7.jpg" height="200px"></v-img>

                    <v-card-title style="color: #3b6ef3"> Luxury Villas </v-card-title>

                    <v-card-subtitle>
                        I'm a thing. But, like most politicians, he promised more than he
                        could deliver. You won't have time for sleeping, soldier, not with
                        all the bed making you'll be doing.
                    </v-card-subtitle>
                </v-card>
            </v-col>

            <v-col cols="12" md="3" xs="12">
                <v-card max-width="auto">
                    <v-img src="https://res.cloudinary.com/diued7ugb/image/upload/v1625732723/house1_svrut7.jpg" height="200px"></v-img>

                    <v-card-title style="color: #3b6ef3"> Luxury Villas </v-card-title>

                    <v-card-subtitle>
                        I'm a thing. But, like most politicians, he promised more than he
                        could deliver. You won't have time for sleeping, soldier, not with
                        all the bed making you'll be doing.
                    </v-card-subtitle>
                </v-card>
            </v-col>

            <v-col cols="12" md="3" xs="12">
                <v-card max-width="auto">
                    <v-img src="https://res.cloudinary.com/diued7ugb/image/upload/v1625732723/house1_svrut7.jpg" height="200px"></v-img>

                    <v-card-title style="color: #3b6ef3"> Luxury Villas </v-card-title>

                    <v-card-subtitle>
                        I'm a thing. But, like most politicians, he promised more than he
                        could deliver. You won't have time for sleeping, soldier, not with
                        all the bed making you'll be doing.
                    </v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

    <v-container class="about-us-container" fluid>
        <v-row>
            <v-col sm="1"></v-col>
            <v-col cols="12" md="3" xs="12" style="margin-left: -33px; margin-top: 60px">
                <v-img src="https://res.cloudinary.com/diued7ugb/image/upload/v1625732723/house1_svrut7.jpg" gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"></v-img>
            </v-col>

            <v-col cols="12" md="4" xs="12" style="margin-top: 25px">
                <div style="text-align: left">
                    <h3><span style="color: #3b6ef3"> ABOUT </span>US</h3>
                </div>
                <p style="
              font-size: 13px;
              font-style: normal;
              font-weight: 300;
              line-height: 20px;
              letter-spacing: 0em;
              margin-right: 50px;
              color: black;
            ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
                    a quas perferendis reiciendis ratione autem temporibus, possimus
                    corrupti totam doloremque est dolorem amet, nisi rerum obcaecati
                    molestias dolorum eveniet sed?
                </p>
                <p style="
              font-size: 13px;
              font-style: normal;
              font-weight: 300;
              line-height: 20px;
              letter-spacing: 0em;
              margin-right: 50px;
              color: black;
            ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique,
                    iste. Beatae enim id aspernatur soluta, sapiente dolorem delectus
                    impedit fugit amet dicta, ad quod illum molestias? Ipsa asperiores
                    pariatur veniam!
                </p>
            </v-col>
            <v-col cols="12" md="4" xs="12" style="margin-top: 25px">
                <div style="text-align: left">
                    <h3><span style="color: #3b6ef3"> WHY </span>US</h3>
                </div>
                <p style="
              font-size: 13px;
              font-style: normal;
              font-weight: 300;
              line-height: 20px;
              letter-spacing: 0em;
              margin-right: 50px;
            ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
                    a quas perferendis reiciendis ratione autem temporibus, possimus
                    corrupti totam doloremque est dolorem amet, nisi rerum obcaecati
                    molestias dolorum eveniet sed?
                </p>
                <p style="
              font-size: 13px;
              font-style: normal;
              font-weight: 300;
              line-height: 20px;
              letter-spacing: 0em;
              margin-right: 50px;
            ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique,
                    iste. Beatae enim id aspernatur soluta, sapiente dolorem delectus
                    impedit fugit amet dicta, ad quod illum molestias? Ipsa asperiores
                    pariatur veniam!
                </p>
            </v-col>
            <v-col sm="1"></v-col>
        </v-row>
    </v-container>

    <v-container fluid style="background-color:#3b6ef3">
        <v-row>
            <!-- <v-footer color="#3b6ef3"> -->
            <v-col>
                <v-card-text style="text-align: center">
                    <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
                        <v-icon size="24px">
                            {{ icon }}
                        </v-icon>
                    </v-btn>
                </v-card-text>
            </v-col>
        </v-row>
    </v-container>

    <v-container fluid style="background-color:#3b6ef3; color:#ffff;">
        <v-row>
            <v-col md="3" xs="6">
                <h3 style="color:#ffff;">Our Address</h3>
                <p style="
                font-size: 14px;
                font-style: normal;
                font-weight: 300;
                line-height: 30px;
                letter-spacing: 0em;
                color:#fffff;
              ">
                    JC Main Road, Near Silnile tower <br />
                    Pin-21542 NewYork US.
                </p>
                <p style="
              font-size: 14px;
              font-style: normal;
              font-weight: 300;
              line-height: 30px;
              letter-spacing: 0em;
              color:#ffff;
            ">
                    email@domainname.com
                </p>
            </v-col>

            <v-col md="3" xs="6">
                <h3>Other Useful Links</h3>
                <p style="
            color:#ffff;
              font-size: 14px;
              font-style: normal;
              font-weight: 300;
              line-height: 30px;
              letter-spacing: 0em;
            ">
                    Latest Events
                </p>
                <p style="
              font-size: 14px;
              font-style: normal;
              font-weight: 300;
              line-height: 30px;
              letter-spacing: 0em;
              color:#ffff;
            ">
                    Terms and Conditions
                </p>
                <p style="
              font-size: 14px;
              font-style: normal;
              font-weight: 300;
              line-height: 30px;
              letter-spacing: 0em;
              color:#ffff;
            ">
                    Privacy Policy
                </p>
                <p style="
              font-size: 14px;
              font-style: normal;
              font-weight: 300;
              line-height: 30px;
              letter-spacing: 0em;
            ">
                    Careers
                </p>
                <p style="
              font-size: 14px;
              font-style: normal;
              font-weight: 300;
              line-height: 30px;
              letter-spacing: 0em;
            ">
                    Stanbic Bank Uganda
                </p>
            </v-col>
            <v-col cols="12" md="3" id="col-hiden">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet
                voluptatem ratione harum odit! Ratione sunt dolore quae aperiam totam
                enim, voluptas sequi ullam minus, maiores eaque odit veniam animi ex!
            </v-col>
        </v-row>
    </v-container>
    <v-divider></v-divider>
    <v-container fluid style="background-color:#3b6ef3">
        <v-row>
            <v-col>
                <v-card-text class="white--text" style="text-align: center">
                    {{ new Date().getFullYear() }} —
                    <small>©️ Stanbic Bank properties All right reserved. Developed By
                        flyhub Limited</small>
                </v-card-text>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>
<script>
export default {
    name: 'Footer'
}
</script>
