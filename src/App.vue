<template>
  <v-app id="app">
    <nav-bar/>
    <my-menu/>
    <my-body>
      <router-view></router-view>
    </my-body>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import MyMenu from "@/components/Menu";
import MyBody from "@/components/Body";
import MyList from "@/pages/ListaPacientes";

export default {
  components: {
    NavBar,
    MyMenu,
    MyBody,
    MyList
  },
  name: "App"
};
</script>

<style>
</style>
