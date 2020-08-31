import Vue from 'vue';
import Vuex from 'vuex';
import * as Utils from "../utils/utils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todoList: Utils.getItem("todoList"),
    projects: Utils.getItem("projects"),
  },
  getters: {
    getTodoList: state => {
      return state.todoList
    },
    getProjects: state => {
      return state.projects
    }
  },
  mutations: {
    /* TODO */
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
    },
    /* PROJECT */
    ADD_PROJECT(state, project) {
      var num = "";
      for (var i = 0; i < 16; i++) {
        num += Math.floor(Math.random() * 16).toString(16);
      }
      project.id = num.toLowerCase();
      state.projects.push(project);
      Utils.setItem("projects", state.projects);
    },
    MODIFY_PROJECT(state, project) {
      var list = state.projects.concat();
      list.forEach((item, i) => {
        if (item && project && item.id === project.id) {
          list[i] = project;
        }
      });
      state.projects = list;
      Utils.setItem("projects", state.projects);
    },
    REMOVE_PROJECT(state, id) {
      //取巧 且不会引起某些bug
      state.projects = state.projects.filter(project => project.id != id);
      Utils.setItem("projects", state.projects);
    },
    ADD_PROJECT_ITEM(state, { id, item }) {
      var projects = state.projects.concat();
      projects.forEach(project => {
        if (id && project && id === project.id) {

          project.items.push(item);
        }
      });
      state.projects = projects;
      Utils.setItem("projects", state.projects);
    },
  },
  actions: {
    addTodo({ commit }, item) { commit('ADD_ITEM', item) },
    removeTodo({ commit }, id) { commit('REMOVE_ITEM', id) },
    modifyTodo({ commit }, item) { commit('MODIFY_ITEM', item) },
    completedTodo({ commit }, id) { commit('COMPLETED_ITEM', id) },

    addProject({ commit }, project) { commit('ADD_PROJECT', project) },
    removeProject({ commit }, id) { commit('REMOVE_PROJECT', id) },
    modifyProject({ commit }, project) { commit('MODIFY_PROJECT', project) },
    addProjectItem({ commit }, { id, item }) { commit("ADD_PROJECT_ITEM", { id, item }) }
  },
});
