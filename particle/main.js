import * as THREE from 'three';
import { ParticleManager } from './part.js'; 
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene();
// camera 
const sizes={
  width: window.innerWidth,
  height: window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
scene.add(camera)

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// particle 
const particleManager = new ParticleManager(scene);
const para = {
  particleCount: 500,
  particleSize: 0.05, 
  particleColor: 0xff0000
};
particleManager.createParticles(para);
scene.add(particleManager.particles[0]);

function animate() {

  requestAnimationFrame(animate); // Request the next frame

  // Update particles
  //particleManager.animateParticles(); // animation 
  particleManager.animateParticlesCircle(); // circular animation 
  // Render the scene
  renderer.render(scene, camera);
}

// Start the animation loop
animate();
