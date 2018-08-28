import Vue from "vue";
import Router from "vue-router";
import Vuetify from "vuetify";
import Formulario from "@/pages/Formulario";
import Vuelidate from "vuelidate";
import Dashboard from "@/pages/Dashboard";
import ListaPacientes from "@/pages/ListaPacientes";
import ImageLoader from "@/pages/ImageLoader";
import ReferenceLines from "@/pages/ReferenceLines";

Vue.use(Vuelidate);
Vue.use(Vuetify);
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/cadastro",
      name: "Cadastro",
      component: Formulario
    },

    {
      path: "/cadastro/:id",
      name: "Info Paciente",
      component: Formulario,
      props: true
    },

    {
      path: "/",
      name: "Dashboard",
      component: Dashboard
    },

    {
      path: "/pacientes",
      name: "Pacientes",
      component: ListaPacientes
    },

    {
      path: "/visualizador",
      name: "Visualizador",
      component: ImageLoader
    },

    {
      path: "/visualizador/paciente/:id",
      name: "Exame",
      component: ImageLoader,
      props: true
    },

    {
      path: "/reference",
      name: "Reference Tool",
      component: ReferenceLines
    }
  ]
});
