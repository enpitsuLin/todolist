import Vue from 'vue';
import Vuex from 'vuex';
import * as Utils from "../utils/utils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todoList: Utils.getItem("todoList"),
  },
  getters: {
    getTodoList: state => {
      return state.todoList
    }
  },
  mutations: {
    ADD_ITEM(state, item) {
      var num = "";
      for (var i = 0; i < 16; i++) {
        num += Math.floor(Math.random() * 16).toString(16);
      }
      item.id = num.toLowerCase();
      state.todoList.push(item);
      Utils.setItem("todoList", state.todoList);
    },
    MODIFY_ITEM(state, item) {
      var list = state.todoList.concat();
      list.forEach((todo, i) => {
        if (todo && item && todo.id === item.id) {
          list[i] = item;
        }
      });
      state.todoList = list;
      Utils.setItem("todoList", state.todoList);
    },
    REMOVE_ITEM(state, id) {
      //取巧 且不会引起某些bug
      state.todoList = state.todoList.filter(todo => todo.id != id);
      Utils.setItem("todoList", state.todoList);
    },
    COMPLETED_ITEM(state, id) {
      state.todoList.forEach((todo, i) => {
        if (todo && id && todo.id === id) {
          state.todoList[i].status = "complete";
        }
      });
      Utils.setItem("todoList", state.todoList);
    }
  },
  actions: {
    addTodo({ commit }, item) { commit('ADD_ITEM', item) },
    removeTodo({ commit }, item) { commit('REMOVE_ITEM', item) },
    modifyTodo({ commit }, item) { commit('MODIFY_ITEM', item) },
    completedTodo({ commit }, item) { commit('COMPLETED_ITEM', item) }
  },
});
