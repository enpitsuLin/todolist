<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn block v-on="on" class="success">添加新项目</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h2>添加新项目</h2>
      </v-card-title>

      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field label="项目标题" v-model="title" prepend-icon="mdi-folder" :rules="inputRules"></v-text-field>
          <v-textarea label="详情" v-model="content" prepend-icon="mdi-pencil" :rules="inputRules"></v-textarea>

          <v-menu full-width max-width="290">
            <template v-slot:activator="{on}">
              <v-text-field
                v-on="on"
                label="截止日期"
                :value="computedDateFormattedDatefns"
                prepend-icon="mdi-calendar-range"
              ></v-text-field>
            </template>
            <v-date-picker v-model="due"></v-date-picker>
          </v-menu>

          <v-btn block class="success mt-3 mx-0" @click="submit" :loading="loading">添加项目</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      title: "",
      content: "",
      due: "",
      inputRules: [(v) => v.length >= 3 || "Minimun length is 3 characters"],
      loading: false,
    };
  },
  computed: {
    computedDateFormattedDatefns() {
      return this.due ? format(this.due, "Do MMMM YYYY") : "";
    },
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const project = {
          title: this.title,
          content: this.content,
          due: format(this.due, "Do MMM YYYY"),
          person: "Allen Lin",
          status: "ongoing",
        };
        db.collection("projects")
          .add(project)
          .then((res) => {
            this.dialog = false;
            this.loading = false;
            this.$emit("projectAdded");
          });
      } else {
        alert("輸入資料錯誤");
      }
    },
  },
};
</script>

<style>
</style>