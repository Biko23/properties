<template>
    <v-dialog transition="dialog-top-transition" persistent :value="dialogState" max-width="600">
        <template>
            <v-card>
                <v-toolbar color="deep-purple accent-4" dark>{{title}}</v-toolbar>
                <v-card-text class="pt-5">
                    <p style="font-size: 16px">{{ message }}</p>
                </v-card-text>
                <v-card-actions class="justify-end">
                    <slot name="button" />
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>
<script>
    export default {
        name: "BaseDialog",
        props: {
            message: {
                type: String,
                default: "No message"
            },
            title: {
                type: String,
                default: "No title"
            },
            dialogState: {
                type: Boolean,
                default: false
            }
        }
    }
</script>