import * as THREE from "three"
import { generateMagicCarpet } from "./carp.js"
import { generateMagicCarpet2 } from "./carp.js"
import { generateSwimingParticles } from "./carp.js"
const canvas = document.querySelector('canvas.webgl');

// scene 
const scene = new THREE.Scene();
// camera 
 const sizes={
  width:window.innerWidth,
  height:window.innerHeight
 }
const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,1000);
// render 
const renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setSize(sizes.width,sizes.height);

// create particle material 
const particleMaterial = new THREE.PointsMaterial({color:0x3366ff,size:0.05});

// generate the carpet 
const updateParticles= generateMagicCarpet2(scene,10,20,particleMaterial);
const updateParticles2= generateMagicCarpet(scene,10,20,particleMaterial);
const updateParticles3= generateSwimingParticles(scene,10,20,particleMaterial);

// animation function 
function animate(){
  requestAnimationFrame(animate);
  // update particles 

  //updateParticles();
  //updateParticles2();
  updateParticles3();

  // rotate the scene 
  scene.rotation.y += 0.005;
  // render 
  renderer.render(scene,camera);
}

// initial camera position 
camera.position.set(0,3,10);
camera.lookAt(0,0,0);

animate();


