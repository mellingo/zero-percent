<script>
    import countrySvg from "static/assets/1Brazil.svg"

    export default {
        data(){
            return {
                countrySvg: countrySvg
            }
        }
    }
</script>

<template>
    <div class="countrySlide">
        <div class="countrySlide_viz">
            <object :data="countrySvg" type="image/svg+xml" class="countrySlide_svg"></object>
            <div class="countrySlide_data">
                Hello
            </div>
        </div>
        <h2>Brazil</h2>
    </div>
</template>

<style lang="scss" scoped>
    .countrySlide {
        color: white;
        display: flex;
        //flex-direction: column;
        //align-items: center;

        &_viz {
            //display: flex;
        }

        &_svg {
            width: 25%;
        }

    }
</style>