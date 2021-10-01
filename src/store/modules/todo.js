import * as Utils from "../../utils/utils";

const todoList = {
	state: {
		todoList: Utils.getItem("todoList")
	},
	getters: {
		getTodoList: state => state.todoList
	},
	// mutations 按照标准应该是异步方法
	mutations: {
		/**
		 * 添加待办事项
		 */
		ADD_ITEM(state, item) {
			var num = "";
			for (var i = 0; i < 16; i++) {
				num += Math.floor(Math.random() * 16).toString(16);
			}
			item.id = num.toLowerCase();
			state.todoList.push(item);
			Utils.setItem("todoList", state.todoList);
		},
		/**
		 * 修改待办事项
		 */
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
		/**
		 * 删除待办事项
		 */
		REMOVE_ITEM(state, id) {
			state.todoList = state.todoList.filter(todo => todo.id != id);
			Utils.setItem("todoList", state.todoList);
		},
		/**
		 * 完成待办事项
		 */
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
		addTodo({ commit }, item) {
			commit("ADD_ITEM", item);
		},
		removeTodo({ commit }, id) {
			commit("REMOVE_ITEM", id);
		},
		modifyTodo({ commit }, item) {
			commit("MODIFY_ITEM", item);
		},
		completedTodo({ commit }, id) {
			commit("COMPLETED_ITEM", id);
		}
	}
};

export default todoList;
