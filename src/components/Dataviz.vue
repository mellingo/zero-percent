<script>
    import Vue from "vue"
    import Component from "vue-class-component"

    import CountrySlide from "./Dataviz/CountrySlide.vue"

    @Component({
        components: {
            "country-slide": CountrySlide
        }
    })
    export default class Dataviz extends Vue {

    }
</script>

<template>
    <div class="section dataviz">
        <country-slide></country-slide>
    </div>
</template>

<style lang="scss" scoped>
    @import "theme/variables.scss";

    .section {
        height: 100vh;
    }

    .dataviz {
        background-color: ($dataviz-black);
    }
</style>