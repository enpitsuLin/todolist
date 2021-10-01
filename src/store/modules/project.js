import * as Utils from "../../utils/utils";

const projects = {
	state: {
		projects: Utils.getItem("projects")
	},
	getters: {
		getProjects: state => state.projects
	},
	// mutations 按照标准应该是异步方法
	mutations: {
		/**
		 * 添加项目
		 */
		ADD_PROJECT(state, project) {
			var num = "";
			for (var i = 0; i < 16; i++) {
				num += Math.floor(Math.random() * 16).toString(16);
			}
			project.id = num.toLowerCase();
			state.projects.push(project);
			Utils.setItem("projects", state.projects);
		},
		/**
		 * 修改项目
		 */
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
		/**
		 * 删除项目
		 */
		REMOVE_PROJECT(state, id) {
			state.projects = state.projects.filter(project => project.id != id);
			Utils.setItem("projects", state.projects);
		},
		/**
		 * 添加项目步骤
		 */
		ADD_PROJECT_ITEM(state, { id, item }) {
			var projects = state.projects.concat();
			projects.forEach(project => {
				if (id && project && id === project.id) {
					project.items.push(item);
				}
			});
			state.projects = projects;
			Utils.setItem("projects", state.projects);
		}
	},
	actions: {
		addProject({ commit }, project) {
			commit("ADD_PROJECT", project);
		},
		removeProject({ commit }, id) {
			commit("REMOVE_PROJECT", id);
		},
		modifyProject({ commit }, project) {
			commit("MODIFY_PROJECT", project);
		},
		addProjectItem({ commit }, { id, item }) {
			commit("ADD_PROJECT_ITEM", { id, item });
		}
	}
};

export default projects;
