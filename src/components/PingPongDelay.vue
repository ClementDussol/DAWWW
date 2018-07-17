<template>
    <container :name="'Ping pong delay'" :draggable="true" :content="pingPongDelay" :main="true">
        <div class="knobs-container">
            <div class="knob">
                <p class="name">Delay</p>
                <knob v-model.number="delay" @input="updateDelay" :min="0" :max="4" :stepSize="1" :size="48" :valueDisplayFunction="toTime"/>
            </div>
            
            <div class="knob">
                <p class="name">Feedback</p>
                <knob v-model.number="pingPongDelay.feedback.value" :min="0" :max="1" :stepSize="0.01" :size="48" :valueDisplayFunction="toFixed"/>
            </div>
            
            <div class="knob">
                <p class="name">Wet</p>
                <knob v-model.number="pingPongDelay.wet.value" :min="0" :max="1" :stepSize="0.01" :size="48" :valueDisplayFunction="toFixed"/>
            </div>
        </div>
    </container>
</template>

<script>
export default {
    name : "ping-pong-delay",
    props : ["pingPongDelay"],
    data : ()=>({
        delayMap : ["16n", "8n", "4n", "2n", "1n"],
        delay : 0
    }),
    methods : {
        toFixed : (v)=> v.toFixed(2),
        toTime(v){ return this.delayMap[v] },
        updateDelay(v){
            this.pingPongDelay.delayTime = this.toTime(v);
        }
    }
}
</script>

<style scoped>
    .container {
        width: 192px;
    }
    .knobs-container {
        display: flex;
        flex: 1;
        justify-content: space-between;
        padding: 8px;
    }
    .knob {
        width: 48px;
    }
    .knob .name {
        margin: 0 0 4px 0;
        padding: 4px 0;
        text-align: center;
    }
    .name{
        text-align: center;
    }
</style>
