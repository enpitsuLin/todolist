<template>
  <div class="todo">
    <h1 class="text-subtitle-1 grey--text">Todolist</h1>
    <v-container class="my-10 pa-6">
      <!-- 排序 -->
      <v-row class="mb-4 mx-2">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn small text color="grey" @click="sortBy('title')" v-bind="attrs" v-on="on">
              <v-icon left small>mdi-folder</v-icon>全部
            </v-btn>
          </template>
          <span>全部的待办事项</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn small text color="grey" @click="sortBy('title')" v-bind="attrs" v-on="on">
              <v-icon left small>mdi-check-all</v-icon>已完成
            </v-btn>
          </template>
          <span>已完成的待办事项</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn small text color="grey" @click="sortBy('person')" v-bind="attrs" v-on="on">
              <v-icon left small>mdi-close</v-icon>未完成
            </v-btn>
          </template>
          <span>未完成的待办事项</span>
        </v-tooltip>
      </v-row>
      <!-- 数据 -->
      <v-card flat v-for="item in todoList" :key="item.title">
        <v-row no-gutters wrap :class="`${item.status} pa-3 item`">
          <v-col cols="2">
            <div class="text-caption grey--text">事项名称</div>
            <div>{{ item.title }}</div>
          </v-col>
          <v-col cols="6">
            <div class="text-caption grey--text">详情</div>
            <div
              class="d-inline-block text-truncate"
              style="max-width: 300px;"
            >{{ item.content }}</div>
          </v-col>
          <v-col cols="2">
            <div class="text-caption grey--text">截止日期</div>
            <div>{{ item.due }}</div>
          </v-col>
          <v-col cols="2">
            <div class="text-caption grey--text">标签</div>
            <div>
              <v-chip x-small v-for="(tag,i) in item.tags" :key="i">{{tag}}</v-chip>
            </div>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-card>
    </v-container>

    <!-- 浮动按钮 -->
    <v-speed-dial v-model="fab" bottom right direction="top" absolute>
      <template v-slot:activator>
        <v-btn v-model="fab" color="blue darken-2" dark fab>
          <v-icon v-if="fab">mdi-check</v-icon>
          <v-icon v-else>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="green" @click="dialog = !dialog">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn fab dark small color="indigo">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn fab dark small color="red">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>
  </div>
</template>

<script>
import * as Utils from "../utils/utils";

export default {
  data() {
    return {
      todoList: [],
      fab: false,
    };
  },
  methods: {
    init_todo_list() {
      var todoListData = Utils.getItem("todoList");
      if (todoListData) {
        this.todoList = todoListData;
      }
    },
    sortBy(prop) {
      this.todoList.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
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
  background: #3cd1c2;
}
.v-chip.ongoing {
  background: #ffaa2c;
}
.v-chip.overdue {
  background: #f83e70;
}
</style>