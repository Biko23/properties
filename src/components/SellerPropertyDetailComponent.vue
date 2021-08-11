<template>
<v-card color="basil" flat>
    <v-card-text>
        <!-- Features content -->
        <v-data-table :headers="headers" :items="items" :items-per-page="5" class="elevation-1">
            <template v-slot:activator="{ on, attrs }">
                <button :onClick="console.log('Hello')" v-bind="attrs" v-on="on">
                    Remove
                </button>
            </template>
        </v-data-table>
    </v-card-text>
</v-card>
</template>

<script>
import Button from './Button'
export default {
    name: 'SellerPropertyDetail',
    components: {
        Button
    },
    props: {
        headers: {
            type: Array,
            default: () => []
        },
        items: {
            type: Array,
            default: () => []
        }
    }
}
</script>
