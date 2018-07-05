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

        mounted(){
            window.addEventListener('resize', this.handleResize)
        }

        handleResize(){
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
        <v-header @down="scrollDown"></v-header>
        <v-dataviz></v-dataviz>
    </div>
</template>

<style lang="scss">
    * {
        margin: 0;
        padding: 0;
    }
</style>
