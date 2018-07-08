<script>
    import Vue from "vue"
    import Component from "vue-class-component"
    import {Watch} from "vue-property-decorator"

    @Component({
        props: ["years", "disabled"]
    })
    export default class YearRange extends Vue {
        innerModel = this.years;

        get roundYear(){
            return Math.trunc(this.innerModel);
        }

        calcLeftIndicator(value){
            let percent = ((value - 1995) / (2015 - 1995))*100;
            let round = (value - 1995) / (2015 - 1995) * 8;
            this.$refs.indicator.style.left = `calc(${percent}% - 8px - ${round}px)`;
        }

        @Watch("disabled")
        onDisabledChange(value){
            if (value) {
                this.innerModel = 1995;
                this.calcLeftIndicator(1995);
                this.$emit("changeYear", 1995);
            }
            this.$refs.range.disabled = value;
        }

        @Watch("innerModel")
        onYearChange(value){
            this.calcLeftIndicator(value);
            this.$emit("changeYear", Math.trunc(value));
        }

        mounted(){
            this.$refs.range.disabled = true;
        }
    }
</script>

<template>
    <div class="yearRange_wrapper">
        <p class="yearRange_indicator" ref="indicator">{{ roundYear }}</p>
        <input type="range" v-model="innerModel" max="2015" min="1995" step="any" class="yearRange" ref="range">
    </div>
</template>

<style lang="scss" scoped>
    @import "theme/variables.scss";

    .yearRange {
        display: block;
        width: 100%;
        position: absolute;
        bottom: 10px;
        height: 10px;
        -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
        background: transparent;

        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 10px;
            width: 10px;
            border-radius: 50%;
            border: solid 1px white;
            cursor: pointer;
            background-color: $dataviz-black;

            &:hover {
                background-color: white;
            }
        }

        &:focus {
            outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */

            &::-webkit-slider-thumb {
                background-color: white;
            }

        }

        &::-ms-track {
            width: 100%;
            cursor: pointer;

            /* Hides the slider so custom styles can be added */
            background: transparent;
            border-color: transparent;
            color: transparent;
        }

        &::-moz-range-thumb {
            height: 10px;
            width: 10px;
            border-radius: 50%;
            border: solid 1px white;
            cursor: pointer;
            background-color: $dataviz-black;
        }

        &::-moz-range-track {
            width: 100%;
            height: 5px;
            border-bottom: solid 1px white;
        }

        &::-webkit-slider-runnable-track{
            width: 100%;
            height: 5px;
            border-bottom: solid 1px white;
        }

        &_indicator {
            color: white;
            position: absolute;
            top: 18px;
            left: -8px;
        }

        &_wrapper {
            position: relative;
            width: 80%;
            height: 50px;
            padding: 10px 0;
        }
    }
</style>