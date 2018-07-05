<script>
    import Vue from "vue"
    import Component from "vue-class-component"
    import {Watch} from "vue-property-decorator"

    @Component({
        props: ["years"]
    })
    export default class YearRange extends Vue {
        innerModel = this.years;

        @Watch("innerModel")
        onYearChange(value){
            this.$emit("changeYear", Math.trunc(value));
        }
    }
</script>

<template>
    <input type="range" v-model="innerModel" max="2015" min="1995" step="any" class="yearRange">
</template>

<style lang="scss" scoped>
    .yearRange {
        display: inline-block;
        width: 80%;
    }
</style>