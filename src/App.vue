<script>
    import Vue from "vue"
    import Component from "vue-class-component"
    import Dataviz from "./components/Dataviz.vue"
    import Header from "./components/Header.vue"

    @Component({
        components: {
            "v-dataviz": Dataviz,
            "v-header": Header
        }
    })
    export default class App extends Vue {
        isScrolling = false;
        isUp = true;
        isChrome = false;
        size = null;

        mounted(){
            window.addEventListener('resize', this.handleResize);
            this.size = window.width;
            this.isChrome = window.chrome && !window.opera;
        }

        handleResize(){
            this.size = document.body.clientWidth;
            if (!this.isUp){
                window.scrollTo(0, document.body.scrollHeight);
            } else {
                window.scrollTo(0, 0);
            }
        }

        fireScroll(event){
            if (!this.isScrolling){
                this.isScrolling = true;
                if (event.deltaY < 0){
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });
                } else {
                    window.scrollTo({
                        top: document.body.scrollHeight,
                        behavior: "smooth"
                    });
                }
            } else if (window.scrollY === (document.body.scrollHeight/2) || window.scrollY === 0) {
                this.isScrolling = false;
                this.isUp = window.scrollY === 0;
            }
        }

        scrollDown(){
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth"
            });
        }
    }
</script>

<template>
    <div id="page" @wheel.prevent="fireScroll">
        <div>
            <v-header @down="scrollDown" :size="size" :isChrome="isChrome"></v-header>
            <v-dataviz v-if="isChrome"></v-dataviz>
        </div>
    </div>
</template>

<style lang="scss">
    @import "theme/variables.scss";

    @font-face {
        font-family: MarkBook;
        src: url(./theme/fonts/MarkBook.otf);
    }

    @font-face {
        font-family: MarkBook;
        src: url(./theme/fonts/MarkBold.otf);
        font-weight: bold;
    }

    @font-face {
        font-family: MarkBook;
        src: url(./theme/fonts/MarkLight.otf);
        font-weight: lighter;
    }

    * {
        margin: 0;
        padding: 0;
    }
    body {
        font-family: MarkBook;
    }
</style>
