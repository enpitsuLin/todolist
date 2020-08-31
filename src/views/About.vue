<template>
  <div class="projects">
    <h1 class="text-subtitle-1 grey--text">About</h1>
    <v-container class="my-2 pa-1 my-md-8 pa-md-6">
      <v-row no-gutters>
        <v-col cols="12" sm="5" md="5" lg="3">
          <v-card flat class="text-sm-center ma-3" height="240">
            <v-responsive class="pt-4 text-center">
              <v-avatar size="100" class="grey lighten-2">
                <img src="../assets/images/avatar-1.png" />
              </v-avatar>
            </v-responsive>

            <v-card-text class="text-center">
              <div class="subheading">EnpitsuLin</div>
              <div class="grey--text">22岁 是学生desu</div>
            </v-card-text>

            <v-card-actions>
              <div class="mx-auto px-0">
                <v-btn outlined text color="grey" href="https://github.com/enpitsulin" target="_blank">
                  <v-icon small>mdi-github</v-icon>
                  <span>Github</span>
                </v-btn>
                <v-btn outlined text color="grey" href="https://gitee.com/enpitsulin" target="_blank">
                  <span>Gitee</span>
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col sm="7" md="7" lg="9">
          <v-card flat class="ma-3" height="240">
            <v-card-title class="headline">Todo.tech</v-card-title>
            <v-card-subtitle>一个没啥用的todo应用</v-card-subtitle>
            <v-card-text>
              <div class="text-center">勉强使用了webpack工具打包</div>
              <div class="text-center">以及马上过气vue2.0</div>
              <div class="text-center">还有弱鸡的localStorage做储存</div>
              <div class="text-center">使用了material design设计</div>
            </v-card-text>
            <v-card-actions>
              <div class="mx-auto mx-sm-0">
                <v-btn text color="grey">
                  <v-icon small left>mdi-arrow-right</v-icon>
                  <span>访问git主页了解更多菜鸡作品</span>
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style>
</style>