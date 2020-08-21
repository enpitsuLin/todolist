<template>
  <v-app id="inspire">
    <!-- 侧拉菜单 -->
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <span>侧拉菜单占位</span>
    </v-navigation-drawer>
    <!-- app bar -->
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span>Todo List</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu
        ref="menu"
        v-model="calendar"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-calendar-text</v-icon>
          </v-btn>
        </template>
        <v-date-picker v-model="date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text @click="menu = false">取消</v-btn>
          <v-btn text @click="$refs.menu.save(date)">确定</v-btn>
        </v-date-picker>
      </v-menu>
      <v-btn icon @click="search = !search">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
    <!-- 中间区域 -->
    <v-main>
      <todolist />
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
import search from "./components/Search.vue";
import todolist from "./components/TodoList.vue";
export default {
  data() {
    return {
      fab: false,
      calendar: false,
      date: new Date().toISOString().substr(0, 10),
      search: false,
      drawer: false,
    };
  },
  components: {
    search,
    todolist,
  },
  methods: {},
};
</script>
<style lang="scss">
</style>