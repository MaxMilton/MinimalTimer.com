<template>
  <div id="app">
    <mainmenu></mainmenu>
    <settings></settings>

    <h1>EXPERIMENTAL: Pomodoro Timer</h1>
    <p>Time left: {{ remainingTime }}</p>
    <p>Cycles left: {{ remainingCycles }}</p>

    <button type="button" class="btn-start">Start</button>
    <button type="button" class="btn-pause">Pause</button>
    <button type="button" class="btn-restart">Restart</button>
  </div>
</template>

<script>
import Mainmenu from './components/Mainmenu';
import Settings from './components/Settings';

export default {
  name: 'app',
  components: {
    Mainmenu,
    Settings,
  },
  data() {
    return {
      length: 1500, // seconds = 25 minutes
      cycles: 4,
      shortBreak: 300, // seconds = 5 minutes
      longBreak: 1800, // seconds = 30 minutes
      audio: true,
      notifications: true,
      remainingTime: 0,
      remainingCycles: 0,
    };
  },
  methods: {
    humanReadableTime(seconds) {
      return seconds < 60 ? `${seconds} seconds` : `${Math.floor(seconds / 60)} minutes`;
    },
  },
  beforeMount() {
    this.remainingTime = this.humanReadableTime(this.length);
    this.remainingCycles = this.cycles;
  },
};
</script>

<style lang="scss">
@import "scss/variables";

#app {
  font-family: $font-family;
  font-size: $font-size-base;
  color: $body-colour;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
