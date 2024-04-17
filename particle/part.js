import * as THREE from 'three';

export class ParticleManager {
    constructor(scene) {
        this.scene = scene;
        this.particles = [];
        this.time = 0;
    }

    createParticles(options) {
        const { particleCount, particleSize, particleColor } = options;
        const points = [];
        const particleMaterial = new THREE.PointsMaterial({ size: particleSize, color: particleColor });

        // Generate random particle positions
        for (let i = 0; i < particleCount; i++) {
            const x = Math.random() * 10 - 5;
            const y = Math.random() * 10 - 5;
            const z = Math.random() * 10 - 5;
            points.push(new THREE.Vector3(x, y, z));
        }

        // Create particle geometry and add to scene
        const pointsGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const pointsObject = new THREE.Points(pointsGeometry, particleMaterial);
        this.scene.add(pointsObject);
        this.particles.push(pointsObject);
    }
    animateParticles() {
        // Update particle positions
        this.particles.forEach(particle => {
            const vertices = particle.geometry.attributes.position.array;
            for (let i = 0; i < vertices.length; i += 3) {
                vertices[i] += Math.sin(this.time * 0.05) * 0.1; 
                vertices[i + 1] += Math.cos(this.time * 0.05) * 0.1; 
                vertices[i + 2] += Math.sin(this.time * 0.05) * 0.1; 
            }
            particle.geometry.attributes.position.needsUpdate = true;
        });

        this.time += 1; 
    }

    animateParticlesCircle() {
        // Update particle positions in a circular motion
        this.time += 0.03;
        const radius = 2; // Radius of the circular motion

        for (let i = 0; i < this.particles.length; i++) {
            const angle = this.time + (i * Math.PI * 2) / this.particles.length;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const z = 0; // Assuming particles move in the XY plane
            this.particles[i].position.set(x, y, z);
        }
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    createParticlesOnCube(cube, particleCount, particleSize, particleColor) {
        const vertices = cube.geometry.vertices;
    
        if (!vertices) {
            console.error('Vertices not found in cube geometry.');
            return;
        }
    
        for (let i = 0; i < vertices.length; i++) {
            const vertex = vertices[i];
            const particleGeometry = new THREE.BufferGeometry();
            const positions = [];
    
            // Add multiple vertices to represent the particle
            for (let j = 0; j < particleCount; j++) {
                positions.push(vertex.x, vertex.y, vertex.z); // Add the same vertex multiple times
            }
    
            particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
            const particleMaterial = new THREE.PointsMaterial({ size: particleSize, color: particleColor });
            const particle = new THREE.Points(particleGeometry, particleMaterial);
            this.scene.add(particle);
            this.particles.push(particle);
        }
    }
}
