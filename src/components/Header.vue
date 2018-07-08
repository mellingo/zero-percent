<script>
    import Vue from "vue"
    import Component from "vue-class-component"
    import One from "static/assets/header/1.png"
    import Two from "static/assets/header/2.png"
    import Three from "static/assets/header/3.png"
    import Four from "static/assets/header/4.png"
    import Five from "static/assets/header/5.png"
    import Six from "static/assets/header/6.png"
    import Seven from "static/assets/header/7.png"
    import {Watch} from "vue-property-decorator"

    @Component({
        props: ["size"]
    })
    export default class Header extends Vue {
        one = One;
        two = Two;
        three = Three;
        four = Four;
        five = Five;
        six = Six;
        seven = Seven;

        ref = null;

        @Watch("size")
        updateMask(value){
            let height = Math.round(value/1.7);
            this.mask.style.height = `calc(100vh - ${height}px + 10vh)`;
        }


        mounted(){
            this.ref = document.getElementById("one");
            this.mask = document.getElementById("mask");
            let value = document.body.clientWidth;
            this.updateMask(value);
        }

        goDown(){
            this.$emit("down");
        }
    }
</script>

<template>
    <div class="section header">
        <img :src="seven" width="100%">
        <img :src="six" width="100%">
        <img :src="five" width="100%">
        <img :src="four" width="100%">
        <img :src="three" width="100%">
        <img :src="two" width="100%">
        <img :src="one" width="100%" id="one">
        <div class="header_mask" id="mask">
            <div @click="goDown" id="mouseIcon">
                <div id="scroll"></div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import "theme/variables.scss";

    .section {
        background-color: yellow;
        height: 100vh;
    }
    .header {
        position: relative;
        overflow-x: hidden;

        &_mask {
            position: absolute;
            width: 100%;
            background-color: $dataviz-black;
            height: 15vh;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            cursor: pointer;
        }

        >img {
            position: absolute;
            top: -20px;
        }
    }

    #mouseIcon {
        position: absolute;
        width: 22px;
        height: 42px;
        bottom: 30px;
        left: 50%;
        margin-left: -12px;
        border-radius: 15px;
        border: 2px solid #888;
        transition: transform 0.5s linear;

        &:before {
            content: "Go Down";
            position: absolute;
            width: 100px;
            left: -25px;
            top: -30px;
        }
    }

    #mouseIcon:hover {
        border-color: white;
        cursor: pointer;
    }

    #mouseIcon:hover #scroll {
        background-color: white;
        cursor: pointer;
    }

    #scroll {
        display: block;
        width: 3px;
        height: 3px;
        margin: 6px auto;
        border-radius: 4px;
        background: #888;
        animation: finger 1s infinite;
    }

    @keyframes finger {
        0% {opacity:1;}
        100%{opacity: 0; transform: translateY(20px);}
    }
</style>