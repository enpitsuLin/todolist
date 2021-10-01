import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify"; // path to vuetify export
import router from "./router/index";
import store from "./store/store";

Vue.config.productionTip = false;

new Vue({
	render: h => h(App),
	vuetify,
	router,
	store
}).$mount("#app");
