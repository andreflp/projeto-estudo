<template>
    <v-layout>
    <v-flex xs6 sm6>
      <v-card>
        <v-card-media
          class="white--text"
          height="190px"
          src="https://image.freepik.com/fotos-gratis/doutor-da-mulher-que-faz-o-aperto-de-mao-com-o-paciente-masculino-na-sala-do-escritorio-do-hospital_31965-697.jpg"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline"><h1></h1></span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-card-title>
          <div>
            <h3>PACIENTES</h3><br>
            <span>
              <h3>Quantidade de pacientes cadastrados: {{ quantidadePacientes }}</h3>
            </span>
            <span><h3><br></h3></span>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>  
  
    <v-flex xs6 sm6 style="margin-left: 20px;">
      <v-card>
        <v-card-media
          class="white--text"
          height="190px"
          src="https://image.freepik.com/fotos-gratis/doutor-da-mulher-que-faz-o-aperto-de-mao-com-o-paciente-masculino-na-sala-do-escritorio-do-hospital_31965-697.jpg"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline"></span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-card-title>
          <div>
            <h3>QUANTIDADE DE CADA GÊNERO</h3><br>
            <span><h3>Pacientes do gênero masculino: {{ pacientesMasc }}</h3></span>
            <span><h3>Pacientes do gênero feminino: {{ pacientesFem }}</h3></span>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>  
  </v-layout>
</template>

<script>
export default {
  name: "dashboard",
  data() {
    return {
      pacientes: [],
      quantidadePacientes: "",
      pacientesMasc: 0,
      pacientesFem: 0
    };
  },

  mounted() {
    var lista = (this.pacientes = JSON.parse(
      window.localStorage.getItem("pacientes")
    ).data);
    this.getQtdAlunos();
    this.separarPacientesGenero();
  },

  methods: {
    getQtdAlunos() {
      this.quantidadePacientes = JSON.stringify(this.pacientes.length);
    },

    separarPacientesGenero() {
      var vm = this;
      var masc = 0;
      var fem = 0;
      this.pacientes.forEach(paciente => {
        if (paciente.genero === "Masculino") {
          masc++;
        }
        if (paciente.genero === "Feminino") {
          fem++;
        }
      });
      vm.pacientesMasc = masc;
      vm.pacientesFem = fem;
    }
  }
};
</script>
