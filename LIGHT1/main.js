
import * as THREE from 'three'
import {LightManager} from './try.js';
const canvas =document.querySelector('canvas.webgl');

const scene = new THREE.Scene();
// cube 
const geometry = new THREE.BoxGeometry(1,1,1);
const material=new THREE.MeshStandardMaterial({color:'red'});
const mesh = new THREE.Mesh(geometry,material)
scene.add(mesh)

// camera 
const sizes={
  width:window.innerWidth,
  height:window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height)
camera.position.z=3
camera.lookAt(mesh.position)
scene.add(camera)

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas:canvas
})
renderer.setSize(sizes.width,sizes.height)

// light 
const lig = new LightManager(scene);
const pointLightParams ={
  type:'point',
  params:{
    color:0x00fff0,
    intensity:6,
    position:{x:0,y:0,z:3},
    distance:10
  }
}

////
const rectAreaLightParams={
  type:'rect',
  params:{
    color:0xffffff,
    intensity:1,
    width:2,
    height:2,
    position:{x:0,y:0,z:0},
    normal:{x:3,y:1,z:3},// facing up is default
    lookAt:{x:0,y:0,z:0}
    
  }
};
// add lights to the scene 
lig.addLights(pointLightParams);
lig.addLights(rectAreaLightParams);
renderer.render(scene,camera)

