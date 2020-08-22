import Vue from 'vue';
import App from './App.vue';
import { store } from './plugins/store';
import Vuetify from 'vuetify';

import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false;

Vue.use(Vuetify);

const opts = {
	icons: { iconfont: 'mdi' }
};

const vuetify = new Vuetify(opts);

new Vue({
	el: '#app',
	store,
	vuetify: vuetify,
	components: { App },
	template: '<App/>'
});
