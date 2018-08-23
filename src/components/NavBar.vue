<template>
  <v-toolbar app color="primary" dark>
    <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title>{{$route.name}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
    </v-toolbar-items>
    <v-tooltip left v-if="$route.name === 'Pacientes'">
      <v-btn
        :to="'/cadastro'"
        icon
        slot="activator"
        color="primary"
        dark
      >
        <v-icon>person_add</v-icon>
      </v-btn>
      <span>Novo Paciente</span>
    </v-tooltip>
  </v-toolbar>
</template>

<script>
export default {
  name: "navbar",

  watch: {
    drawer(val) {
      this.$root.$emit("updateDrawer");
    }
  },

  data() {
    return {
      drawer: false
    };
  }
};
</script>

<style>
</style>
