<template>
  <nav>
    <v-app-bar flat app class="text-uppercase grey--text">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="grey--text"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <span class="font-weight-light">Todo.</span>tech
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on" color="grey">
            <v-icon left>mdi-chevron-down</v-icon>菜单
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="link in links" :key="link.text" :to="link.route">
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn text color="grey">
        <span>退出</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app color="secondary" width="300" v-model="drawer">
      <template v-slot:prepend>
        <v-col align="center" class="pt-12">
          <v-list-item dark>
            <v-list-item-content>
              <v-list-item-title class="title">Todo.tech</v-list-item-title>
              <v-list-item-subtitle>by enpitsulin</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </template>
      <v-divider></v-divider>
      <v-list>
        <v-list-item v-for="(link, index) in links" :key="index" :to="link.route">
          <v-list-item-icon>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-col align="center" class="pt-12">
          <v-btn text dark>
            <v-icon left>mdi-cog-outline</v-icon>
            <span>设置</span>
          </v-btn>
          <v-btn text dark>
            <span>退出</span>
            <v-icon right>mdi-exit-to-app</v-icon>
          </v-btn>
        </v-col>
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      drawer: null,
      links: [
        { icon: "mdi-view-dashboard", text: "任务", route: "/" },
        { icon: "mdi-folder", text: "项目", route: "/projects" },
        { icon: "mdi-information", text: "关于", route: "/about" },
      ],
    };
  },
};
</script>
