import * as THREE from 'three'

export class moon {
    constructor(scene){
        this.scene=scene;
    }
    generateMovingParticles(options) {
        const {
            count = 10000,
            areaSize = 100,
            particleSize = 0.1,
            particleMaterial
        } = options;

        const particles = [];
        const startTime = Date.now();
    
        // Create moving particles
        for (let i = 0; i < count; i++) {
            const particleGeometry = new THREE.BufferGeometry();
            particleGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([0, 0, 0]), 3));
    
            const particle = new THREE.Points(particleGeometry, particleMaterial.clone()); // Clone material for each particle
            particle.position.set(
                Math.random() * areaSize - areaSize / 2,
                Math.random() * areaSize - areaSize / 2,
                Math.random() * areaSize - areaSize / 2
            );
    
            particles.push({
                particle: particle,
                offsetX: Math.random() * Math.PI * 2,
                offsetY: Math.random() * Math.PI * 2,
                offsetZ: Math.random() * Math.PI * 2
            });
    
            this.scene.add(particle);
        }
    
        // Create swimming particles
        const swimmingParticles = [];
        const swimmingParticleMaterial = particleMaterial.clone();
        swimmingParticleMaterial.color.setHex(0x00ff00); // Set color directly
    
        for (let i = 0; i < count / 2; i++) { // Half the count for swimming particles
            const particleGeometry = new THREE.BufferGeometry();
            particleGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([0, 0, 0]), 3));
    
            const particle = new THREE.Points(particleGeometry, swimmingParticleMaterial.clone()); // Clone material for each particle
            particle.position.set(
                Math.random() * areaSize - areaSize / 2,
                Math.random() * areaSize - areaSize / 2,
                Math.random() * areaSize - areaSize / 2
            );
    
            swimmingParticles.push({
                particle: particle,
                offsetX: Math.random() * Math.PI * 2,
                offsetY: Math.random() * Math.PI * 2,
                offsetZ: Math.random() * Math.PI * 2
            });
    
            this.scene.add(particle);
        }
    
        // Animation loop function
        function updateParticles() {
            const time = (Date.now() - startTime) * 0.001;
    
            // Update moving particles positions
            for (let i = 0; i < particles.length; i++) {
                const particle = particles[i];
    
                // Update particle position
                particle.particle.position.x = particle.particle.position.x + Math.sin(time + particle.offsetX) * 0.1;
                particle.particle.position.y = particle.particle.position.y + Math.sin(time + particle.offsetY) * 0.1;
                particle.particle.position.z = particle.particle.position.z + Math.sin(time + particle.offsetZ) * 0.1;
            }
    
            // Update swimming particles positions
            for (let i = 0; i < swimmingParticles.length; i++) {
                const particle = swimmingParticles[i];
    
                // Update particle position
                particle.particle.position.x = particle.particle.position.x + Math.sin(time + particle.offsetX) * 0.05; // Slower movement
                particle.particle.position.y = particle.particle.position.y + Math.sin(time + particle.offsetY) * 0.05; // Slower movement
                particle.particle.position.z = particle.particle.position.z + Math.sin(time + particle.offsetZ) * 0.05; // Slower movement
            }
        }
    
        return updateParticles;
    }
}

////////////////////////////////////////////////////////////////

export function generateMoonParticles2(scene, count = 5000, radius = 0.5, particleMaterial) {
    const particles = [];
    const moonHeight = 5; // Adjust the height of the moon

    // Create moon particles
    for (let i = 0; i < count; i++) {
        const phi = Math.random() * Math.PI * 2;
        const theta = Math.random() * Math.PI;

        //  randomness to the radius
        const randomRadius = radius + (Math.random() - 0.5) * 0.1;

        // Calculate particle positions 
        const x = randomRadius * Math.sin(theta) * Math.cos(phi);
        const y = moonHeight + randomRadius * Math.sin(theta) * Math.sin(phi);
        const z = randomRadius * Math.cos(theta);

        //  randomness to particle sizes and colors 
        const particleSize = Math.random() * 0.010 + 0.03; // Random size between 0.01 and 0.16
        const particleColor = new THREE.Color(
            0.8 + Math.random() * 0.2,
            0.6 + Math.random() * 0.2,
            0.6 + Math.random() * 0.2
        ); // Random light grayish color

        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([x, y, z]), 3));

        const particle = new THREE.Points(particleGeometry, particleMaterial.clone()); // Clone material for each particle
        particleMaterial.size = particleSize;
        particleMaterial.color = particleColor;
        particles.push(particle);

        scene.add(particle);
    }

    // the moon particles
    const moonGroup = new THREE.Group();
    moonGroup.add(...particles);
    scene.add(moonGroup);

    // Animation loop function
    function updateParticles() {
        moonGroup.rotation.y += 0.01; //  speed of rotation as needed
    }

    return updateParticles;
}

export function generateMovingParticles2(scene, count = 1000, areaSize = 100, particleSize = 0.1, particleMaterial) {
    const particles = [];
    const startTime = Date.now();

    // Create moving particles
    for (let i = 0; i < count; i++) {
        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([0, 0, 0]), 3));

        let material = particleMaterial.clone();

        // Randomly assign yellow material to some particles
        if (Math.random() < 0.1) {
            material = new THREE.PointsMaterial({ color: 0xffff00, size: particleSize });
        } else {
            // Randomize particle size and color
            const sizeVariation = Math.random() * 0.5 + 0.5; // Random size between 0.5 and 1.0
            const colorVariation = new THREE.Color(Math.random(), Math.random(), Math.random()); // Random color

            material = new THREE.PointsMaterial({ color: colorVariation, size: particleSize * sizeVariation });
        }

        const particle = new THREE.Points(particleGeometry, material);
        particle.position.set(
            Math.random() * areaSize - areaSize / 2,
            Math.random() * areaSize - areaSize / 2,
            Math.random() * areaSize - areaSize / 2
        );

        //  position for yellow particles
        const initialPosition = particle.position.clone();

        particles.push({
            particle: particle,
            material: material, // Store the material for reference
            offsetX: Math.random() * Math.PI * 2,
            offsetY: Math.random() * Math.PI * 2,
            offsetZ: Math.random() * Math.PI * 2,
            initialPosition: initialPosition // Store initial position
        });

        scene.add(particle);
    }

    // Create moon particles
    const moonParticlesUpdate = generateMoonParticles2(scene, 500, 50, particleMaterial);

    // Animation loop function
    function updateParticles() {
        const time = (Date.now() - startTime) * 0.001;

        // Update moving particles positions
        for (let i = 0; i < particles.length; i++) {
            const particle = particles[i];

            // Update particle position if not yellow
            if (!particle.material.color.equals(new THREE.Color(0xffff00))) {
                particle.particle.position.x = particle.particle.position.x + Math.sin(time + particle.offsetX) * 0.1;
                particle.particle.position.y = particle.particle.position.y + Math.sin(time + particle.offsetY) * 0.1;
                particle.particle.position.z = particle.particle.position.z + Math.sin(time + particle.offsetZ) * 0.1;
            }
            // Reset position for yellow particles
            else {
                particle.particle.position.copy(particle.initialPosition);
            }
        }

        // Update moon particles
        moonParticlesUpdate();
    }

    return updateParticles;
}

