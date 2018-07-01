<script>
    import FullPage from "vue-fullpage.js/src/FullPage.vue"
    import fullPageMixin from 'vue-fullpage.js/src/fullPageMixin'
    import Dataviz from "./components/Dataviz.vue"
    import Header from "./components/Header.vue"

    export default {
        components: {
            "full-page": FullPage,
            "v-dataviz": Dataviz,
            "v-header": Header
        }
    }
</script>

<template>
    <full-page>
        <div class="section">
           Hello
        </div>
        <div class="section">
            <v-dataviz></v-dataviz>
        </div>
    </full-page>
</template>

<style lang="scss" scoped>
    * {
        margin: 0;
        padding: 0;
    }
</style>
