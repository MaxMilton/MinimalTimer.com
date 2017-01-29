<template>
  <div id="app" class="green">
    <mainmenu v-on:toggleSettings="showSettings = !showSettings"></mainmenu>

    <section v-if="showSettings" class="settings">
      <h2>Settings</h2>

      <label for="">Enable audio
        <input v-model="audio" type="checkbox">
      </label>
      <label for="">Enable desktop notifications
        <input v-model="notifications" type="checkbox">
      </label>
      <label for="">Automatically continue after breaks
        <input v-model="autoContinue" type="checkbox">
      </label>

      <h3>Durration</h3>

      <label for="">Work
        <input v-model="duration" type="number"> minutes
      </label>
      <label for="">Short breat
        <input v-model="shortBreak" type="number"> minutes
      </label>
      <label for="">Long break
        <input v-model="longBreak" type="number"> minutes
      </label>
      <label for="">Repeats before long break
        <input v-model="cycles" type="number">
      </label>
    </section>

    <div class="app-content">
      <div class="timer">
        <div v-if="state === 'init'" class="info">
          <h1>A simple pomodoro timer.</h1>
        </div>
        <div v-else class="info">
          <p>{{ status }}<span v-if="status === 'Short Break'"> {{ cycles - remainingCycles }}</span></p>
          <p class="time">{{ remainingTime | humanReadableTime }}</p>
        </div>

        <div class="controls">
          <button v-if="state !== 'run' && state !== 'break' && state !== 'pause'" @click="start" type="button" class="btn btn-start">Start</button>
          <button v-else-if="state !== 'run'" @click="startNow" type="button" class="btn btn-start">Continue</button>
          <button v-if="state !== 'init' && state !== 'pause'" @click="pause" type="button" class="btn btn-pause">Pause</button>
        </div>
        <button v-if="state === 'pause'" @click="reset" type="button" class="btn btn-reset">Reset</button>
      </div>
    </div>
  </div>
</template>

<script>
import common from './common';
import Mainmenu from './components/Mainmenu';

export default {
  name: 'app',
  components: {
    Mainmenu,
  },
  data() {
    return {
      showSettings: false,
      audio: true,
      notifications: true,
      autoContinue: false,
      cycles: 4,
      duration: 25,   // minutes
      shortBreak: 5,  // minutes
      longBreak: 30,  // minutes
      remainingTime: 0,
      remainingPercent: 100,
      remainingCycles: 0,
      status: '',       // Shown in UI
      state: 'init',    // Used internally
    };
  },
  filters: {
    humanReadableTime(seconds) {
      return seconds < 60 ? `${seconds} s` : `${Math.trunc(seconds / 60)} m : ${seconds % 60} s`;
    },
  },
  computed: {
    registerNotifications() {
      // TODO
    },
  },
  methods: {
    finished() {
      if (this.notifications) common.triggerNotification(this.state);
      if (this.audio) common.beep();

      if (this.state === 'run') {
        this.state = 'break';

        if (this.remainingCycles < 1) {
          this.status = 'Long Break';

          // Reset the cycle count
          this.remainingCycles = this.cycles;

          // Reset timer count
          this.restart(this.longBreak * 60);
        } else {
          this.remainingCycles -= 1;
          this.status = 'Short Break';

          // Reset timer count
          this.restart(this.shortBreak * 60);
        }
      } else {
        this.state = 'run';
        this.status = '';
      }

      if (this.state === 'break' && this.autoContinue) {
        this.start();
      } else if (this.state !== 'break') {
        this.pause();
      } else {
        this.start();
      }
    },
    start() {
      if (this.state === 'break') {
        common.changePageColour('deep-purple');
      } else {
        this.state = 'run';
        this.status = '';
        common.changePageColour('blue');
      }

      // Count down every second
      // TODO: Calculate the time passed with Date.now for better accuracy
      this.timer = window.setInterval(() => {
        this.remainingTime -= 1;
        this.remainingPercent = Math.trunc((this.remainingTime / (this.duration * 60)) * 100);

        if (this.remainingTime < 1) this.finished();
      }, 1000); // ms
    },
    startNow() {
      if (this.state === 'break') {
        this.restart(this.duration * 60);
        this.state = 'run';
        this.status = '';
      }

      this.start();
    },
    pause() {
      // Cancel the count down
      window.clearInterval(this.timer);

      if (this.state !== 'break') this.state = 'pause';
      this.status = 'Paused';
    },
    restart(newDuration) {
      // Cancel the count down
      window.clearInterval(this.timer);

      // Restart remaining time
      this.remainingTime = newDuration;
    },
    reset() {
      this.restart(this.duration * 60);
      this.status = '';
    },
  },
  beforeMount() {
    // FIXME: Don't reset the timer when navigating to differnt pages and coming back
    this.remainingTime = this.duration * 60;
    this.remainingCycles = this.cycles;
  },
};
</script>

<style lang="scss">
@import "scss/variables";

html,
body,
#app {
  height: 100%;
}

body {
  margin: 0;
}

#app {
  font-family: $font-family;
  font-size: $font-size-base;
  color: $body-colour;
  background-size: cover;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: background-color 1s linear;
}

h1 {
  margin-top: 0;
}

a {
  color: $body-colour;
}

.red {
  background-color: $red;
}

.purple {
  background-color: $purple;
}

.deep-purple {
  background-color: $deep-purple;
}

.blue {
  background-color: $blue;
}

.green {
  background-color: $green;
}

.blue-grey {
  background-color: $blue-grey;
}

.app-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.timer {
  text-align: center;
}

.time {
  font-size: 2rem;
  font-weight: bold;
}

.btn {
  display: inline-block;
  font-size: 2rem;
  border: 0;
  background-color: $white;
  text-transform: uppercase;
  padding: 1rem;
  cursor: pointer;
  text-decoration: none;
  color: $deep-grey;
}

.btn-reset {
  background: transparent;
  color: $white;
  margin-top: 1rem;
  font-size: 1.5rem;
}

.settings {
  position: absolute;
}

label {
  display: block;
}
</style>
