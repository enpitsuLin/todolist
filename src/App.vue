<template>
  <v-app id="inspire">
    <navbar />
    <!-- 中间区域 -->
    <v-main class="grey lighten-4">
      <!--  <todolist /> -->
    </v-main>
    <!-- 浮动按钮 -->
    <v-speed-dial v-model="fab" bottom right direction="top" absolute>
      <template v-slot:activator>
        <v-btn v-model="fab" color="blue darken-2" dark fab>
          <v-icon v-if="fab">mdi-check</v-icon>
          <v-icon v-else>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="green" @click="dialog = !dialog">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn fab dark small color="indigo">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn fab dark small color="red">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>
    <!-- 搜索弹出窗口 -->
    <v-dialog v-model="search" fullscreen hide-overlay transition="scroll-y-transition">
      <search @closeSearch="search=false" />
    </v-dialog>
  </v-app>
</template>

<script>
import navbar from "./components/Navbar.vue";

export default {
  data() {
    return {
      fab: false,
    };
  },
  components: {
    navbar,
  },
  methods: {},
};
</script>
<style lang="scss">
</style>