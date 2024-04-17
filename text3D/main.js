import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Text, TyperText } from "./text.js";
import { Loaders } from "./loaders.js";

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 10;

var ambientLight = new THREE.AmbientLight(0xeeeeee, 0.5);
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1000, 100);
directionalLight.castShadow = true;
scene.add(directionalLight);

//
var controls = new OrbitControls(camera, renderer.domElement);
controls.update();



// =================== 3D TEXT ==============================
let loaders = new Loaders();
let texture2 = await loaders.asyncLoadTexture(
  {textureJSONPath:"textures/36220C_C6C391_8C844A_8B7B4C.jpg"}
);



let text = new Text();
let { text3D, bounding } = await text.createTextMesh(
  "TAHA",
  "fonts/Cormorant Garamond_Bold.json",
  new THREE.MeshMatcapMaterial({ matcap: texture2 }),
  { fontSize: 1.5 }
);
text3D.position.z = 0.15;
scene.add(text3D);



// ===================== CREATE 3D on TEXT INPUT ============================
let typer = new TyperText({
  font: "fonts/Dancing Script_Bold.json",
  matrial: new THREE.MeshMatcapMaterial({ matcap: texture2 }),
  isCentered: true,
  textStyle: {
    fontSize: 1.5,
  },
});

document.querySelector(".txtInp").addEventListener("keydown", (e) => {
  typer.textOnBackspace(e);
});
document.querySelector(".txtInp").addEventListener("input", (e) => {
  typer.textOnInput(e);
});

typer.groupOfLetters.position.y = -3;

scene.add(typer.groupOfLetters);

function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
