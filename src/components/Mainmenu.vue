<template>
  <nav>
    <a v-if="!isHome" @click="go" href="/" class="nav-link">Home</a>
    <a v-if="!isAbout" @click="go" href="/about" class="nav-link">About</a>
    <a @click="settings" href="#" class="nav-link nav-settings">Settings</a>

    <!-- FIXME: REMOVE, DEV ONLY! -->
    <!-- <a href="/404" class="nav-link">404</a> -->
  </nav>
</template>

<script>
export default {
  name: 'mainmenu',
  computed: {
    isHome() {
      return this.$root.currentRoute === '/';
    },
    isAbout() {
      return this.$root.currentRoute === '/about';
    },
  },
  methods: {
    go(event) {
      event.preventDefault();
      const href = event.target.getAttribute('href');
      this.$root.currentRoute = href;
      window.history.pushState(null, '', href);
    },
    settings(event) {
      event.preventDefault();
      this.$emit('toggleSettings');
    },
  },
};
</script>

<style lang="scss">
@import "../scss/variables";

nav {
  position: absolute;
  display: block;
  background: $white;
  bottom: 0;
  padding: 0 1rem;
}

.nav-link {
  color: $deep-grey;
  padding: 1rem;
  display: inline-block;
  text-decoration: none;
}
</style>
