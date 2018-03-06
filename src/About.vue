<template>
  <div id="app">
    <mainmenu></mainmenu>

    <div class="page">
      <h1>About MinimalTimer.com</h1>
      <p>
        Overview.
      </p>


      <h2>The Pomodoro Technique</h2>
      <ol>
        <li>Decide on the task to be done.</li>
        <li>Set the timer (traditionally to 25 minutes).</li>
        <li>Work on the task until the timer rings. If a distraction pops into your head, write it down, but immediately get back on task.</li>
        <li>After the timer rings, take a short break (3–5 minutes), then go to step 1.</li>
        <li>After four short breaks, take a longer break (15–30 minutes), reset your break count to zero, then go to step 1.</li>
      </ol>
      <p>
        More info: <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique" target="_blank">wikipedia.org/wiki/Pomodoro_Technique</a>
      </p>

      <h2>Technical overview</h2>
      <p>Full source code for this website is availiable at: <a href="https://github.com/MaxMilton/MinimalTimer.com"> https://github.com/MaxMilton/MinimalTimer.com</a>.</p>

      <p>&copy; <a href="https://maxmilton.com">Max Milton</a></p>
    </div>
  </div>
</template>

<script>
import common from './common';
import Mainmenu from './components/Mainmenu';

export default {
  name: 'about',
  components: {
    Mainmenu,
  },
  mounted() {
    common.changePageColour('blue-grey');
  },
};
</script>

<style lang="scss">
@import "scss/variables";

// FIXME: Fix colour flash when changing from home to about page
// FIXME: Background colour doesn't extend beyond initial screen size (can't read when scrolling)

// #app {}

li {
  margin-bottom: .7rem;
}

.page {
  padding: 3rem 18rem 0;

  @media (max-width: $small) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

</style>
