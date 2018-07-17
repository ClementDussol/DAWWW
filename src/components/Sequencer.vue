<template>
    <container class="sequencer" :content="loop" :main="true" :draggable="true" :name="'Sequencer'">
        <table>
            <tr v-for="(note, row) in notes" :key="note + octave" :class="(note.indexOf('#') > -1) ? 'sharp' : ''">
                <td @click="triggerConnected(note)">{{ note + octave }}</td>
                <td v-for="col in loop.length" :key="col" @click="toggleNote(row, col)" :class="['note', (matrix[row][col] ? 'active' : ''), (loop.column == col ? 'current' : '')]"></td>
            </tr>
        </table>
    </container>
</template>

<script>
    import Tone from 'tone'

    let notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].reverse();

    let matrix = [];
    notes.forEach((n)=>{
        matrix.push(new Array(16).fill(0));
    });
    let col = 0;
    let loop = new Tone.Sequence((time, col)=>{
        if(loop.connected){
           for(var i = 0; i < matrix.length; i++){
               if(matrix[i][col]) loop.connected.triggerAttackRelease(notes[i] + 4, "16n");
           }
        };
        col = col;
    }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n");

    loop.connect = function(v){
        loop.connected = v;
    }

    loop.disconnect = function(v){
        loop.connected = null;
    }

    console.log(loop);
    Tone.Transport.start();
    loop.start();

    export default {
        name : "sequencer",
        data : () => ({
            loop : loop,
            octave : 4,
            notes : notes,
            matrix : matrix
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
                console.log(note);
                this.loop.connected.triggerAttackRelease(note + this.octave, "16n");
            }
        }
    }
</script>  

<style scoped>
    .note.active {
        background-color: black;
    }
    tr {
        height: 16px;
    }
    tr.sharp {
        background-color: rgba(0, 0, 0, 0.25);
    }
    td {
        width: 16px;
        border: 1px solid grey;
    }
    td.current {
        background-color: rgba(0, 128, 255, 0.2);
    }
</style>
