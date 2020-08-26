import Vue from 'vue';
import router from 'vue-router';
import Todo from "./views/Todo.vue";
import Projects from './views/Projects.vue';
import About from './views/About.vue'

Vue.use(router);
export default new router({
    routes: [
        {
            path: '*',
            redirect: '/'
        },
        {
            path: '/',
            name: 'todo',
            component: Todo,
        },
        {
            path: '/projects',
            name: 'projects',
            component: Projects,
        },
        {
            path: '/about',
            name: 'about',
            component: About,
        }
    ]
});