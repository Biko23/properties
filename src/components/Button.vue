<template>
<v-btn @click="onClick($event)">
    <slot></slot>
</v-btn>
</template>

<script>
export default {
    name: 'v-button',
    methods: {
        onClick: function (e) {
            this.$emit('click', e);
        }
    }
}
</script>
