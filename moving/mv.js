import * as THREE from 'three';

export function createParticles(scene, numParticles, color, size) {
    // Particle material
    const particleMaterial = new THREE.PointsMaterial({ color: color, size: size });

    // Particle geometry
    const particleGeometry = new THREE.BufferGeometry();

    // Arrays to store particle positions
    const positions = new Float32Array(numParticles * 3);

    // Set up particle positions randomly within a range
    for (let i = 0; i < numParticles; i++) {
        const x = (Math.random() - 0.5) * 10; // Random x position within a range
        const y = (Math.random() - 0.5) * 10; // Random y position within a range
        const z = (Math.random() - 0.5) * 10; // Random z position within a range

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle system
    const particles = new THREE.Points(particleGeometry, particleMaterial);

    scene.add(particles);

    return particles; // Return the particles object in case you need to manipulate it later
}