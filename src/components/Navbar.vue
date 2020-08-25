<template>
  <nav>
    <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
      <span>Awesome! You added a new project.</span>
      <v-btn text color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>

    <v-app-bar flat app class="text-uppercase grey--text">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="grey--text"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <span class="font-weight-light">Todo</span>.tech
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on" color="grey">
            <v-icon left>mdi-chevron-down</v-icon>
            <span>菜单</span>
          </v-btn>
        </template>
        <v-list-item-group>
          <v-list-item v-for="link in links" :key="link.text" :to="link.route">
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-menu>

      <v-btn text color="grey">
        <span>关闭</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app class="teal lighten-1" v-model="drawer"></v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      drawer: true,
      links: [
        { icon: "mdi-view-dashboard", text: "代办事项", route: "/" },
        { icon: "mdi-folder", text: "项目", route: "/projects" },
        //{ icon: "mdi-person", text: "小组", route: "/team" },
      ],
      snackbar: false,
    };
  },
};
</script>
