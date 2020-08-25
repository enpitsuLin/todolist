<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn block v-on="on" color="primary">添加新项目</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h2>添加新项目</h2>
      </v-card-title>

      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field label="项目标题" v-model="title" prepend-icon="mdi-folder" :rules="inputRules"></v-text-field>
          <v-textarea
            no-resize
            label="详情"
            v-model="content"
            prepend-icon="mdi-pencil"
            :rules="inputRules"
          ></v-textarea>

          <v-menu
            max-width="290"
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="due"
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{on, attrs }">
              <v-text-field
                v-bind="attrs"
                v-on="on"
                label="截止日期"
                v-model="due"
                prepend-icon="mdi-calendar-range"
              ></v-text-field>
            </template>
            <v-date-picker v-model="due" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">取消</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(due)">确定</v-btn>
            </v-date-picker>
          </v-menu>

          <v-combobox
            v-model="tags"
            :items="items"
            :search-input.sync="search"
            hide-selected
            hint="最多3个标签"
            label="标签"
            multiple
            prepend-icon="mdi-bookmark"
            persistent-hint
            small-chips
          >
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                close
                @click="select"
                @click:close="remove(item)"
              >{{ item }}</v-chip>
            </template>
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    没有"
                    <strong>{{ search }}</strong>"的标签. 按
                    <kbd>enter</kbd> 来创建一个
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-combobox>
          <v-btn block color="primary" class="mt-3 mx-0" @click="submit" :loading="loading">添加项目</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import * as Utils from "../utils/utils";

export default {
  data() {
    return {
      dialog: false,
      title: "",
      content: "",
      due: "",
      items: ["计划", "工作", "娱乐", "生活"],
      status: "",
      tags: [],
      inputRules: [(v) => v.length >= 3 || "至少三个字符"],
      menu: false,
      loading: false,
      search: null,
    };
  },
  computed: {},
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.add_item();
        this.dialog = false;
        this.loading = false;
        this.$emit("itemAdded");
      } else {
        alert("请检查输入");
      }
    },
    add_item() {
      const item = {
        title: this.title,
        content: this.content,
        due: this.due || "无",
        status: "ongoing",
        tags: this.tags,
      };
      var tempList = Utils.getItem("todoList");
      if (tempList) {
        tempList.push(item);
        Utils.setItem("todoList", tempList);
      } else {
        var tempList = [];
        tempList.push(item);
        Utils.setItem("todoList", tempList);
      }
    },
    remove(item) {
      this.tags.splice(this.tags.indexOf(item), 1);
      this.tags = [...this.tags];
    },
  },
  watch: {
    tags(val) {
      if (val.length > 3) {
        this.$nextTick(() => this.tags.pop());
      }
    },
  },
};
</script>

<style>
</style>