<template>
	<div id="app" @mousedown.prevent @mouseup.prevent @mousemove.prevent>
		<sequencer></sequencer>
		<connection v-for="(connection, index) in connections" :key="index" :connection="connection" @click="disconnect(index)"/>
		
		<synth :synth="synth"></synth>
		<ping-pong-delay :pingPongDelay="delay"></ping-pong-delay>
		<master></master>
	</div>
</template>

<script>
import Tone from 'tone'

let synth = new Tone.Synth()
	synth.oscillator.type = "square";
let delay = new Tone.PingPongDelay();

export default {
	name: 'app',
	data () {
		return { 
			synth, 
			delay,

			initiatedConnection : null,
			connections : [],
		}
	},
	methods : {
		connect(node, el){
			if(this.initiatedConnection && this.initiatedConnection.node != node) {		
				let connection = [this.initiatedConnection, { node, el }];

				this.connections.push(connection);

				this.initiatedConnection.node.connect(node); 
				this.initiatedConnection = null
				return
			};

			if(!this.initiatedConnection){ 
				this.initiatedConnection = { node, el }
			};
		},
		disconnect(connection){
			for(var i = 0; i < this.connections.length; i++)
			{
				if(this.connections[i] == connection)
				{
					console.log("disconnect " + i);
					this.connections.splice(i, 1);
				}
			}
		}
	}
}

</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: monospace;
	}
	#app {
		background-color: gray;
	}
</style>
