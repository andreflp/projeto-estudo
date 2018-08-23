<template>
  <v-app>
    <v-form>
      <v-text-field
        label="URL da imagem"
        required
        v-model="paciente.exame"
      > </v-text-field>
      
      <v-btn @click="getElement()" style="margin-bottom: 20px;" v-if="$route.name === 'Visualizador'">
        Visualizar
      </v-btn><br>
    </v-form>
      
    <v-container fluid class="pa-0" v-if="tools === true">
      <v-layout row wrap>
        <v-flex xs12 sm6 class="py-2">
          <h3 style="margin-bottom: 15px">Ferramentas</h3>
          <v-btn-toggle v-model="toggle_exclusive">
            <v-btn flat @click="wwwcTool()">
              <span>Wwwc</span>
              <v-icon>wb_sunny</v-icon>
            </v-btn>

            <v-btn flat @click="panTool()">
              <span>Pan</span>
              <v-icon>open_with</v-icon>
            </v-btn>

            <v-btn flat @click="zoomTool()">
              <span>Zoom</span>
              <v-icon>search</v-icon>
            </v-btn>

            <v-btn flat @click="lengthTool()">
              <span>Length</span>
              <v-icon>arrow_upward</v-icon>
            </v-btn>

            <v-btn flat @click="ellipticalRoi()">
              <span>Elliptical Roi</span>
              <v-icon>radio_button_unchecked</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-flex>
      </v-layout>
    </v-container>   

    <div class="canvas" ref="dicomImage" oncontextmenu="return false" unselectable="on" onselectstart="return false;" onmousedown="return false;"></div>  
  </v-app>
</template>

<script>
import * as cornerstone from "cornerstone-core";
import * as cornerstoneMath from "cornerstone-math";
import * as cornerstoneWebImageLoader from "cornerstone-web-image-loader";
import * as cornerstoneTools from "cornerstone-tools";

export default {
  name: "image-loader",

  props: {
    id: {
      type: [Number, String]
    }
  },

  data() {
    return {
      paciente: {
        id: null,
        nome: "",
        email: "",
        cpf: "",
        genero: null,
        telefone: "",
        date: null,
        exame: ""
      },
      text: "center",
      toggle_exclusive: 0,
      tools: false
    };
  },

  mounted() {
    var vm = this;
    cornerstoneWebImageLoader.external.cornerstone = cornerstone;
    cornerstoneTools.external.cornerstone = cornerstone;
    cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
    this.getPaciente(this.id);
    if (vm.$route.name === "Exame") {
      vm.getElement();
    }
  },

  methods: {
    getElement() {
      let wadoURL = this.paciente.exame;
      const element = this.$refs.dicomImage;
      cornerstone.enable(element);
      cornerstone.loadImage(wadoURL).then(image => {
        cornerstone.displayImage(element, image);
        cornerstoneTools.mouseInput.enable(element);
        cornerstoneTools.mouseWheelInput.enable(element);
        cornerstoneTools.zoomWheel.activate(element);
        cornerstoneTools.wwwc.activate(element, 1);
        cornerstoneTools.pan.activate(element, 2);
        cornerstoneTools.zoom.activate(element, 4);
        this.tools = true;
      });
    },

    getPaciente(id) {
      if (id) {
        const pacientes = JSON.parse(window.localStorage.getItem("pacientes"));
        const pacienteResult = pacientes.data.filter(item => item.id == id);
        if (pacienteResult && pacienteResult.length > 0) {
          this.paciente = pacienteResult[0];
        }
      }
    },

    imageTools() {
      const element = this.$refs.dicomImage;
    },

    wwwcTool() {
      this.disactiveAllTools();
      const element = this.$refs.dicomImage;
      cornerstoneTools.wwwc.activate(element, 1);
    },

    panTool() {
      this.disactiveAllTools();
      const element = this.$refs.dicomImage;
      cornerstoneTools.pan.activate(element, 1);
    },

    zoomTool() {
      this.disactiveAllTools();
      const element = this.$refs.dicomImage;
      cornerstoneTools.zoom.activate(element, 1);
    },

    lengthTool() {
      this.disactiveAllTools();
      const element = this.$refs.dicomImage;
      cornerstoneTools.length.activate(element, 1);
    },

    ellipticalRoi() {
      this.disactiveAllTools();
      const element = this.$refs.dicomImage;
      cornerstoneTools.ellipticalRoi.activate(element, 1);
    },

    disactiveAllTools() {
      const element = this.$refs.dicomImage;
      cornerstoneTools.wwwc.disable(element);
      cornerstoneTools.pan.activate(element, 2);
      cornerstoneTools.zoom.activate(element, 4);
      cornerstoneTools.probe.deactivate(element, 1);
      cornerstoneTools.length.deactivate(element, 1);
      cornerstoneTools.ellipticalRoi.deactivate(element, 1);
      cornerstoneTools.rectangleRoi.deactivate(element, 1);
      cornerstoneTools.stackScroll.deactivate(element, 1);
      cornerstoneTools.wwwcTouchDrag.deactivate(element);
      cornerstoneTools.zoomTouchDrag.deactivate(element);
      cornerstoneTools.panTouchDrag.deactivate(element);
      cornerstoneTools.stackScrollTouchDrag.deactivate(element);
    }
  }
};
</script>

<style>
.canvas {
  background: black;
  width: 500px;
  height: 500px;
  border: 2px solid white;
  margin-top: 20px;
}
</style>
