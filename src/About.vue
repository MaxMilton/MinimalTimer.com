<template>
  <div id="app">
    <mainmenu></mainmenu>

    <h1>About</h1>
    <p>
      Overview.
    </p>

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
