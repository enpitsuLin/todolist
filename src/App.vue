<template>
  <v-app id="inspire">
    <navbar />

    <v-main class="grey lighten-4">
      <router-view class="mx-4 mb-4"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import navbar from "./components/Navbar.vue";

export default {
  data() {
    return {};
  },
  components: {
    navbar,
  },
  methods: {},
};
</script>
<style lang="scss">
</style>