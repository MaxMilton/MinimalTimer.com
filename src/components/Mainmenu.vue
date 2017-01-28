<template>
  <nav class="mainmenu">
    <a @click="go" href="/" class="nav-link">Home</a>
    <a @click="go" href="/about" class="nav-link">About</a>

    <!-- FIXME: Remove this, DEV ONLY! -->
    <a @click="go" href="/404" class="nav-link">404</a>
  </nav>
</template>

<script>
export default {
  name: 'mainmenu',
  methods: {
    go(event) {
      event.preventDefault();
      const href = event.target.getAttribute('href');
      this.$root.currentRoute = href;
      window.history.pushState(null, '', href);
    },
  },
};
</script>

<style>
.mainmenu {
  margin-bottom: 1rem;
}
</style>
