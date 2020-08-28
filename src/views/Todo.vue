<template>
  <div class="todo">
    <!-- 提示 -->
    <Snackbar ref="snackbar" @handleUndo="recovery_item()" />
    <!-- 主体 -->
    <h1 class="text-subtitle-1 grey--text">Todolist</h1>
    <v-container class="my-10 pa-6">
      <!-- 排序 -->
      <v-row class="mb-4 mx-2">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn small text color="grey" @click="sort_by('')" v-bind="attrs" v-on="on">
              <v-icon left small>mdi-folder</v-icon>全部
            </v-btn>
          </template>
          <span>全部的待办事项</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn small text color="grey" @click="sort_by('complete')" v-bind="attrs" v-on="on">
              <v-icon left small>mdi-check-all</v-icon>已完成
            </v-btn>
          </template>
          <span>已完成的待办事项</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn small text color="grey" @click="sort_by('ongoing')" v-bind="attrs" v-on="on">
              <v-icon left small>mdi-close</v-icon>未完成
            </v-btn>
          </template>
          <span>未完成的待办事项</span>
        </v-tooltip>
      </v-row>
      <!-- 数据 -->
      <v-hover v-slot:default="{ hover }" v-for="(item,index) in sortedItemList" :key="item.id">
        <v-card flat>
          <v-row no-gutters :class="`${item.status} pa-3 item`">
            <v-col cols="1" sm="3" md="2">
              <div class="text-caption grey--text">事项名称</div>
              <div>{{ item.title }}</div>
            </v-col>
            <v-col cols="5" class="d-none d-md-block">
              <div class="text-caption grey--text">详情</div>
              <div class="d-inline-block text-truncate" style="max-width: 300px;">{{ item.content }}</div>
            </v-col>
            <v-col cols="2" sm="3" md="2">
              <div class="text-caption grey--text">截止日期</div>
              <div>{{ item.due }}</div>
            </v-col>
            <v-col cols="2" sm="4" md="2">
              <div class="text-caption grey--text">标签</div>
              <div>
                <v-chip x-small v-for="(tag,i) in item.tags" :key="i">{{tag}}</v-chip>
              </div>
            </v-col>
            <v-spacer></v-spacer>
            <v-btn icon @click="expand_handle(index)" v-if="hover" class="mt-1">
              <v-icon>{{ expand.indexOf(index)!=-1 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-row>
          <v-divider></v-divider>
          <v-expand-transition>
            <div v-show="expand.indexOf(index)!=-1">
              <v-row no-gutters>
                <v-col offset="1">
                  <v-card-text class="pt-2 pb-1 caption">状态:</v-card-text>
                </v-col>
                <v-col offset="-1">
                  <v-chip
                    small
                    :class="`${item.status} white--text caption mx-3 mt-1`"
                  >{{item.status!='complete'? '进行中':'已完成'}}</v-chip>
                </v-col>
                <v-spacer></v-spacer>
                <v-btn-toggle dense borderless class="px-2">
                  <v-btn
                    text
                    v-show="item.status!='complete'"
                    @click.stop="completeDialog = true;selectItem=item"
                  >
                    <v-icon>mdi-check</v-icon>完成
                  </v-btn>
                  <v-btn text @click.stop="edit_item(item)">
                    <v-icon>mdi-pencil</v-icon>修改
                  </v-btn>
                  <v-btn text color="red" @click.stop="remove_item(item);">
                    <v-icon>mdi-delete</v-icon>删除
                  </v-btn>
                </v-btn-toggle>
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

    <!-- 浮动按钮 -->
    <ProjectEditor
      @itemAdded="showSuccess('add')"
      @itemModifyed="showSuccess('modify')"
      ref="editor"
    />
  </div>
</template>

<script>
import * as Utils from "../utils/utils";
import { mapGetters } from "vuex";
import ProjectEditor from "../components/ProjectEditor.vue";
import Snackbar from "../components/Snackbar.vue";

export default {
  data() {
    return {
      filter: "",
      expand: [],
      todoList: [],
      completeDialog: false,
      selectItem: {},
      recoveryItem: {},
    };
  },
  components: {
    ProjectEditor,
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
      this.showDelete(item);
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
    showSuccess(type) {
      let msg =
        type === "add" ? "漂亮！你成功添加了一个新项目" : "OK!修改成功!";
      this.$refs.snackbar.show(msg);
    },
    showDelete(item) {
      let msg = `你删除了项目:${item.title}`;
      this.$refs.snackbar.showError(msg);
    },
  },
  computed: {
    ...mapGetters(["getTodoList"]),
    sortedItemList() {
      return this.todoList.filter((item) => {
        return (
          (this.filter != "") & (item.status == this.filter) ||
          this.filter == ""
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