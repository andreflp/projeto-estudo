<template>
  <v-app>
    <v-data-table
    :headers="headers"
    :items="pacientes"
    :pagination.sync="pagination"
    select-all
    item-key="name"
    class="elevation-1"
  >
    <template slot="headers" slot-scope="props">
      <tr>
        <th
          v-for="header in props.headers"
          :key="header.text"
          :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
          @click="changeSort(header.value)"
        >
          <v-icon small>arrow_upward</v-icon>
          {{ header.text }}
        </th>
      </tr>
    </template>
    <template slot="items" slot-scope="props">
      <tr>
        <td class="text-xs-center">{{ props.item.nome }}</td>
        <td class="text-xs-center">{{ props.item.email }}</td>
        <td class="text-xs-center">{{ props.item.genero }}</td>
        <td class="text-xs-center">{{ props.item.cpf | cpf }}</td>
        <td class="text-xs-center">{{ props.item.date | date}}</td>
        <td class="text-xs-center">{{ props.item.telefone | phone}}</td>

        <td class="text-xs-center">
          <v-btn flat icon color="primary" :to="`visualizador/paciente/${props.item.id}`">
            <v-icon>crop_original</v-icon>
          </v-btn>
        </td>

        <td class="text-xs-center">
          <v-btn flat icon color="primary" :to="`cadastro/${props.item.id}`">
            <v-icon>edit</v-icon>
          </v-btn>
        </td>

        <td class="text-xs-center">
          <v-btn flat icon color="red" @click="removerAlunos(props.index)">
            <v-icon>delete_outline</v-icon>
          </v-btn>
        </td>
      </tr>
    </template>
  </v-data-table>
  </v-app>
</template>

<script>
import jsonPacientes from "@/data/pacientes.json";

export default {
  data: () => ({
    pagination: {
      sortBy: "name"
    },
    headers: [
      {
        text: "Paciente",
        align: "center",
        value: "nome"
      },
      { text: "E-mail", value: "email" },
      { text: "Gênero ", value: "genero" },
      { text: "CPF ", value: "cpf" },
      { text: "Data de Nascimento ", value: "date" },
      { text: "Telefone ", value: "telefone" },
      { text: "Exame" },
      { text: "Editar" },
      { text: "Excluir" }
    ],
    pacientes: []
  }),

  mounted() {
    let jsonPacientesString = window.localStorage.getItem("pacientes");
    if (jsonPacientesString && jsonPacientesString !== "null") {
      this.pacientes = JSON.parse(jsonPacientesString).data;
    } else {
      this.pacientes = jsonPacientes.data;
      window.localStorage.setItem("pacientes", JSON.stringify(jsonPacientes));
    }
  },

  methods: {
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.pacientes.slice();
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },

    removerAlunos(index) {
      this.pacientes.splice(index, 1);
      window.localStorage.setItem(
        "pacientes",
        JSON.stringify({ data: this.pacientes })
      );
    }
  }
};
</script>

<style>
</style>
