import *as THREE from 'three'
import {generateMovingParticles2, generateMoonParticles2} from './fly.js'
import {moon}from './fly.js'


const canvas = document.querySelector('canvas.webgl');

// scene 
const scene = new THREE.Scene();

// camera 
const sizes={
  width:window.innerWidth,
  height:window.innerHeight
};

const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,1000);
camera.position.set(0, 5, 10); // Set camera position

// Create a renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const moonObj = new moon(scene);

  //Generate moving particles
 const movingParticlesUpdate = moonObj.generateMovingParticles({
  count: 5000,
  areaSize: 150,
  particleSize: 0.05,
  particleMaterial: new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 })
});

 // Animation loop function
 function animate() {
     requestAnimationFrame(animate);

     // Update moving particles
     movingParticlesUpdate();
     // Render the scene
     renderer.render(scene, camera);
 }

 // Start the animation loop
 animate();

//////////////////////////////////////////////////////////// activate it when it i needed 

// Particle material setup
const particleMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });

// Generate and animate particles
const updateParticles = generateMovingParticles2(scene, 10000, 100, 0.1, particleMaterial);

// Generate and animate moon particles
const updateMoonParticles = generateMoonParticles2(scene, 1000, 5, particleMaterial);

// Resize handler
function resizeRenderer() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Event listener for window resize
window.addEventListener('resize', resizeRenderer);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Update particles
    updateParticles();
    updateMoonParticles();

    // Render scene
    renderer.render(scene, camera);
}

// Start animation loop
animate();