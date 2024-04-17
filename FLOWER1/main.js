
import { createFlowerParticles } from './flw.js'; // Adjust the path accordingly
import * as THREE from "three"

const canvas = document.querySelector('canvas.webgl');

// scene 
const scene = new THREE.Scene();
// camera 
 const sizes={
  width:window.innerWidth,
  height:window.innerHeight
 }
const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,1000);
camera.position.z=5;
// render 
const renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setSize(sizes.width,sizes.height);
// call 
createFlowerParticles(scene);
// animate scene 
function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
}
animate();
