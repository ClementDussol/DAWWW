<template>
    <container name="Oscillator" class="oscillator">
        <div class="types">
            <div :class="['wave-type', 'sine', oscillator.type == 'sine' ? 'selected' : '' ]" @click="setType('sine')">
                <img src="./../assets/icons/wave-sine.png" />
            </div>
            <div :class="['wave-type', 'square', oscillator.type == 'square' ? 'selected' : '' ]" @click="setType('square')">
                <img src="./../assets/icons/wave-square.png" />
            </div>
            <div :class="['wave-type', 'triangle', oscillator.type == 'triangle' ? 'selected' : '' ]" @click="setType('triangle')">
                <img src="./../assets/icons/wave-triangle.png" />
            </div>
            <div :class="['wave-type', 'sawtooth', oscillator.type == 'sawtooth' ? 'selected' : '' ]" @click="setType('sawtooth')">
                <img src="./../assets/icons/wave-sawtooth.png" />
            </div>
        </div>
    </container>
</template>

<script>
    import Tone from "tone"
    export default {
        name : "oscillator",
        props : ['oscillator'],
        methods : {
            setType(type){
                this.oscillator.type = type;
                console.log(this.oscillator);
                console.log(this.oscillator.type);
            }
        }
    }
</script>

<style scope>
    .types{
        display: flex;
    }
    .wave-type {
        padding: 8px;
    }
    .wave-type.selected {
        background-color: darkgrey;
    }
    img{
        display: block;
    }
</style>
