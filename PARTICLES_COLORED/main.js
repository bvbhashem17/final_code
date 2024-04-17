import * as THREE from 'three'
import {createFireworks} from './fire.js';
const canvas = document.querySelector('canvas.webgl');

// scene 
const scene = new THREE.Scene();
// camera 
 const sizes={
  width:window.innerWidth,
  height:window.innerHeight
 }
const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,1000);
camera.position.z=5
// render 
const renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setSize(sizes.width,sizes.height);

// add lights to the scene 
const ambientLight =new THREE.AmbientLight(0xffffff,0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff,0.5)
directionalLight.position.set(0,1,0);
scene.add(directionalLight)

//////////////////////////////////
// call the function 
createFireworks(scene,[
    new THREE.Color(0xff0000),//red
    new THREE.Color(0x00ff00),//green
    new THREE.Color(0x0000ff)//blue

])

//render loop 
function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene,camera)
}

animate();
