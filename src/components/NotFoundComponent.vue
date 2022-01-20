<template>
    <div class="main-not-found">
        <center>
            <h4>Oops!! The page you are looking for might not be available</h4>
            <br/>
            <router-link :to="{name: 'Home'}">Go to Home</router-link>
        </center>
    </div>
</template>

<script>
    export default {
        name: 'NotFoundPage'
    }
</script>

<style scoped>
    .main-not-found {
        margin: 5em auto;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
</style>