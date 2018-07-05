<script>
    import Vue from "vue"
    import Component from "vue-class-component"
    import {TweenLite} from "gsap/TweenMax"
    import {Watch} from "vue-property-decorator"

    @Component({
        props: ["country", "target", "animatedNumber"]
    })
    export default class extends Vue {

        previous = 100;
        vanishing = true;
        currentSvg = null;
        index = 0;
        lastIndex = 0;

        mounted(){
            this.currentSvg = this.$el.getElementsByTagName("svg")[0];
            this.currentSvg.style.height = "calc(15vw + 25vh - 15px)";
            this.svg = this.currentSvg.getElementById("Calque_2");
            this.paths = Array.from(this.svg.getElementsByTagName("path"));
            this.reversedPaths = Array.from(this.paths).reverse();
        }

        @Watch("target")
        launchAnimation(value){
            if (this.previous === 100) {
                this.vanishing = this.previous > this.target;
                this.index = Math.round(this.paths.length * (this.target*0.01));
                for (let i = 0; i < this.paths.length - this.index; i++){
                    setTimeout(() => {this.animation(this.paths[i])}, 50*i)
                }
            } else {
                this.lastIndex = this.index;
                this.index = Math.round(this.paths.length * (value*0.01));
                this.vanishing = this.lastIndex > this.index;
                if (this.vanishing) {
                    let slicedPaths = this.reversedPaths.slice(this.index, this.lastIndex);
                    let finalPaths = slicedPaths.reverse();
                    for (let i = 0; i < finalPaths.length; i++){
                        setTimeout(() => {this.animation(finalPaths[i])}, 50*i)
                    }
                } else {
                    for (let i = this.lastIndex; i < this.index; i++){
                        setTimeout(() => {this.animation(this.reversedPaths[i])}, 50*i)
                    }
                }
            }
            this.previous = this.target;
        }

        animation(path){
            let frame;
            if(this.vanishing)
                frame = [{opacity: 1}, {opacity: 0.2}];
            else
                frame = [{opacity: 0.2}, {opacity: 1}];

            path.animate(frame, {
                duration: 100,
                iterations: 1,
                fill: "forwards"
            })
        }

        @Watch("animatedNumber")
        setPreviousYears(value){
            if (this.target === value){
                this.previous = this.target;
            }
        }

    }
</script>

<template>
    <div class="country" v-html="this.country">
    </div>
</template>