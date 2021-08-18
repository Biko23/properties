<template>
<v-row justify="center">
    <v-dialog transition="dialog-top-transition" persistent v-model="dialog" max-width="600">
        <template v-slot:default="dialog">
            <v-card>
                <v-toolbar color="primary" dark>{{title}}</v-toolbar>
                <v-card-text>
                    <div class="text-h2 pa-12">{{message}}</div>
                </v-card-text>
                <v-card-actions class="justify-end">
                    <v-btn text @click="dialog.value = false">Ok</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</v-row>
</template>

<script>
export default {
    name: "PopUpDialog",
    data() {
        return {
            dialog: false
        }
    },
    props: {
        title: {
            type: String,
            default: "Pop",
        },
        title: {
            type: String,
            default: "All",
        },
    },
}
</script>
