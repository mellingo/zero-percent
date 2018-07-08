<script>
    import Vue from "vue"
    import Component from "vue-class-component"

    import CountrySlide from "./Dataviz/CountrySlide.vue"
    import YearRange from "./Dataviz/YearRange.vue"
    import CountryNav from "./Dataviz/CountryNav.vue"

    import data from "static/assets/data.json"
    import Brazil from "static/assets/1Brazil.svg"
    import Cameroon from "static/assets/2Cameroon.svg"
    import France from "static/assets/3France.svg"
    import Indonesia from "static/assets/4Indonesia.svg"
    import Spain from "static/assets/5Spain.svg"
    import Italy from "static/assets/6Italy.svg"

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

        disabled = true;

        index = 0;

        data = data;

        svg = [
            Brazil, Cameroon, France, Indonesia, Spain, Italy
        ];

        colors = {
            Brazil: {main: "#5ab1b6", light: "#f5f3c2"},
            Cameroon: {main: "#ef5259", light: "#f87636"},
            France: {main: "#0048cc", light: "#0075f5"},
            Indonesia: {main: "#4728a6", light: "#683aa8"},
            Spain: {main: "#c02e1d", light: "#e80000"},
            Italy: {main: "#e8e33d", light: "#ffdb37"}
        };

        transition = "slide-small";

        countryNames = [
            "Brazil", "Cameroon", "France", "Indonesia", "Spain", "Italy"
        ];

        updateDisabled(value){
            this.disabled = value;
        }

        changeIndex(value){
            let country = value.charAt(0).toUpperCase() + value.slice(1);
            let newIndex = this.countryNames.indexOf(country);
            this.transition = newIndex > this.index ? "slide-big":"slide-small";
            this.index = this.countryNames.indexOf(country);
        }
    }
</script>

<template>
    <div class="section dataviz">
        <div class="dataviz_center">
            <div class="dataviz_slider">
                <transition :name="transition">
                    <v-country-slide :years="years" v-for="(img, key) in svg" :key="key" :svg="img"
                                     :data="data[countryNames[key]]" :name="countryNames[key]" v-if="index === key" :color="colors[countryNames[key]]" @disabled="updateDisabled"></v-country-slide>
                </transition>
            </div>
            <nav class="dataviz_nav">
                <v-year-range :years="years" @changeYear="updateYear" :disabled="disabled"></v-year-range>
                <v-country-nav @changeIndex="changeIndex" :colors="colors"></v-country-nav>
            </nav>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import "theme/variables.scss";

    .slide-small-enter, .slide-big-leave-to {
         transform: translateX(-100%);
     }

    .slide-small-leave-to, .slide-big-enter {
        transform: translateX(100%);
    }

    .slide-small-enter-active, .slide-small-leave-active,
    .slide-big-enter-active, .slide-big-leave-active {
        transition: all 1.5s;
    }

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

        &_slider {
            position: relative;
            width: 100%;
            height: calc(15vw + 25vh - 15px + 28px);
        }

        &_nav {
            display: flex;
            width: 100%;
            flex-direction: column;
            align-items: center;
        }
    }
</style>