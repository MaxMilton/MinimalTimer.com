<template>
  <div id="app">
    <mainmenu></mainmenu>
    <settings></settings>

    <h1>EXPERIMENTAL: Pomodoro Timer</h1>
    <p>Time left: {{ humanReadableTime(remainingTime) }}</p>
    <p>Cycles left: {{ remainingCycles }}</p>

    <button @click="start" type="button" class="btn-start">Start</button>
    <button @click="pause" type="button" class="btn-pause">Pause</button>
    <button @click="restart" type="button" class="btn-restart">Restart</button>

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
      timerLength: 1500, // seconds = 25 minutes
      cycles: 4,
      shortBreak: 300, // seconds = 5 minutes
      longBreak: 1800, // seconds = 30 minutes
      // audio: true,
      // notifications: true,
      remainingTime: 0,
      remainingPercent: 100,
      remainingCycles: 0,
      status: 'waiting',
    };
  },
  methods: {
    humanReadableTime(seconds) {
      // TODO: Singluar noun for 1 minute and 1 second
      return seconds < 60 ? `${seconds} seconds` : `${Math.trunc(seconds / 60)} minutes ${seconds % 60} seconds`;
    },
    finished() {
      if (this.remainingCycles === 0) {
        // Do something
      } else {
        this.remainingCycles -= 1;

        // Do something else
      }
    },
    start() {
      if (this.status !== 'running') {
        this.status = 'running';

        if (this.remainingTime === 0) this.finished();

        // Count down every second
        // TODO: Test this is acurate - otherwise calculate the time passed with Date.now
        this.timer = window.setInterval(() => {
          this.remainingTime -= 1;
          this.remainingPercent = Math.trunc((this.remainingTime / this.timerLength) * 100);
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
