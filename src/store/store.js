import Vue from "vue";
import Vuex from "vuex";
import projects from "./modules/project";
import todoList from "./modules/todo";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	getters: {},
	mutations: {},
	actions: {},
	modules: {
		projects,
		todoList
	}
});
