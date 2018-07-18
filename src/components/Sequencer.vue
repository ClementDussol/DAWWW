<template>
    <container class="sequencer" :content="loop" :main="true" :draggable="true" :name="'Sequencer'">
        <table>
            <tr v-for="(note, row) in notes" :key="note + octave" :class="(note.indexOf('#') > -1) ? 'sharp' : ''">
                <td @click="triggerConnected(note)">{{ note + octave }}</td>
                <td v-for="col in columns" :key="col" @click="toggleNote(row, col)" :class="['note', (matrix[row][col] ? 'active' : ''), (loop.column == col ? 'current' : '')]"></td>
            </tr>
        </table>
        <button @click="toggle">{{ loop.state == 'started' ? "Stop" : "Start" }}</button>
        <!--
        <div class="knob">
            <p class="name">Octave</p>
            <knob v-model.number="octave" :min="1" :max="8" :stepSize="1" :size="48" />
        </div>
        -->
    </container>
</template>

<script>
    import Tone from 'tone'

    let notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].reverse();
    let columns = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    let matrix = [];
    let octave = 4;
    
    notes.forEach((n)=>{
        matrix.push(new Array(16).fill(0));
    });
    
    let loop = new Tone.Sequence((time, col)=>{
        if(loop.connected){
           for(var i = 0; i < matrix.length; i++){
               if(matrix[i][col]) loop.connected.triggerAttackRelease(notes[i] + octave, "16n");
           }
        };
        loop.column = col;
    }, columns, "16n");
    
    loop.column = 0;
    
    loop.connect = function(v){
        loop.connected = v;
    }

    loop.disconnect = function(v){
        loop.connected = null;
    }

    Tone.Transport.start();

    export default {
        name : "sequencer",
        data : () => ({
            loop    : loop,
            octave  : octave,
            notes   : notes,
            matrix  : matrix,
            columns : columns
        }),
        methods : {
            toggleNote(row, col){
                if(this.matrix[row][col])
                {
                    this.matrix[row][col] = 0;
                }else{
                    this.matrix[row][col] = 1;
                }
                this.$forceUpdate()
            },
            triggerConnected(note){
                if(!this.loop.connected) return;
                this.loop.connected.triggerAttackRelease(note + this.octave, "16n");
            },
            toggle(){
                if(this.loop.state == "stopped")
                {
                    this.loop.start();
                }else{
                    this.loop.stop();
                }
            }
        }
    }
</script>  

<style scoped>
    .note.active {
        background-color: black;
    }
    table {
        border-spacing: 0;
    }
    tr {
        height: 24px;
    }
    tr.sharp {
        background-color: rgba(0, 0, 0, 0.25);
    }
    td {
        width: 32px;
        border: 1px solid rgba(0, 0, 0, 0.1);
    }
    td.current {
        background-color: rgba(0, 128, 255, 0.2);
    }
</style>
