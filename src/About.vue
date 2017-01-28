<template>
  <div id="app">
    <mainmenu></mainmenu>

    <h1>About</h1>
    <p>
      Overview.

      <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique" target="_blank">wikipedia.org/wiki/Pomodoro_Technique</a>
    </p>

    <ol>
      <li>Decide on the task to be done.</li>
      <li>Set the pomodoro timer (traditionally to 25 minutes).</li>
      <li>Work on the task until the timer rings. If a distraction pops into your head, write it down, but immediately get back on task.</li>
      <li>After the timer rings, put a checkmark on a piece of paper.</li>
      <li>If you have fewer than four checkmarks, take a short break (3–5 minutes), then go to step 1.</li>
      <li>After four pomodoros, take a longer break (15–30 minutes), reset your checkmark count to zero, then go to step 1.</li>
    </ol>

    <h2>Technical overview</h2>
    <p>
      Tech info.
    </p>

    <ul>
      <li>
        open source, link to repo
      </li>
    </ul>
  </div>
</template>

<script>
import Mainmenu from './components/Mainmenu';

export default {
  name: 'about',
  components: {
    Mainmenu,
  },
};
</script>

<style lang="scss">
// @import "scss/variables";
</style>
