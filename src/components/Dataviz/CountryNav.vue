<script>
    import Vue from "vue"
    import Component from "vue-class-component"
    import {Watch} from "vue-property-decorator"

    @Component({
        props: ["currentIndex", "colors"]
    })
    export default class CountryNav extends Vue {

        active = "Brazil";

        setBackgroundColor(event){
            let currentColor = this.colors[event.target.getAttribute("country")];
            event.target.style.backgroundImage = `linear-gradient(${currentColor.main}, ${currentColor.light})`;
        }

        removeBackground(event){
            if (this.active !== event.target.getAttribute("country")) {
                event.target.style.backgroundImage = "none";
            }
        }

        removeAllBackground(){
            Array.from(this.$el.children).map(element => {
               element.style.backgroundImage = "none";
            });
        }

        mounted(){
            Array.from(this.$el.children).map(element => {
                if (element.getAttribute("country") === this.active){
                    let currentColor = this.colors[element.getAttribute("country")];
                    element.style.backgroundImage = `linear-gradient(${currentColor.main}, ${currentColor.light})`;
                }
            })
        }

        changeIndex(key){
            this.removeAllBackground();
            this.setBackgroundColor(event);
            this.active = key;
            this.$emit("changeIndex", key);
        }
    }
</script>

<template>
    <ul class="country_nav">
        <li class="country_navItem" v-for="(color, key) in colors" :style="{borderColor: color.main}"
            @mouseover="setBackgroundColor" @mouseleave="removeBackground"
            :key="key" :country="key" @click="changeIndex(key)"></li>
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