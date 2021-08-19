<template>
<v-dialog transition="dialog-top-transition" persistent v-model="messageDialog" max-width="600">
    <template>
        <v-card>
            <v-toolbar :color="color" dark>{{title}}</v-toolbar>
            <v-card-text>
                {{message}}
            </v-card-text>
            <v-card-actions class="justify-end">
                <!-- <v-btn text @click="closeDialog">ok</v-btn> -->
                <slot></slot>
            </v-card-actions>
        </v-card>
    </template>
</v-dialog>
</template>

<script>
export default {
    name: "PopComponent",
    props: {
       messageDialog: {
           type: Boolean,
           default: false
       },
        title: {
           type: String,
           default: "No Title"
       },
       message: {
           type: String,
           default: "No message available"
       },
       color: {
           type: String,
           default: "primary"
       }
    }
}
</script>
