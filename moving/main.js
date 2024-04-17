import * as THREE from 'three';
import { createParticles } from './mv.js'; // Adjust the path accordingly

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('canvas.webgl') });
renderer.setSize(window.innerWidth, window.innerHeight);

// Call the function 
const particles = createParticles(scene, 1000, 0xf000ff, 0.02); // Adjust parameters as needed

// Define an array of colors
const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xf000f0,0x33FF36,0xFF9C33,0xFF33C1 ]; 
let colorIndex = 0; // Initialize color index

// Function to animate the particle system
let isPaused = false; 
function animateParticles() {
    if (!isPaused) {
        requestAnimationFrame(animateParticles);

        // Update particle positions 
        particles.rotation.y += 0.01; 
        particles.rotation.z += 0.01;
        // Change particle color every cycle
        particles.material.color.setHex(colors[colorIndex]);
        colorIndex = (colorIndex + 1) % colors.length; // Move to the next color, looping back to the start if needed

        // Render the scene with updated particles
        renderer.render(scene, camera);
    }
}

// Start the animation
animateParticles();

// Event listener for single click to pause animation
document.addEventListener('click', () => {
    console.log('Clicked!');
    isPaused = !isPaused; // Toggle the pause state
});

// Event listener for double click to resume animation
document.addEventListener('dblclick', () => {
  console.log('Double clicked!');
  isPaused = false; // Resume the animation
  animateParticles(); // Start the animation
});