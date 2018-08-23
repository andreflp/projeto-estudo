<template>
  <v-navigation-drawer app :permanent="drawer" >
    <v-toolbar flat color="blue darken-1" dark>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
          Projeto Teste
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-divider></v-divider>

    <v-list dense class="pt-0">
      <v-list-tile
        v-for="item in items"
        :key="item.title"
        :to="item.route"
    >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "my-menu",

  data() {
    return {
      items: [
        { title: "Dashboard", icon: "dashboard", route: "/" },
        { title: "Pacientes", icon: "people", route: "/pacientes" },
        { title: "Visualizador", icon: "insert_photo", route: "/visualizador" }
      ],
      mini: true,
      drawer: false
    };
  },

  created() {
    this.$root.$on("updateDrawer", () => {
      this.drawer = !this.drawer;
    });
  },

  methods: {}
};
</script>
