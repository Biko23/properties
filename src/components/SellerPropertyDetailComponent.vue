<template>
<v-card color="basil" flat>
    <v-card-text>
        <!-- Features content -->
        <v-data-table :headers="headers" :items="items" :items-per-page="5" class="elevation-1">
            <template>
                <v-btn @click="$emit('click')">
                    {{btnName}}
                </v-btn>
            </template>
        </v-data-table>
    </v-card-text>
</v-card>
</template>
<script>
export default {
    name: 'SellerPropertyDetail',
    props: {
        headers: {
            type: Array,
            default: () => []
        },
        items: {
            type: Array,
            default: () => []
        },
        btnName:{
            type: String,
            default: ''
        }
    }
}
</script>