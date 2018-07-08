<script>
    import Vue from "vue"
    import Two from "static/assets/header/2.png"
    import Three from "static/assets/header/3.png"
    import Four from "static/assets/header/4.png"
    import Five from "static/assets/header/5.png"
    import Six from "static/assets/header/6.png"
    import Seven from "static/assets/header/7.png"
    import {Watch} from "vue-property-decorator"

    @Component({
        props: ["size", "isChrome"]
    })
    export default class Header extends Vue {
        two = Two;
        three = Three;
        four = Four;
        five = Five;
        six = Six;
        seven = Seven;

        ref = null;
        header = null;

        @Watch("size")
        updateMask(value){
            let height = Math.round(value/1.7);
            let min = height/25;
            this.mask.style.height = `calc(100vh - ${height}px + ${min}vh)`;
            this.header.style.height = `calc(${height}px)`;
        }

        mounted(){
            this.ref = document.getElementById("one");
            this.mask = document.getElementById("mask");
            this.header = document.getElementById("header");
            this.img = this.header.getElementsByTagName("img");
            let value = document.body.clientWidth;
            this.updateMask(value);
        }

        goDown(){
            this.$emit("down");
        }

        parallax(event){
            let x = Math.round(event.clientX - (document.body.offsetWidth/2));
            for(let i = 0; i < this.img.length; i++){
                this.img[i].style.transform = `translateX(calc(${Math.round(x)*0.01}*${i}px))`
            }
        }
    }
</script>

<template>
    <div class="section">
        <div class="header" id="header" @mousemove="parallax">
            <img :src="seven" width="110%" style="z-index: 0">
            <img :src="six" width="95%" style="z-index: 1">
            <img :src="five" width="95%" style="z-index: 2">
            <img :src="four" width="50%" id="logo" style="z-index: 3">
            <img :src="three" width="100%" style="z-index: 4}">
            <img :src="two" width="100%" style="z-index: 5">
        </div>
        <div class="header_mask" id="mask" style="z-index: 7">
            <div @click="goDown" id="mouseIcon" v-if="isChrome">
                <div id="scroll"></div>
            </div>
            <div v-else>
                <p> Please use Chrome to see this website :) </p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import "theme/variables.scss";

    .section {
        height: 100vh;
    }
    .header {
        position: relative;
        overflow-x: hidden;
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 100%;
        overflow-y: hidden;
        max-height: 100vh;

        #logo {
            top: 5%;
        }

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
            align-self: center;
            justify-self: center;
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