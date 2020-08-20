<template>
  <div>
    <header>
      <section>
        <label for="title">Todo List</label>
        <input type="text" v-model="todo" @keyup.enter="add_item" placeholder="添加事件" />
      </section>
    </header>
    <section>
      <h2>
        正在进行
        <span>{{todoLen}}</span>
      </h2>
      <ul class="todo-list">
        <li v-for="(item,i) in undoneItem" :key="i" :class="{completed:todo.completed}">
          <div class="todo-item">
            <input type="checkbox" @change="change_item(item,true)" />
            <p>{{item.title}}</p>
            <button @click="delete_item(item,true)" class="destroy"></button>
          </div>
        </li>
      </ul>
      <h2>
        已经完成
        <span>{{todoList.length - todoLen}}</span>
      </h2>
      <ul>
        <li v-for="(item, i) in doneItem " draggable :key="i">
          <input type="checkbox" @change="change_item(item,false)" checked="checked" />
          <p>{{item.title}}</p>
          <button @click="delete_item(item,false)" class="destroy"></button>
        </li>
      </ul>
    </section>
    <!-- <footer>
      Copyright &copy; 2020
      <a>clear</a>
    </footer> -->
  </div>
</template>

<script>
//import "./assets/styles/style.css";
import * as Utils from "./utils/utils";
import todoItem from "./components/TodoItem.vue";

export default {
  name: "App",
  components: { todoItem },
  data() {
    return {
      todo: "",
      todoList: [],
      todoLen: 0,
    };
  },
  methods: {
    init_todo_list() {
      var todoListData = Utils.getItem("todoList");
      if (todoListData) {
        for (let i = 0, len = todoListData.length; i < len; i++) {
          if (todoListData[i].completed === false) this.todoLen++;
        }
        this.todoList = todoListData;
      }
    },
    add_item() {
      if (this.todo == "") return;
      let item = {
        title: this.todo,
        completed: false,
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
      this.todoList.push(item);
      this.todoLen++;
      this.todo = "";
    },
    change_item(item, state) {
      console.log(item, this.todoList.indexOf(item));
      var index = this.todoList.indexOf(item);
      if (index == -1) return;
      this.todoList[index].completed = state;
      this.todoLen += state ? -1 : 1;
      Utils.setItem("todoList", this.todoList);
    },
    delete_item(item, state) {
      var index = this.todoList.indexOf(item);
      if (index == -1) return;
      if (state) this.todoLen--;
      this.todoList.splice(index, 1);
      Utils.setItem("todoList", this.todoList);
    },
  },
  computed: {
    doneItem() {
      return this.todoList.filter(function (item) {
        return item.completed;
      });
    },
    undoneItem() {
      return this.todoList.filter(function (item) {
        return item.completed == false;
      });
    },
  },
  mounted() {
    this.init_todo_list();
  },
};
</script>

<style>
</style>