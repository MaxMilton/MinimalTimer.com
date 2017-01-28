<template>
  <div id="app">
    <mainmenu></mainmenu>
    <settings></settings>

    <h1>EXPERIMENTAL: Pomodoro Timer</h1>
    <p>Time left: {{ humanReadableTime(remainingTime) }}</p>
    <p>Cycles left: {{ remainingCycles }}</p>

    <button v-if="status !== 'running'" @click="start" type="button" class="btn-start">Start</button>
    <button v-if="status === 'running'" @click="pause" type="button" class="btn-pause">Pause</button>
    <button v-if="status === 'running' || status === 'paused'" @click="restart" type="button" class="btn-restart">Reset timer</button>
    <!-- <button @click="" type="button" class="btn-continue">Continue</button> -->

    <p>Status: {{ status }}</p>

    <div class="circle">
      <!-- TODO -->
      circle here
    </div>
  </div>
</template>

<!-- FIXME: Don't reset the timer when navigating to differnt pages and come back -->
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
      timerLength: 5, // seconds = 25 minutes
      cycles: 4,
      shortBreak: 300, // seconds = 5 minutes
      longBreak: 1800, // seconds = 30 minutes
      // audio: true,
      // notifications: true,
      // autoContinue: false,
      remainingTime: 0,
      remainingPercent: 100,
      remainingCycles: 0,
      status: 'waiting',
    };
  },
  computed: {
  },
  methods: {
    takeBreak(breakLength) {
      console.log(`${breakLength} BREAK TIME!`); // eslint-disable-line
    },
    humanReadableTime(seconds) {
      // TODO: Singluar noun for 1 minute and 1 second
      return seconds < 60 ? `${seconds} seconds` : `${Math.trunc(seconds / 60)} minutes ${seconds % 60} seconds`;
    },
    finished() {
      if (this.remainingCycles < 1) {
        this.takeBreak('long');
        this.restart();
      } else {
        this.remainingCycles -= 1;
        this.restart();
        this.takeBreak('short');

        // Do something else
      }
    },
    start() {
      if (this.status !== 'running') {
        this.status = 'running';

        // Count down every second
        // TODO: Test this is acurate - otherwise calculate the time passed with Date.now
        this.timer = window.setInterval(() => {
          this.remainingTime -= 1;
          this.remainingPercent = Math.trunc((this.remainingTime / this.timerLength) * 100);

          if (this.remainingTime < 1) this.finished();
        }, 1000); // ms
      }
    },
    pause() {
      // Cancel the count down
      window.clearInterval(this.timer);

      this.status = 'paused';
    },
    restart() {
      // Cancel the count down
      window.clearInterval(this.timer);

      // Reset remaining time
      this.remainingTime = this.timerLength;

      this.status = 'waiting';
    },
  },
  beforeMount() {
    this.remainingTime = this.timerLength;
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
}
</style>
