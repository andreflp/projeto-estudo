<template>
  <v-container>
    <form ref="form" @submit.prevent="submit">
      <v-text-field
        label="Nome"
        v-model="paciente.nome"
        data-vv-name="name"
        :error-messages="errors.collect('name')"
        v-validate="'required|max:20'"
      />

      <v-text-field
        label="E-mail"
        v-model="paciente.email"
        data-vv-name="email"
        :error-messages="errors.collect('email')"
        v-validate="'required|email'"
      />

      <v-select
        label="Gênero"
        v-model="paciente.genero"
        :items="items"
        data-vv-name="genero"
        :error-messages="errors.collect('genero')"
        v-validate="'required'"
      />

      <v-text-field
        label="CPF"
        v-model="paciente.cpf"
        :mask="masks.cpf"
        data-vv-name="cpf"
        :error-messages="errors.collect('cpf')"
        v-validate="'required'"
      />

      <v-text-field
        label="Data de Nascimento"
        v-model="paciente.date"
        :mask="masks.date"
        data-vv-name="dataNascimento"
        :error-messages="errors.collect('dataNascimento')"
        v-validate="'required'"
      />
      
      <v-text-field
        label="Telefone"
        v-model="paciente.telefone"
        :mask="masks.telefone"
        data-vv-name="telefone"
        :error-messages="errors.collect('telefone')"
        v-validate="'required'"
      />
  
      <v-btn type="submit">Enviar</v-btn>
      <v-btn @click="clear">Limpar</v-btn>
    </form>
  </v-container>
</template>

<script>
import masks from "@/utils/masks/masks";

export default {
  $_veeValidate: {
    validator: "new"
  },
  props: {
    id: {
      type: [Number, String]
    }
  },

  name: "formulario",

  data() {
    return {
      paciente: {
        nome: "",
        email: "",
        cpf: "",
        genero: null,
        telefone: "",
        date: null
      },

      items: ["Masculino", "Feminino"],
      valid: true,
      masks
    };
  },

  mounted() {
    console.log(this.id);
  },

  methods: {
    submit() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          let jsonPacientes = JSON.parse(
            window.localStorage.getItem("pacientes")
          );
          jsonPacientes.data.push(this.paciente);

          window.localStorage.setItem(
            "pacientes",
            JSON.stringify(jsonPacientes)
          );

          this.$router.push("Pacientes");
        }
      });
    },

    clear() {
      this.$refs.form.reset();
      this.$validator.reset();
    }
  }
};
</script>
