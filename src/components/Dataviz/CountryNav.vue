<script>
    import Vue from "vue"
    import Component from "vue-class-component"


    @Component({})
    export default class CountryNav extends Vue {

        colors = {
            brazil: {main: "#5ab1b6", light: "#f5f3c2"},
            cameroun: {main: "#ef5259", light: "#f87636"},
            france: {main: "#0048cc", light: "#0075f5"},
            indonesia: {main: "#4728a6", light: "#683aa8"},
            spain: {main: "#c02e1d", light: "#e80000"},
            italy: {main: "#e8e33d", light: "#ffdb37"}
        };

        setBackgroundColor(event){
            let currentColor = this.colors[event.target.getAttribute("country")];
            event.target.style.backgroundImage = `linear-gradient(${currentColor.main}, ${currentColor.light})`;
        }

        removeBackground(event){
            event.target.style.backgroundImage = "none";
        }

        mounted(){
            //console.log(this.colors);
        }
    }
</script>

<template>
    <ul class="country_nav">
        <li class="country_navItem" v-for="(color, key) in colors" :style="{borderColor: color.main}"
            @mouseover="setBackgroundColor" @mouseleave="removeBackground"
            :key="key" :country="key"></li>
    </ul>
</template>

<style lang="scss" scoped>
    .country_nav {
        list-style-type: none;

        &Item {
            display: inline-block;
            margin: 5px;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            border: solid 1px;

            &:hover{
                cursor: pointer;
            }
        }
    }
</style>