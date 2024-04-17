import * as THREE from 'three';

let camera; 

// Function to create and animate the ring of particles emitting light
export function createParticleRing() {
  // Scene
  const scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // Renderer
  const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('canvas.webgl') });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Particle material
  const particleMaterial = new THREE.PointsMaterial({ color: 0x00ff00, size: 0.03, emissive: 0x00f000, emissiveIntensity: 1 });

  // Number of particles
  const particleCount = 200; //  particle count 

  // Particle geometry
  const particleGeometry = new THREE.BufferGeometry();

  // Arrays to store particle positions
  const positions = new Float32Array(particleCount * 3);
  const positionsInner = new Float32Array(particleCount * 3);
  const positionsFloating = new Float32Array(particleCount * 3); // New array for floating ring particles

  //particle positions in a ring 
  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2;
    const radius = 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const z = 0;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    // inner ring particles 
    const innerRadius = 1; //  inner radius 
    const xInner = Math.cos(angle) * innerRadius;
    const yInner = Math.sin(angle) * innerRadius;

    positionsInner[i * 3] = xInner;
    positionsInner[i * 3 + 1] = yInner;
    positionsInner[i * 3 + 2] = z;

    // Create floating ring particles 
    const floatingRadius = 0.5; //  floating ring radius 
    const xFloating = Math.cos(angle) * floatingRadius;
    const yFloating = Math.sin(angle) * floatingRadius;

    positionsFloating[i * 3] = xFloating;
    positionsFloating[i * 3 + 1] = yFloating;
    positionsFloating[i * 3 + 2] = z;
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeometry.setAttribute('positionInner', new THREE.BufferAttribute(positionsInner, 3));
  particleGeometry.setAttribute('positionFloating', new THREE.BufferAttribute(positionsFloating, 3)); 

  // Particle systems
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  const particlesInner = new THREE.Points(particleGeometry, particleMaterial);
  const particlesFloating = new THREE.Points(particleGeometry, particleMaterial); // New  floating ring particles

  scene.add(particles);
  scene.add(particlesInner);
  scene.add(particlesFloating); // Add floating ring particles to the scene

  //  position of inner ring
  particlesInner.position.set(0, 0, -1.5); // Move inner ring further from the camera
  particlesFloating.position.set(0, 0, -2.5); 

  // Raycaster for click event
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  
  const explosions = [];

  // Event listener for clicking 
  document.querySelector('canvas.webgl').addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(particlesInner); 

    if (intersects.length > 0) {
      createExplosion(intersects[0].point); // Call function to create explosion at the clicked position
    } else {
      clearExplosions(); // remove all exploded particles
    }
  });

  // Function to create explosion particles
  function createExplosion(position) {
    const explosionGeometry = new THREE.BufferGeometry();
    const explosionMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 });

    const explosionPositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const x = (Math.random() - 0.5) * 10; // Spread particles across the scene
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;

      explosionPositions[i] = position.x + x;
      explosionPositions[i + 1] = position.y + y;
      explosionPositions[i + 2] = position.z + z;
    }

    explosionGeometry.setAttribute('position', new THREE.BufferAttribute(explosionPositions, 3));

    const explosion = new THREE.Points(explosionGeometry, explosionMaterial);
    scene.add(explosion);

    // Add explosion to the array
    explosions.push(explosion);
  }

  //  clear all exploded particles from the scene
  function clearExplosions() {
    explosions.forEach((explosion) => {
      scene.remove(explosion);
    });

    explosions.length = 0; // Clear the explosions array
  }

  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);

    // Rotate the particles around the rings
    particles.rotation.z += 0.01;
    particlesInner.rotation.z -= 0.01; //  rotation for inner ring
    particlesFloating.rotation.z += 0.02; // Rotate the floating ring particles 

    // Update explosion animations
    explosions.forEach((explosion) => {
      explosion.rotation.x += 0.01;
      explosion.rotation.y += 0.01;
    });

    renderer.render(scene, camera);
  };

  animate();
}
document.addEventListener('DOMContentLoaded', () => {
  createParticleRing();
});