<script>
    import Vue from "vue"
    import Component from "vue-class-component"
    import country from "./Countries/Country.vue"

    import FlecheDown from "static/assets/arrow/FlecheDown.svg"
    import FlecheUp from "static/assets/arrow/FlecheUp.svg"

    import {Watch} from "vue-property-decorator"
    import {TweenLite} from "gsap/TweenMax"

    @Component({
        props: ["years", "svg", "name", "data", "color"],
        components: {
            "country": country,
        }
    })
    export default class CountrySlide extends Vue {

        flechedown = FlecheDown;
        flecheup = FlecheUp;

        target = 100;

        tweenedNumber = 100;

        diff = 0;

        get animatedNumber(){
            return this.tweenedNumber.toFixed(2)
        }

        get arrowOrientation(){
            if (this.diff < 0) {
               return this.flechedown;
            } else {
                return this.flecheup;
            }
        }

        @Watch("years")
        updateTarget(value){
            if (this.target !== 100) {
                this.diff = Math.round((this.data[value] - this.target)*100)/100;
            }
            this.target = this.data[value];
            TweenLite.to(this.$data, .5, {tweenedNumber: this.target});
        }

        updateDisabled(value){
            this.$emit("disabled", value);
        }

        mounted(){
            this.updateTarget(this.years);
            this.target = 100;
            this.diff = 0;
        }
    }
</script>

<template>
    <div class="countrySlide">
        <div class="countrySlide_viz">
            <country :country="svg" :target="target" :animatedNumber="animatedNumber" @disabled="updateDisabled"></country>
            <div class="countrySlide_data">
                <div class="countrySlide_diff" v-if="diff !== 0">
                    <div v-html="this.arrowOrientation" class="countrySlide_arrow"></div>
                    <p>{{ diff }}%</p>
                </div>
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

        &_diff {
            display: flex;
        }

        &_arrow {
            margin-right: 10px;
        }
    }
</style>