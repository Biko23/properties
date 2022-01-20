<template>
    <v-dialog 
        transition="dialog-top-transition"
        data-testid="dialog-state-element" 
        persistent 
        :value="dialogState" 
        max-width="600"
    >
        <template>
            <v-card>
                <v-toolbar color="#3B6EF3" data-testid="title-element" dark>{{title}}</v-toolbar>
                <v-card-text class="pt-5">
                    <p style="font-size: 16px" data-testid="message-element">{{ message }}</p>
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
                default: null
            },
            dialogState: {
                type: Boolean,
                default: false
            }
        }
    }
</script>