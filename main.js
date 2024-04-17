import * as THREE from "three";
import { World } from "./world";
import { Box } from "./Box";
import { ArcballControls } from "three/addons/controls/ArcballControls.js";
import { Loaders } from "./loaders";

var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// ========================================
let box = new Box({
  geo: {
    width: 1,
    height: 1,
    depth: 1,
  },
  material: new THREE.MeshBasicMaterial({ color: "red" }),
  position: [0, 0, 0],
  castShadow: true,
}).getMesh();

// ==========================================
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);

// ==============
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.camera.left = -7;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.bottom = -7;
directionalLight.position.set(-5, 5, 0);
// ==========================================
let loaders = new Loaders();
let fox = await loaders.asyncLoadGLTFModel({
  modelPath: "./models/Fox/glTF/Fox.gltf",
  isCompressed: true,
});
fox.scene.position.y = 0.5;
fox.scene.scale.set(0.015, 0.015, 0.015);

World({
  canvasDOMElement: document.querySelector("#app"),
  style: {
    bgColor: "black",
    width: window.innerWidth,
    height: window.innerHeight,
    opacity: 0.8,
  },
  camera: camera,
  childrens: [box, fox.scene],
  lights: [ambientLight, directionalLight],
  haveOrbitControls: false,
  isResponsive: true,
  loop: (c) => {
    // console.log(c);
  },
  addControls: (r, c, s) => {
    const controls = new ArcballControls(c, r.domElement, s);

    controls.addEventListener("change", function () {
      r.render(s, c);
    });
  },
});
World();
