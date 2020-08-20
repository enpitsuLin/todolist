<template>
  <v-container fluid class="fill-height">
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <template v-slot:default="{ open }">
            <v-row no-gutters>
              <v-col cols="4">Item Name</v-col>
              <v-col cols="8" class="text--secondary">
                <v-fade-transition leave-absolute>
                  <span v-if="open" key="0">详情描述巴拉巴拉巴拉</span>
                  <v-row v-else no-gutters style="width: 100%">
                    <v-col cols="12">简单描述</v-col>
                  </v-row>
                </v-fade-transition>
              </v-col>
            </v-row>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-img :src="require('../images/pic.jpg')" height="125" class="grey darken-4"></v-img>
          <v-row justify="space-around" no-gutters>
            <v-col cols="10"></v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-row no-gutters>
      <v-col cols="8" offset="2" offset-xs="0" align="center">
        <v-pagination v-model="page" :length="5"></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
    };
  },
};
</script>

<style>
</style>