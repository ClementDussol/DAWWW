import Vue        from 'vue'
import App        from './App.vue'
import Knob       from 'vue-knob-control'
import Envelope   from './components/Envelope.vue'
import Container  from './components/Container.vue'
import Oscillator from './components/Oscillator.vue'
import Synth      from './components/Synth.vue'
import PPDelay    from './components/PingPongDelay.vue'
import Master     from './components/Master.vue'
import Anchor     from './components/Anchor.vue'
import Connection from './components/Connection.vue'
import Sequencer  from './components/Sequencer.vue'

Vue.component("container",       Container);
Vue.component("envelope",        Envelope);
Vue.component("oscillator",      Oscillator);
Vue.component("synth",           Synth);
Vue.component("knob",            Knob);
Vue.component("ping-pong-delay", PPDelay);
Vue.component("master",          Master);
Vue.component("anchor",          Anchor);
Vue.component("connection",      Connection);
Vue.component("sequencer",       Sequencer);


new Vue({
  el: '#app',
  render: h => h(App)
})