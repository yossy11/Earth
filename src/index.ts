import { Ion, Viewer, createWorldTerrain, createOsmBuildings } from "cesium";
import "cesium/Widgets/widgets.css";
import "./main.css";

// Your access token can be found at: https://cesium.com/ion/tokens.
// This is the default access token
if (process.env.ACCESS_TOKEN) {
  Ion.defaultAccessToken = process.env.ACCESS_TOKEN;
}

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new Viewer("cesiumContainer", {
  terrainProvider: createWorldTerrain(),
});

// Add Cesium OSM Buildings, a global 3D buildings layer.
viewer.scene.primitives.add(createOsmBuildings());
