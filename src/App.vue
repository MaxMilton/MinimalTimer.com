<template>
  <div id="app" class="green">
    <mainmenu v-on:toggleSettings="showSettings = !showSettings"></mainmenu>

    <section v-if="showSettings" class="settings">
      <h2>Settings</h2>

      <!-- <label for="">Enable audio
        <input v-model="audio" type="checkbox">
      </label>
      <label for="">Enable desktop notifications
        <input v-model="notifications" type="checkbox">
      </label> -->
      <label for="">
        <input v-model="autoContinue" type="checkbox">
        Automatically continue after breaks
      </label>

      <h3>Durration</h3>

      <label for="work-duration">Work (minutes)</label>
      <input @change="changed" v-model.number="duration" type="number" id="work-duration" min="1">

      <label for="short-duration">Short break (minutes)</label>
      <input @change="changed" v-model.number="shortBreak" type="number" id="short-duration" min="1">

      <label for="long-duration">Long break (minutes)</label>
      <input @change="changed" v-model.number="longBreak" type="number" id="long-duration" min="1">

      <label for="repeats">Number of short breaks before long break</label>
      <input @change="changed" v-model.number="repeats" type="number" id="repeats" min="1">
    </section>

    <div class="app-content">
      <div class="timer">
        <div v-if="state === 'init'" class="info">
          <h1>Minimal pomodoro timer.</h1>
          <p class="intro">A simple timer based on the <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique" target="_blank">pomodoro technique</a>.</p>
        </div>
        <div v-else class="info">
          <div>{{ status }}<span v-if="status === 'Short Break'"> {{ repeats - remainingCycles }}</span></div>
          <div class="time">{{ remainingTime | humanReadableTime }}</div>
        </div>

        <div class="controls">
          <button v-if="state !== 'run' && state !== 'break' && state !== 'pause'" @click="start" type="button" class="btn btn-start">Start</button>
          <button v-else-if="state !== 'run'" @click="startNow" type="button" class="btn btn-start">Continue</button>
          <button v-if="state !== 'init' && state !== 'pause'" @click="pause" type="button" class="btn btn-pause">Pause</button>
        </div>
        <button v-if="state === 'pause' || settingsChanged" @click="reset" type="button" class="btn btn-reset">Reset</button>
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
      settingsChanged: false,
      // audio: true,
      // notifications: true,
      autoContinue: false,
      repeats: 4,
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
  //   registerNotifications() {
  //     // TODO: Refactor
  //     /* eslint-disable */
  //     // if ('Notification' in window) {
  //     //   this.notificationSupported = true;
  //     //
  //     //   if (Notification.permission === "granted") {
  //     //     // If it's okay let's create a notification
  //     //     const notification = new Notification("Hi there!");
  //     //   } else if (Notification.permission !== 'denied') {
  //     //     Notification.requestPermission(function (permission) {
  //     //       // If the user accepts, let's create a notification
  //     //       if (permission === "granted") {
  //     //         const notification = new Notification("Hi there!");
  //     //       }
  //     //     });
  //     //   }
  //     // }
  //     /* eslint-enable */
  //     this.notification = Notification.requestPermission();
  //     console.log(this.notification);
  //   },
  //   triggerNotification(event) {
  //     // TODO
  //     console.log(event); // eslint-disable-line
  //   },
  //   beep() {
  //     // TODO
  //   },
  },
  methods: {
    finished() {
      if (this.notifications) this.triggerNotification(this.state);
      if (this.audio) this.beep();

      if (this.state === 'run') {
        this.state = 'break';

        if (this.remainingCycles < 1) {
          this.status = 'Long Break';

          // Reset the cycle count
          this.remainingCycles = this.repeats;

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
      this.state = 'init';
      this.status = '';
      this.settingsChanged = false;
      common.changePageColour('green');
    },
    changed() {
      if (this.remainingTime !== (this.duration * 60)) this.settingsChanged = true;
    },
  },
  beforeMount() {
    // FIXME: Don't reset the timer when navigating to differnt pages and coming back
    this.remainingTime = this.duration * 60;
    this.remainingCycles = this.repeats;
  },
  // mounted() {
  //   this.registerNotifications();
  // },
};
</script>

<style lang="scss">
@import "scss/variables";

#body {
  color: red;
  position: sticky;

  padding-left: 0.5rem;
  padding-right: 0.5rem
}



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

  @media (max-width: $small) {
    font-size: $font-size-base-small;
  }
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

.intro {
  margin: 0 0 2rem;
}

.timer {
  text-align: center;
}

.time {
  margin: .5rem 0 1.5rem;
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

.btn-pause {
  opacity: .3;
  transition: opacity 200ms linear;

  &:hover {
    opacity: 1;
  }
}

.btn-reset {
  background: transparent;
  color: $white;
  margin-top: 1rem;
  font-size: 1.5rem;
}

.settings {
  position: absolute;
  padding: 0 1rem;
}

label {
  display: block;
}

input[type="checkbox"] {
  // TODO: Custom checkbox inputs
  //  REF: https://kyusuf.com/post/completely-css-custom-checkbox-radio-buttons-and-select-boxes
  //  REF: http://v4-alpha.getbootstrap.com/components/forms/#checkboxes-and-radios-1
}

input[type="number"] {
  font-size: 1.5rem;
  padding: .5rem 1rem;
  max-width: 5rem;
  margin-bottom: 1rem;
}
</style>
