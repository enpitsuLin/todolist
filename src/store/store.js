import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todoList: localStorage["todoList"] ? JSON.parse(localStorage["todoList"]) : [],
  },
  getters: {
    getTodoList: state => {
      return state.todoList
    }
  },
  mutations: {
    ADD_ITEM(state, item) {
      state.todoList.push(item)
    },
    REMOVE_ITEM(state, item) {
      var index = state.todoList.indexOf(item);
      if (index != -1) {
        state.todoList.splice(index, 1)
      }
    }
  },
  actions: {
    addTodo({ commit }, item) { commit('ADD_ITEM', item) },
    removeTodo({ commit }, item) { commit('REMOVE_ITEM', item) },
  },
});
