<template>
  <section class="settings">
    <button @click="show = !show" type="button" class="btn-settings">
      ⚙ Settings
    </button>

    <div v-if="show" class="settings-panel">
      TODO: Add settings
    </div>
  </section>
</template>

<script>
export default {
  name: 'settings',
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style lang="scss">
@import "../scss/variables";

#app {
  // background-color: cornflowerblue;
  // color: white;
}

.btn-settings {
  background-color: $red;
  color: $white;
  font-size: 1.4rem;
}
</style>
