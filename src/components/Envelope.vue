<template>
    <container class="envelope" name="Envelope">

        <svg height="96" width="256" v-if="envelope">
            
            <polygon :points="points" fill="rgba(0, 0, 255, 0.5)"/>
            
            <line 
                x1="0" y1="96" 
                :x2="attackWidth" y2="0" 
                :stroke="attackColor" style="stroke-width:2" />
            <line 
                :x1="attackWidth" y1="0" 
                :x2="attackWidth + decayWidth" :y2="sustainHeight" 
                :stroke="decayColor" style="stroke-width:2" stroke-linecap="round"/>
            <line 
                :x1="attackWidth + decayWidth" :y1="sustainHeight"
                :x2="attackWidth + decayWidth + sustainWidth" :y2="sustainHeight" 
                :stroke="sustainColor" style="stroke-width:2" stroke-linecap="round"/>
            <line
                :x1="attackWidth + decayWidth + sustainWidth" :y1="sustainHeight"
                x2="256" y2="96"
                :stroke="releaseColor" style="stroke-width:2" stroke-linecap="round"/>

            <line
                :x1="attackWidth" y1="96" :x2="attackWidth" y2="0"
                stroke="rgb(255, 255, 255)" stroke-dasharray="2, 2"/>
            <line
                :x1="attackWidth + decayWidth" y1="96" :x2="attackWidth + decayWidth" :y2="sustainHeight"
                stroke="rgb(255, 255, 255)" stroke-dasharray="2, 2"/>
            <line
                :x1="attackWidth + decayWidth + sustainWidth" y1="96" :x2="attackWidth + decayWidth + sustainWidth" :y2="sustainHeight"
                stroke="rgb(255, 255, 255)" stroke-dasharray="2, 2"/>
        </svg>
        
        <div class="knobs-container">
            <div class="knob">
                <p class="name">Attack</p>
                <knob v-model.number="envelope.attack" :min="0" :max="10" :stepSize="0.01" :size="48" :valueDisplayFunction="toFixed"
                :primaryColor="attackColor"/>
            </div>

            <div class="knob">
                <p class="name">Decay</p>
                <knob v-model.number="envelope.decay" :min="0" :max="10" :stepSize="0.01" :size="48" :valueDisplayFunction="toFixed"
                :primaryColor="decayColor"/>
            </div>
            
            <div class="knob">
                <p class="name">Sustain</p>
                <knob v-model.number="envelope.sustain" :min="0" :max="1" :stepSize="0.01" :size="48" :valueDisplayFunction="toFixed"
                :primaryColor="sustainColor"/>
            </div>
            
            <div class="knob">
                <p class="name">Release</p>
                <knob v-model.number="envelope.release" :min="0" :max="10" :stepSize="0.01" :size="48" :valueDisplayFunction="toFixed"
                :primaryColor="releaseColor"/>
            </div>
        </div>
    
    </container>
</template>

<script>
    import Range from './Range.vue'
    import Knob from 'vue-knob-control'

    export default {
        name : "envelope",
        props : ["envelope"],
        data : () => ({
            attackColor  : "rgb(128,255,0)",
            decayColor   : "rgb(255,128,0)",
            sustainColor : "rgb(255,255,0)",
            releaseColor : "rgb(0,128,255)"
        }),
        methods : {
            toFixed : (v) => v.toFixed(2),
        },
        computed : {
            length(){ return this.envelope.attack + this.envelope.decay + 1 + this.envelope.release },
            attackWidth()  { return this.envelope.attack  * 256 / this.length },
            decayWidth()   { return this.envelope.decay   * 256 / this.length },
            sustainWidth() { return 1            * 256 / this.length },
            releaseWidth() { return this.envelope.release * 256 / this.length },
            sustainHeight(){ return 96 - (this.envelope.sustain * 96 / 1) },

            points(){
                return [
                    0, 96, 
                    this.attackWidth, 0, 
                    this.attackWidth + this.decayWidth, this.sustainHeight,
                    this.attackWidth + this.decayWidth + this.sustainWidth, this.sustainHeight,
                    256, 96
                ].join(" ");
            }
        }
    }
</script>

<style scoped>
    .envelope{
        width: 288px;
    }
    svg {
        padding: 16px 16px 0 16px;
        background-color:darkblue;
        display: block;
    }
    .knobs-container {
        display: flex;
        flex: 1;
        justify-content: space-between;
        padding: 8px;
    }
    .knob .name {
        margin: 0 0 4px 0;
        padding: 4px 0;
    }
    .name{
        text-align: center;
    }
</style>

