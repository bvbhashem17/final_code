import * as THREE from 'three';

export function createParticleRiver(scene,camera,renderer,width, length, depth, curvature,coLor,size,emisive,emissiveIntensity){
    const particleMaterial = new THREE.PointsMaterial({color:coLor,size:size,emisive:emisive,emissiveIntensity: emissiveIntensity});

    const particleCount = 2000;
    const velocities = new Float32Array(particleCount * 3);
    const particleGeometry= new THREE.BufferGeometry();
    const position = new Float32Array(particleCount*3);

    // particle positions
    for (let i=0; i<particleCount;i++){
        const xpos=(Math.random() - 0.5) * width;
        const ypos=(Math.random() - 0.5) *2* length;
        //  z position
        const zpos= (Math.sin(ypos / curvature) + 0.5) * depth;
        //  particle position
      position[i * 3] = xpos;
      position[i * 3 + 1] = ypos;
      position[i * 3 + 2] = zpos;

      velocities[i * 3] = Math.random() * 0.01 - 0.005; // Random x velocity
      velocities[i * 3 + 1] = Math.random() * 0.01 - 0.005; // Random y velocity
      velocities[i * 3 + 2] = Math.random() * 0.01 - 0.005; // Random z velocity
    }

    //  particle positions
    particleGeometry.setAttribute('position',new THREE.BufferAttribute(position,3));
    particleGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3)); // Add velocities attribute

    const particles = new THREE.Points(particleGeometry,particleMaterial);
    scene.add(particles)
    // animation 
    const animate= ()=>{
        requestAnimationFrame(animate);
        // Update particle positions 
    for (let i = 0; i < particleCount; i++) {
        position[i * 3] += velocities[i * 3];
        position[i * 3 + 1] += velocities[i * 3 + 1];
        position[i * 3 + 2] += velocities[i * 3 + 2];
        // Wrap particles around 
         if (position[i * 3 + 1] > 1) position[i * 3 + 1] = -1;
         if (position[i * 3 + 1] < -1) position[i * 3 + 1] = 1;
        }
        particleGeometry.attributes.position.needsUpdate = true;
        renderer.render(scene,camera);
    };
    animate();

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

export function createParticleRiver2(scene, camera, renderer, particleCount, color, size, velocityRange) {
    // Particle material
    const particleMaterial = new THREE.PointsMaterial({ color: color, size: size });
  
    // Particle geometry
    const particleGeometry = new THREE.BufferGeometry();
  
    // Arrays to store particle positions and velocities
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
  
    // particle positions randomly 
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 10; // Random x position within a range
      const y = Math.random() * 2 - 1; // Random y position within a range (-1 to 1)
      const z = Math.random() * 2 - 1; // Random z position within a range (-1 to 1)
  
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
  
      velocities[i * 3] = Math.random() * velocityRange - velocityRange / 2; // Random x velocity
      velocities[i * 3 + 1] = Math.random() * velocityRange - velocityRange / 2; // Random y velocity
      velocities[i * 3 + 2] = Math.random() * velocityRange - velocityRange / 2; // Random z velocity
    }
  
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
    // Particle system
    const particles = new THREE.Points(particleGeometry, particleMaterial);
  
    scene.add(particles);
  
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
  
      // Update particle positions based on velocities
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];
  
        // Wrap particles around when they go out of bounds
        if (positions[i * 3 + 1] > 1) positions[i * 3 + 1] = -1;
        if (positions[i * 3 + 1] < -1) positions[i * 3 + 1] = 1;
      }
  
      particleGeometry.attributes.position.needsUpdate = true; // Update particle positions
  
      renderer.render(scene, camera);
    };
  
    animate();
  }