<script>
    import Vue from "vue"
    import Component from "vue-class-component"

    import CountrySlide from "./Dataviz/CountrySlide.vue"
    import YearRange from "./Dataviz/YearRange.vue"
    import CountryNav from "./Dataviz/CountryNav.vue"

    @Component({
        components: {
            "v-country-slide": CountrySlide,
            "v-year-range": YearRange,
            "v-country-nav": CountryNav
        }
    })
    export default class Dataviz extends Vue {

        years = 1995;

        updateYear(value){
            this.years = value;
        }
    }
</script>

<template>
    <div class="section dataviz">
        <div class="dataviz_center">
            <v-country-slide :years="years"></v-country-slide>
            <nav class="dataviz_nav">
                <v-year-range :years="years" @changeYear="updateYear"></v-year-range>
                <v-country-nav></v-country-nav>
            </nav>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import "theme/variables.scss";

    .section {
        height: 100vh;
    }

    .dataviz { //center horizontally all content
        background-color: ($dataviz-black);
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        &_center { //center vertically slides and nav
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
            width: 100%;
        }

        &_nav {
            display: flex;
            width: 100%;
            flex-direction: column;
            align-items: center;
        }
    }
</style>