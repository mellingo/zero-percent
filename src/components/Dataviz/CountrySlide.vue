<script>
    import Vue from "vue"
    import Component from "vue-class-component"
    import country from "./Countries/Country.vue"

    import {Watch} from "vue-property-decorator"
    import {TweenLite} from "gsap/TweenMax"

    @Component({
        props: ["years", "svg", "name", "data", "color"],
        components: {
            "country": country,
        }
    })
    export default class CountrySlide extends Vue {

        target = 100;

        tweenedNumber = 100;

        get animatedNumber(){
            return this.tweenedNumber.toFixed(2)
        }

        @Watch("years")
        updateTarget(value){
            this.target = this.data[value];
            TweenLite.to(this.$data, .5, {tweenedNumber: this.target});
        }

        updateDisabled(value){
            this.$emit("disabled", value);
        }

        mounted(){
            this.updateTarget(this.years);
        }
    }
</script>

<template>
    <div class="countrySlide">
        <div class="countrySlide_viz">
            <country :country="svg" :target="target" :animatedNumber="animatedNumber" @disabled="updateDisabled"></country>
            <div class="countrySlide_data">
                <p class="countrySlide_percent" :style="{'backgroundImage': 'linear-gradient('+color.main+','+color.light+')'}">{{ animatedNumber }}%</p>
                <p>Forest area</p>
            </div>
        </div>
        <p>{{ name }}</p>
    </div>
</template>

<style lang="scss" scoped>
    .countrySlide {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        display: flex;
        width: 100%;
        color: white;
        align-items: center;
        justify-content: flex-end;
        flex-direction: column;
        font-weight: bold;
        font-size: calc(15px + 1.5vw);

        &_viz {
            display: flex;
            align-items: center;
            justify-content: space-around;
            width: 60%;
        }

        &_percent {
            background-clip: text;
            color: transparent;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-size: calc(20px + 4.5vw);
        }

        &_svgWrapper {
            width: 80%;
        }

        &_data {
            font-size: calc(15px + 1.5vw);
        }
    }
</style>