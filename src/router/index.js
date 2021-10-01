import Vue from "vue";
import router from "vue-router";
import Layout from "@/layouts/index.vue";

Vue.use(router);
export default new router({
	routes: [
		{
			path: "*",
			redirect: "/"
		},
		{
			path: "/",
			name: "todo",
			component: Layout,
			children: [
				{
					path: "/todo",
					name: "projects",
					component: () => import("../views/Todo.vue")
				},
				{
					path: "/projects",
					name: "projects",
					component: () => import("../views/Projects.vue")
				},
				{
					path: "/about",
					name: "about",
					component: () => import("../views/About.vue")
				}
			]
		}
	]
});
