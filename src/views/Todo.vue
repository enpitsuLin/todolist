<template>
  <div class="todo">
    <!-- 提示 -->
    <Snackbar ref="snackbar" @handleUndo="recovery_item()" />
    <!-- 主体 -->
    <h1 class="text-subtitle-1 grey--text">Todolist</h1>
    <v-container class="my-2 pa-1 my-md-8 pa-md-6">
      <!-- 排序 -->
      <v-row class="mb-4 mx-2">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              small
              text
              color="grey"
              @click="sort_by('');sort_tag('')"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon left small>mdi-folder</v-icon>全部
            </v-btn>
          </template>
          <span>全部的待办事项</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              small
              text
              color="grey"
              @click="sort_by('complete');sort_tag('')"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon left small>mdi-check-all</v-icon>已完成
            </v-btn>
          </template>
          <span>已完成的待办事项</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              small
              text
              color="grey"
              @click="sort_by('ongoing');sort_tag('')"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon left small>mdi-close</v-icon>未完成
            </v-btn>
          </template>
          <span>未完成的待办事项</span>
        </v-tooltip>
      </v-row>
      <!-- 数据 -->
      <v-hover v-slot:default="{ hover }" v-for="(item,index) in sortedItemList" :key="item.id">
        <v-card @click="expand_handle(index)" :ripple="false" flat>
          <v-row no-gutters :class="`${item.status} pa-3 item`">
            <v-col cols="4" sm="3" md="2">
              <div class="text-caption grey--text">事项名称</div>
              <div>{{ item.title }}</div>
            </v-col>
            <v-col md="5" class="d-none d-md-block">
              <div class="text-caption grey--text">详情</div>
              <div class="d-inline-block text-truncate" style="max-width: 300px;">{{ item.content }}</div>
            </v-col>
            <v-col cols="3" sm="3" md="2">
              <div class="text-caption grey--text">截止日期</div>
              <div>{{ item.due }}</div>
            </v-col>
            <v-col cols="5" sm="4" md="2">
              <div class="text-caption grey--text">标签</div>
              <div>
                <v-chip x-small v-if="item.tags&&item.tags.length==0" @click.stop="sort_tag('')">
                  <span>无</span>
                </v-chip>
                <v-chip
                  x-small
                  v-else
                  v-for="(tag,i) in item.tags"
                  :key="i"
                  @click.stop="sort_tag(tag)"
                >
                  <span>{{tag}}</span>
                </v-chip>
              </div>
            </v-col>
            <v-spacer class="d-none d-sm-flex"></v-spacer>
            <v-col align-self="center">
              <v-btn icon v-if="hover" class="mt-1 d-none d-sm-block">
                <v-icon>{{ expand.indexOf(index)!=-1 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-expand-transition>
            <div v-show="expand.indexOf(index)!=-1">
              <v-row no-gutters>
                <v-col cols="7" md="3" offset-md="1" sm="3" offset-sm="1">
                  <v-card-text class="pt-2 pb-1 caption">
                    <span class="pr-3">状态:</span>
                    <v-chip
                      small
                      :class="`${item.status} white--text caption`"
                    >{{item.status!='complete'? '进行中':'已完成'}}</v-chip>
                  </v-card-text>
                </v-col>

                <v-spacer></v-spacer>

                <div class="px-2">
                  <v-btn
                    dense
                    text
                    v-show="item.status!='complete'"
                    @click.stop="completeDialog = true;selectItem=item"
                  >
                    <v-icon>mdi-check</v-icon>
                    <span class="d-none d-sm-flex">完成</span>
                  </v-btn>
                  <v-btn dense text @click.stop="edit_item(item)">
                    <v-icon>mdi-pencil</v-icon>
                    <span class="d-none d-sm-flex">修改</span>
                  </v-btn>
                  <v-btn dense text color="red" @click.stop="remove_item(item);">
                    <v-icon>mdi-delete</v-icon>
                    <span class="d-none d-sm-flex">删除</span>
                  </v-btn>
                </div>
              </v-row>
            </div>
          </v-expand-transition>
        </v-card>
      </v-hover>
    </v-container>
    <!-- 对话框(提示完成) -->
    <v-dialog v-model="completeDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">确定完成?</v-card-title>
        <v-card-text>确定已经完成该事项,将该事项状态更改为已完成?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="completeDialog = false">取消</v-btn>
          <v-btn color="green darken-1" text @click="complete_item()">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 项目对话框 -->
    <ItemEditor
      @itemAdded="show_success('add')"
      @itemModifyed="show_success('modify')"
      ref="editor"
    />
  </div>
</template>

<script>
import * as Utils from "../utils/utils";
import { mapGetters } from "vuex";
import ItemEditor from "../components/ItemEditor.vue";
import Snackbar from "../components/Snackbar.vue";

export default {
  data() {
    return {
      filter: "",
      filterTag: "",
      expand: [],
      todoList: [],
      completeDialog: false,
      selectItem: {},
      recoveryItem: {},
    };
  },
  components: {
    ItemEditor,
    Snackbar,
  },
  methods: {
    init_todo_list() {
      var todoListData = Utils.getItem("todoList");
      if (todoListData) {
        this.todoList = todoListData;
      }
    },
    sort_by(filter) {
      this.filter = filter;
    },
    sort_tag(tag) {
      this.filterTag = tag;
      console.log(tag);
    },
    expand_handle(index) {
      var si = this.expand.indexOf(index);
      if (si != -1) {
        this.expand.splice(si, 1);
      } else {
        this.expand.push(index);
      }
    },
    edit_item(item) {
      this.$refs.editor.setEdit(JSON.parse(JSON.stringify(item)));
    },
    remove_item(item) {
      this.recoveryItem = item;
      this.show_delete(item);
      this.$store.dispatch("removeTodo", item.id);
    },
    complete_item() {
      const item = this.selectItem;
      this.$store.dispatch("completedTodo", item.id);
      this.completeDialog = false;
    },
    recovery_item() {
      this.$store.dispatch("addTodo", this.recoveryItem);
    },
    show_success(type) {
      let msg =
        type === "add" ? "漂亮！你成功添加了一个新项目" : "OK!修改成功!";
      this.$refs.snackbar.show(msg);
    },
    show_delete(item) {
      let msg = `你删除了项目:${item.title}`;
      this.$refs.snackbar.showError(msg);
    },
  },
  computed: {
    ...mapGetters(["getTodoList"]),
    sortedItemList() {
      return this.todoList.filter((item, index) => {
        return (
          (this.filter == "" && this.filterTag == "") ||
          (this.filter != "" && item.status == this.filter) ||
          (this.filterTag != "" && item.tags.includes(this.filterTag))
        );
      });
    },
  },
  watch: {
    getTodoList: {
      handler: function (li) {
        let vm = this;
        this.todoList = li;
        this.expand = [];
      },
      deep: true,
    },
    sortedItemList: function (val) {
      this.expand = [];
    },
  },
  mounted() {
    this.init_todo_list();
  },
};
</script>


<style>
.item.complete {
  border-left: 4px solid #3cd1c2;
}
.item.ongoing {
  border-left: 4px solid orange;
}
.item.overdue {
  border-left: 4px solid tomato;
}
.v-chip.complete {
  background: #3cd1c2 !important;
}
.v-chip.ongoing {
  background: #ffaa2c !important;
}
.v-chip.overdue {
  background: #f83e70 !important;
}
</style>