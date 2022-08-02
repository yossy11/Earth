import {
  Ion,
  Viewer,
  createWorldTerrain,
  createOsmBuildings,
  Cartesian3,
  Color,
  Property,
} from "cesium";
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
  animation: false,
});

// Add Cesium OSM Buildings, a global 3D buildings layer.
viewer.scene.primitives.add(createOsmBuildings());

const yellowCylinder = viewer.entities.add({
  position: Cartesian3.fromDegrees(-74.044444, 40.689167, 200000.0),
  cylinder: {
    length: 400000.0,
    topRadius: 2000.0,
    bottomRadius: 2000.0,
    material: Color.YELLOW.withAlpha(0.5),
    outline: true,
    outlineColor: Color.YELLOW,
  },
});

const redSphere = viewer.entities.add({
  name: "Statue of Liberty",
  position: Cartesian3.fromDegrees(-74.044444, 40.689167, 400000.0),
  ellipsoid: {
    radii: new Cartesian3(30000.0, 30000.0, 30000.0),
    material: Color.RED,
  },
});

redSphere.description =
  '\
<img\
  width="50%"\
  style="float:left; margin: 0 1em 1em 0;"\
  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/USA-NYC-Statue_of_Liberty.jpg/500px-USA-NYC-Statue_of_Liberty.jpg"/>\
<p>\
  The Statue of Liberty (Liberty Enlightening the World; French: La Liberté éclairant le monde)\
  is a colossal neoclassical sculpture on Liberty Island in New York Harbor in New York City,\
  in the United States. The copper statue, a gift from the people of France to the people of the United States,\
  was designed by French sculptor Frédéric Auguste Bartholdi and its metal framework was built by Gustave Eiffel.\
  The statue was dedicated on October 28, 1886\
</p>\
<p>\
  Source: \
  <a style="color: WHITE"\
    target="_blank"\
    href="https://en.wikipedia.org/wiki/Statue_of_Liberty">Wikpedia</a>\
</p>' as unknown as Property;

viewer.zoomTo(viewer.entities);
