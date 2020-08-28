<template>
  <div>
    <v-dialog max-width="580px" v-model="dialog">
      <template v-slot:activator="{ on }">
        <v-speed-dial bottom right direction="top" absolute>
          <template v-slot:activator>
            <v-btn color="blue darken-2" v-on="on" dark fab>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
        </v-speed-dial>
      </template>
      <v-card>
        <v-card-title>
          <h2>{{editing?'修改':'添加事项'}}</h2>
        </v-card-title>

        <v-card-text>
          <v-form class="px-3" ref="form">
            <v-text-field
              label="事项标题"
              v-model="item.title"
              prepend-icon="mdi-folder"
              :rules="inputRules"
            ></v-text-field>
            <v-textarea
              no-resize
              hide-details="auto"
              label="详情"
              v-model="item.content"
              prepend-icon="mdi-pencil"
              :rules="inputRules"
            ></v-textarea>

            <v-menu
              max-width="290"
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="item.due"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{on, attrs }">
                <v-text-field
                  v-bind="attrs"
                  v-on="on"
                  label="截止日期"
                  v-model="item.due"
                  prepend-icon="mdi-calendar-range"
                ></v-text-field>
              </template>
              <v-date-picker v-model="item.due" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">取消</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(item.due)">确定</v-btn>
              </v-date-picker>
            </v-menu>

            <v-combobox
              v-model="item.tags"
              :items="tagItems"
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
            <v-col>
              <v-btn
                color="primary"
                class="mt-3"
                @click="submit"
                :loading="loading"
              >{{editing?'修改':'添加事项'}}</v-btn>
            </v-col>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: { title: "", content: "", due: "", status: "", tags: [] },
      dialog: false,
      tagItems: ["计划", "工作", "娱乐", "生活"],
      inputRules: [
        (value) => !!value || "必填",
        (value) => (value && value.length >= 2) || "至少两个字符",
      ],
      menu: false,
      loading: false,
      editing: false,
      search: null,
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        if (this.editing) {
          this.modifyItem();
        } else {
          this.addItem();
        }
      } else {
        alert("请检查输入");
      }
    },
    modifyItem() {
      const item = {
        title: this.item.title,
        content: this.item.content,
        due: this.item.due,
        status: this.item.status,
        tags: this.item.tags,
        id: this.item.id,
      };
      this.$store.dispatch("modifyTodo", item).then((res) => {
        this.dialog = false;
        this.loading = false;
        this.editing = false;
        this.$emit("itemAdded");
        this.$refs.form.reset();
      });
    },
    addItem() {
      const item = {
        title: this.item.title,
        content: this.item.content,
        due: this.item.due,
        status: this.item.status || "ongoing",
        tags: this.item.tags,
      };
      this.$store.dispatch("addTodo", item).then((res) => {
        this.dialog = false;
        this.loading = false;
        this.$emit("itemAdded");
        this.$refs.form.reset();
      });
    },
    remove(tag) {
      this.item.tags.splice(this.item.tags.indexOf(tag), 1);
      this.item.tags = [...this.item.tags];
    },
    setEdit(item) {
      this.item = item;
      this.editing = true;
      this.dialog = true;
    },
  },

  watch: {
    "item.tags"(val) {
      if (val && val.length > 3) {
        this.$nextTick(() => this.item.tags.pop());
      }
    },
  },
};
</script>

<style>
</style>