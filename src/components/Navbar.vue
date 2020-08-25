<template>
  <nav>
    <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
      <span>漂亮！你成功添加了一个新项目</span>
      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="snackbar = false">关闭</v-btn>
      </template>
    </v-snackbar>

    <v-app-bar flat app class="text-uppercase grey--text">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="grey--text"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <span class="font-weight-light">Todo.</span>tech
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <!-- bar item -->
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on" color="grey">
            <v-icon left>mdi-chevron-down</v-icon>菜单
          </v-btn>
        </template>
        <v-list-item v-for="link in links" :key="link.text" :to="link.route">
          <v-list-item-title>{{ link.text }}</v-list-item-title>
        </v-list-item>
      </v-menu>

      <v-btn text color="grey">
        <span>关闭</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app color="secondary" width="300" v-model="drawer">
      <template v-slot:prepend>
        <v-col align="center" class="pt-12">
          <v-avatar color="white" size="100">
            <img
              src="https://portrait.gitee.com/uploads/avatars/user/2457/7373113_enpitsulin_1585288174.png"
            />
          </v-avatar>
          <p class="white--text subheading mt-1">enpitsulin</p>
        </v-col>

        <v-col class="px-12">
          <newproject @itemAdded="snackbar = true" />
        </v-col>
      </template>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item v-for="(link, index) in links" :key="index" :to="link.route">
          <v-list-item-icon>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import newproject from "./NewProject.vue";
export default {
  components: { newproject },
  data() {
    return {
      drawer: true,
      links: [
        { icon: "mdi-view-dashboard", text: "代办事项", route: "/" },
        { icon: "mdi-folder", text: "项目", route: "/projects" },
        //{ icon: "mdi-person", text: "小组", route: "/team" },
        { icon: "mdi-information", text: "关于", route: "/about" },
      ],
      snackbar: false,
    };
  },
};
</script>
