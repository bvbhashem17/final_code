import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap"; // npm install gsap


/**
 * ! Step 1
 * npm install --save lil-gui
 */

/**
 * ! Step 2
 */
import * as dat from "lil-gui";
/**
 * Debug
 */
const gui = new dat.GUI();
const parameters = {
  color: 0xff0000,
  spin: () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
  },
};

const scene = new THREE.Scene();
//scene.background = new THREE.Color(black);


const canvas = document.querySelector("canvas.webgl");

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Cube
 */
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(4, 4, 4),
  new THREE.MeshBasicMaterial({ color: parameters.color })
);
scene.add(mesh);


/**
 * Tweaks
 */
const cubeFolder = gui.addFolder('Cube');
const cubeRotationFolder = cubeFolder.addFolder('Rotation');
cubeRotationFolder.add(mesh.rotation, 'x', 0, Math.PI * 2, 0.01)
cubeRotationFolder.add(mesh.rotation, 'y', 0, Math.PI * 2, 0.01)
cubeRotationFolder.add(mesh.rotation, 'z', 0, Math.PI * 2, 0.01)
const cubePositionFolder = cubeFolder.addFolder('Position')
cubePositionFolder.add(mesh.position, 'x', -10, 10)
cubePositionFolder.add(mesh.position, 'y', -10, 10)
cubePositionFolder.add(mesh.position, 'z', -10, 10)
const cubeScaleFolder = cubeFolder.addFolder('Scale')
cubeScaleFolder.add(mesh.scale, 'x', 0, 10, 0.1) //.onFinishChange(() => console.dir(cube.geometry))
cubeScaleFolder.add(mesh.scale, 'y', 0, 10, 0.1)
cubeScaleFolder.add(mesh.scale, 'z', 0, 10, 0.1)


cubeFolder.open()





gui.add(mesh, "visible");


gui.add(mesh.material, "wireframe");
console.log(mesh.material.color);
gui.addColor(parameters, "color").onChange(() => {
  mesh.material.color.set(parameters.color);
});


const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);



camera.position.z = 20;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);

const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
