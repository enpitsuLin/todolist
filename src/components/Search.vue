<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-btn icon dark @click="handlerClose">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-text-field
        solo-inverted
        flat
        hide-details
        label="搜索待办事项关键词(名字、备注)"
        append-icon="mdi-magnify"
        @keyup.enter="handleSearch"
        v-model="search_input"
      ></v-text-field>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  data() {
    return { search_input: "" };
  },
  methods: {
    handlerClose() {
      this.$emit("closeSearch");
    },
    handleSearch() {
      console.log("search:" + this.search_input);
    },
  },
};
</script>

<style>
</style>