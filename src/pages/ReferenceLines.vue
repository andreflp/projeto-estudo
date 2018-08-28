<template>
  <v-app>
    <div>
      <h3 style="margin-bottom: 2px;">Ferramentas</h3>
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

        <v-btn flat @click="ellipticalRoiTool()">
          <span>Elliptical Roi</span>
          <v-icon>radio_button_unchecked</v-icon>
        </v-btn>

        <v-btn flat @click="referenceLinesTool()">
          <span>Reference Lines</span>
          <v-icon>add</v-icon>
        </v-btn>

        <v-btn flat @click="clearChanges()">
          <span>Clear</span>
          <v-icon>clear</v-icon>
        </v-btn>
      </v-btn-toggle>
      <br>
      <div>
        <h3 style="margin-top: 15px; margin-bottom: 2px;">Synchronizer</h3>
        <v-btn-toggle v-model="toggle_exclusive1">
          <v-btn flat @click="activeSynchronizer()">
            <v-icon>sync</v-icon>
          </v-btn>

          <v-btn flat @click="desactiveSynchronizer()">
            <v-icon>sync_disabled</v-icon>
          </v-btn>
        </v-btn-toggle>  
      </div>
      <div style="margin-top: 20px;">
        <div style="width:380px;height:380px;position:relative;display:inline-block;color:white;" oncontextmenu="return false"
          unselectable="on" onselectstart="return false;" onmousedown="return false;">
          <div class="imagemAxial" value="on" id="axial" ref="axial" style="width:380px;height:380px;top:0px;left:0px; position:absolute;">
          </div>
        </div>
  
        <div style="width:380px;height:380px;position:relative;display:inline-block;color:white;margin-left:20px;" oncontextmenu="return false"
          unselectable="on" onselectstart="return false;" onmousedown="return false;">
          <div class="imagemCoronal" value="on" id="coronal" ref="coronal" style="width:380px;height:380px;top:0px;left:0px; position:absolute;">
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import * as cornerstone from "cornerstone-core";
import * as cornerstoneMath from "cornerstone-math";
import * as cornerstoneWebImageLoader from "cornerstone-web-image-loader";
import * as cornerstoneTools from "cornerstone-tools";

import * as test from "@/data/exampleImageLoader";
import * as test2 from "@/data/exampleMetaDataProvider";

export default {
  name: "reference-lines",
  data() {
    return {
      text: "center",
      toggle_exclusive: 0,
      toggle_exclusive1: 3,
      synchronizer: null,
      synchronizerWWWC: null,
      synchronizerPanZoom: null
    };
  },

  methods: {
    getElements() {
      const axialElement = this.$refs.axial;
      const coronalElement = this.$refs.coronal;

      var axialImageIds = ["example://1", "example://2"];

      var axialStack = {
        currentImageIdIndex: 0,
        imageIds: axialImageIds
      };

      this.synchronizer = new cornerstoneTools.Synchronizer(
        "cornerstonenewimage",
        cornerstoneTools.updateImageSynchronizer
      );

      this.synchronizerWWWC = new cornerstoneTools.Synchronizer(
        "cornerstoneimagerendered",
        cornerstoneTools.wwwcSynchronizer
      );

      this.synchronizerPanZoom = new cornerstoneTools.Synchronizer(
        "cornerstoneimagerendered",
        cornerstoneTools.panZoomSynchronizer
      );

      // image enable the dicomImage element
      cornerstone.enable(axialElement);
      cornerstone.enable(coronalElement);

      // Enable mouse inputs
      cornerstoneTools.mouseInput.enable(axialElement);
      cornerstoneTools.mouseWheelInput.enable(axialElement);
      cornerstoneTools.mouseInput.enable(coronalElement);

      var axialPromise = cornerstone.loadImage(axialImageIds[0]).then(image => {
        // display this image
        cornerstone.displayImage(axialElement, image);

        // set the stack as tool state
        cornerstoneTools.addStackStateManager(axialElement, [
          "stack",
          "referenceLines",
          "linkedStacks"
        ]);

        cornerstoneTools.addToolState(axialElement, "stack", axialStack);

        // Enable all tools we want to use with this element
        cornerstoneTools.wwwc.activate(axialElement, 1);
        cornerstoneTools.zoom.activate(axialElement, 4);
        cornerstoneTools.stackScrollWheel.activate(axialElement);
        cornerstoneTools.pan.activate(axialElement, 2);
      });

      var coronalPromise = cornerstone.loadImage("example://3").then(image => {
        // display this image
        cornerstone.displayImage(coronalElement, image);

        cornerstoneTools.addStackStateManager(coronalElement, [
          "stack",
          "referenceLines",
          "linkedStacks"
        ]);

        // Enable all tools we want to use with this element
        cornerstoneTools.wwwc.activate(coronalElement, 1);
        cornerstoneTools.zoom.activate(coronalElement, 4);
        cornerstoneTools.stackScrollWheel.activate(coronalElement);
        cornerstoneTools.pan.activate(coronalElement, 2);
      });
    },

    wwwcTool() {
      const elAxial = this.$refs.axial;
      const elCoronal = this.$refs.coronal;
      this.disactiveAllTools([elAxial, elCoronal]);
      cornerstoneTools.wwwc.activate(elAxial, 1);
      cornerstoneTools.wwwc.activate(elCoronal, 1);
    },

    panTool() {
      const elAxial = this.$refs.axial;
      const elCoronal = this.$refs.coronal;
      this.disactiveAllTools([elAxial, elCoronal]);
      cornerstoneTools.pan.activate(elAxial, 1);
      cornerstoneTools.pan.activate(elCoronal, 1);
    },

    zoomTool() {
      const elAxial = this.$refs.axial;
      const elCoronal = this.$refs.coronal;
      this.disactiveAllTools([elAxial, elCoronal]);
      cornerstoneTools.zoom.activate(elAxial, 1);
      cornerstoneTools.zoom.activate(elCoronal, 1);
    },

    lengthTool() {
      const elAxial = this.$refs.axial;
      const elCoronal = this.$refs.coronal;
      this.disactiveAllTools([elAxial, elCoronal]);
      cornerstoneTools.length.activate(elAxial, 1);
      cornerstoneTools.length.activate(elCoronal, 1);
    },

    ellipticalRoiTool() {
      const elAxial = this.$refs.axial;
      const elCoronal = this.$refs.coronal;
      this.disactiveAllTools([elAxial, elCoronal]);
      cornerstoneTools.ellipticalRoi.activate(elAxial, 1);
      cornerstoneTools.ellipticalRoi.activate(elCoronal, 1);
    },

    referenceLinesTool() {
      var elAxial = this.$refs.axial;
      var elCoronal = this.$refs.coronal;
      if (
        elAxial.getAttribute("sync") == "on" &&
        elCoronal.getAttribute("sync") == "on"
      ) {
        cornerstoneTools.referenceLines.tool.disable(elAxial);
        cornerstoneTools.referenceLines.tool.disable(elCoronal);
        elAxial.setAttribute("sync", "off");
        elCoronal.setAttribute("sync", "off");
      } else {
        elAxial.setAttribute("sync", "on");
        elCoronal.setAttribute("sync", "on");
        cornerstoneTools.referenceLines.tool.enable(elAxial, this.synchronizer);
        cornerstoneTools.referenceLines.tool.enable(
          elCoronal,
          this.synchronizer
        );
      }
    },

    clearChanges() {
      const elAxial = this.$refs.axial;
      const elCoronal = this.$refs.coronal;
      var toolStateManager =
        cornerstoneTools.globalImageIdSpecificToolStateManager;

      toolStateManager.clear(elAxial);
      toolStateManager.clear(elCoronal);
      cornerstoneTools.referenceLines.tool.disable(elAxial);
      cornerstoneTools.referenceLines.tool.disable(elCoronal);
      elAxial.setAttribute("sync", "off");
      elCoronal.setAttribute("sync", "off");

      cornerstone.reset(elAxial);
      cornerstone.reset(elCoronal);
      cornerstone.updateImage(elAxial);
      cornerstone.updateImage(elCoronal);
    },

    disactiveAllTools(elements) {
      if (!Array.isArray(elements)) elements = [elements];
      elements.forEach(element => {
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
      });
    },

    activeSynchronizer() {
      const elAxial = this.$refs.axial;
      const elCoronal = this.$refs.coronal;
      this.synchronizer.add(elAxial);
      this.synchronizerWWWC.add(elAxial);
      this.synchronizerPanZoom.add(elAxial);
      this.synchronizer.add(elCoronal);
      this.synchronizerWWWC.add(elCoronal);
      this.synchronizerPanZoom.add(elCoronal);
      cornerstone.updateImage(elAxial);
      cornerstone.updateImage(elCoronal);
    },

    desactiveSynchronizer() {
      const elAxial = this.$refs.axial;
      const elCoronal = this.$refs.coronal;
      this.synchronizer.remove(elAxial);
      this.synchronizerWWWC.remove(elAxial);
      this.synchronizerPanZoom.remove(elAxial);
      this.synchronizer.remove(elCoronal);
      this.synchronizerWWWC.remove(elCoronal);
      this.synchronizerPanZoom.remove(elCoronal);
      cornerstone.updateImage(elAxial);
      cornerstone.updateImage(elCoronal);
    }
  },

  created() {
    cornerstoneWebImageLoader.external.cornerstone = cornerstone;
    cornerstoneTools.external.cornerstone = cornerstone;
    cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
    window.cornerstoneTools = cornerstoneTools;
  },

  mounted() {
    this.getElements();
  }
};
</script>

<style>
.imagemAxial {
  border: 2px solid black;
}

.imagemCoronal {
  border: 2px solid black;
}
</style>
