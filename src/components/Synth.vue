<template>
    <container name="Synth" class="synth" :draggable="true" :content="synth" :main="true">

        <div class="button-container">
            <button @click="toggle">{{ isPlaying ? "Pause" : "Play" }}</button>
            <button @click="trigger">Note</button>
        </div>

        <oscillator :oscillator="synth.oscillator"/>
        <envelope :envelope="synth.envelope" />
    </container>
</template>

<script>
    export default {
        name : "Synth",
        props: ["synth"],
        data : () => ({
            isPlaying : false,
        }),
        methods : {
            toggle(){
                if(this.isPlaying)
                {
                    this.isPlaying = false;
                    this.synth.triggerRelease();
                }else{
                    this.isPlaying = true;
                    this.synth.triggerAttack("C4");
                }
            },
            trigger(){
                this.synth.triggerAttackRelease("C4", "16n");
            }
        }
    }
</script>

<style scoped>
    .button-container {
        display: flex;
    } 
    button {
        display: block;
        padding: 8px;
        flex: 1;
    }
</style>
