<template>
  <v-dialog max-width="580px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on">
        <v-icon>mdi-plus</v-icon>
        <span>增加步骤</span>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h2>添加步骤</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field
            label="步骤标题"
            v-model="item.title"
            prepend-icon="mdi-folder"
            :rules="inputRules"
          ></v-text-field>

          <v-col>
            <v-btn color="primary" class="mt-3" @click="submit" :loading="loading">添加步骤</v-btn>
          </v-col>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    id: String,
  },
  data() {
    return {
      item: { title: "", done: false },
      dialog: false,
      inputRules: [
        (value) => !!value || "必填",
        (value) => (value && value.length >= 2) || "至少两个字符",
      ],
      loading: false,
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.addItem();
      } else {
        alert("请检查输入");
      }
    },
    addItem() {
      const item = {
          title: this.item.title,
          done: this.item.done,
        },
        id = this.id;

      this.$store.dispatch("addProjectItem", { id, item }).then((res) => {
        this.dialog = false;
        this.loading = false;
        this.$emit("itemAdded");
        this.$refs.form.reset();
      });
    },
  },
};
</script>

<style>
</style>