<template>
  <v-snackbar
    v-model="snackbar"
    :timeout="undo?4000:2500"
    top
    :color="undo?'error':'success'"
  >
    <span>{{msg}}</span>
    <template v-slot:action="{ attrs }">
      <v-btn dark icon v-bind="attrs" @click="handleUndo" v-if="undo">
        <v-icon>mdi-undo-variant</v-icon>
      </v-btn>
      <v-btn dark icon v-bind="attrs" @click="snackbar = false">
        <v-icon>mdi-close-circle</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "Snackbar",
  data() {
    return {
      snackbar: false,
      undo: false,
      msg: "",
    };
  },
  methods: {
    handleUndo() {
      this.snackbar = false;
      this.$emit("handleUndo");
    },
    show(message) {
      this.undo = false;
      this.msg = message;
      this.snackbar = true;
    },
    showError(message) {
      this.undo = true;
      this.msg = message;
      this.snackbar = true;
    },
  },
};
</script>

<style>
</style>