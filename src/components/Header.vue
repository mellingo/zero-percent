<script>
    import Vue from "vue"
    import Component from "vue-class-component"

    @Component({})
    export default class Header extends Vue {
        goDown(){
            this.$emit("down");
        }
    }
</script>

<template>
    <div class="section header">
        <button @click="goDown">Down</button>
    </div>
</template>

<style lang="scss" scoped>
    .section {
        background-color: yellow;
        height: 100vh;
    }
</style>