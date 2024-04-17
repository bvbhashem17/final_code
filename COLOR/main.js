
import *as THREE from "three"
const canvas = document.querySelector('canvas.webgl')
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

//mouse coordinate 
const cursor={
  x:0,
  y:0
}

// scene 
const scene = new THREE.Scene();
//cube 
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color:'red'})
const mesh = new THREE.Mesh(geometry,material)
scene.add(mesh)

mesh.addEventListener('mousemove',(event)=>{
  cursor.x=event.clientX/sizes.width-0.5
  cursor.y= -(event.clientY/sizes.height-0.5)

})
// camera 
const sizes={
  width:window.innerWidth,
  height:window.innerHeight
}
// resize window 
window.addEventListener('resize',()=>{
  //update sizes 
  sizes.width=window.innerWidth;
  sizes.height=window.innerHeight
  //update camera 
  camera.aspect=aspectratio;
  camera.updateProjectionMatrix()
  //update render 
  renderer.setSize(sizes.width,sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

})

const aspectratio =sizes.width/sizes.height
const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height);
camera.position.z=3
camera.lookAt(mesh.position)
scene.add(camera)
// controls 
const control= new OrbitControls(camera,canvas)
control.enableDamping=true

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas:canvas

})
renderer.setSize(sizes.width,sizes.height)

//function 
function changeColor(){
  const newColor = new THREE.Color(Math.random(),Math.random(),Math.random());
  mesh.material.color= newColor;
}

// event listener 
canvas.addEventListener('click',(event)=>{
  const mouse={
    x:(event.clientX/sizes.width) *2-1,
    y:-(event.clientY/sizes.height) * 2+1
  };

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse,camera);
  const intersects =raycaster.intersectObject(mesh);
  if (intersects.length >0){
    changeColor();
  }
});

// animation 
const clock = new THREE.Clock()
const tick = ()=>{
  const elapsedTime = clock.getElapsedTime()
  control.update()
  renderer.render(scene,camera)
  window.requestAnimationFrame(tick)
}
tick()

