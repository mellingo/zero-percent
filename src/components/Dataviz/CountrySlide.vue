<script>
    import Vue from "vue"
    import Component from "vue-class-component"
    import country from "./Countries/Country.vue"
    import Brazil from "static/assets/1Brazil.svg"
    import Italy from "static/assets/6Italy.svg"
    import data from "static/assets/data.json"
    import {Watch} from "vue-property-decorator"
    import {TweenLite} from "gsap/TweenMax"

    @Component({
        props: ["years"],
        components: {
            "country": country,
        }
    })
    export default class CountrySlide extends Vue {

        index = 0;
        data = data;
        target = 100;

        tweenedNumber = 100;

        get animatedNumber(){
            return this.tweenedNumber.toFixed(2)
        }

        svg = [
          Brazil, Italy
        ];

        countryName = [
            "Brazil", "Italy"
        ];

        @Watch("years")
        updateTarget(value){
            this.target = this.data[this.countryName[this.index]][value];
            TweenLite.to(this.$data, .5, {tweenedNumber: this.target});
        }

        mounted(){
            this.updateTarget(this.years);
        }
    }
</script>

<template>
    <div class="countrySlide">
        <div class="countrySlide_viz">
            <country :country="svg[index]" :target="target" :animatedNumber="animatedNumber"></country>
            <div class="countrySlide_data">
                <p>{{ animatedNumber }}</p>
            </div>
        </div>
        <h2>Brazil</h2>
    </div>
</template>

<style lang="scss" scoped>
    .countrySlide {
        display: flex;
        width: 100%;
        color: white;
        align-items: center;
        justify-content: flex-end;
        flex-direction: column;

        &_viz {
            display: flex;
            align-items: center;
            justify-content: space-around;
            width: 40%;
        }

        &_svgWrapper {
            width: 80%;
        }

        &_svg {
            //height: 80%;
        }

    }
</style>