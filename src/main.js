// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VeeValidate, { Validator } from "vee-validate";
import pt_BR from "vee-validate/dist/locale/pt_BR";
import filters from "./filters/filter";
import App from "./App";
import router from "./router";
import "vuetify/dist/vuetify.min.css";

Vue.config.productionTip = false;

Validator.localize("pt_BR", pt_BR);
Vue.use(VeeValidate);
filters.create(Vue);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
