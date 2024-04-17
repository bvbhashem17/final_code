import * as THREE from "three"

export function generateMagicCarpet(scene, width=20, length=40, particleMaterial){
    const particles =[];
    const particleSize=0.1; // particle size 
    // grid of particles that form the shape 
    for (let i=0; i<width; i++){
        for (let j=0; j<length; j++){
            const x = i-width/2;
            const y=0; // height of the carpet 
            const z= j-length/2;
            const particleGeometry = new THREE.BufferGeometry();
            particleGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([x,y,z]),3));
            const particle = new THREE.Points(particleGeometry,particleMaterial.clone());
            particles.push(particle);
            scene.add(particle)

        }
    }

    // animation function for the movement 
    function updateParticles(){
        const time = Date.now()*0.001; // time bsed animation
        particles.forEach(particle =>{
            particle.position.y = Math.sin(time + particle.position.x * 0.5)*0.5 // oscaillation speed 

        });

    }
    return updateParticles;
}


/////////////////////////////////////////////////////////////////////////////////

export function generateSwimingParticles(scene, width=20, length=40, particleMaterial){
    const particles =[];
    const particleSize=0.05;
    const swimmingSpeed = 0.05;// swimming speed 
    for(let i=0; i<width; i++){
        for (let j=0; j<length;j++){
            const x = i-width/2;
            const y= 0.1* Math.sin(i*0.1) + Math.random()*0.1 // variation in height 
            const z= j-length/2;
            const particleGeometry = new THREE.BufferGeometry();
            particleGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([x,y,z]),3));

            const sizeVariation = Math.random()* 0.5+ 0.5; // random size 
            const colorVariation = new THREE.Color(Math.random(),Math.random(),Math.random());// random color
            const particleMaterialClone = particleMaterial.clone(); 
            particleMaterialClone.size=particleSize *sizeVariation;// apply size variation
            particleMaterialClone.color=colorVariation; // apply color variation 

            const particle =new THREE.Points(particleGeometry,particleMaterialClone);
            particles.push({
                particle:particle,
                offsetX: Math.random()*Math.PI*2,
                offsetY: Math.random()*Math.PI*2,
                offsetz: Math.random()*Math.PI*2
            });
            scene.add(particle);
        }
    }
    // animation function 
    function updateParticles(){
        const time = Date.now()*0.001; // time bsed animation
        particles.forEach(particleData =>{
            const particle = particleData.particle;
            // update particle position 
            particle.position.x += Math.sin(time + particleData.offsetX)*swimmingSpeed;
            particle.position.y += Math.sin(time + particleData.offsetY)*swimmingSpeed;
            particle.position.z += Math.sin(time + particleData.offsetz)*swimmingSpeed;
            // reset the position if particle moves 
            if ( particle.position.x > width/2 ||  particle.position.x <-width/2 ||
            particle.position.z>length/2 ||  particle.position.z < -length/2){
                particle.position.x = Math.random()* width-width/2;
                particle.position.z = Math.random()* length-length/2;
            }
        });

    }
    return updateParticles;

}


////////////////////////////////////////////////////////////////////////////////////////////

export function generateMagicCarpet2(scene, width=20, length=40, particleMaterial){
    const particles =[];
    const particleSize=0.05;
    const swimmingSpeed = 0.05;// swimming speed 
    for(let i=0; i<width; i++){
        for (let j=0; j<length;j++){
            const x = i-width/2;
            const y= 0.1* Math.sin(i*0.1) + Math.random()*0.1 // variation in height 
            const z= j-length/2;
            const particleGeometry = new THREE.BufferGeometry();
            particleGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([x,y,z]),3));
            const sizeVariation = Math.random()* 0.5+ 0.5; // random size 
            const colorVariation = new THREE.Color(Math.random(),Math.random(),Math.random());// random color
            const particleMaterialClone = particleMaterial.clone(); 
            particleMaterialClone.size=particleSize *sizeVariation;// apply size variation
            particleMaterialClone.color=colorVariation; // apply color variation 

            const particle =new THREE.Points(particleGeometry,particleMaterialClone);
            particles.push(particle);
            scene.add(particle);
        }
    }
    // animate function 
    function updateParticles(){
        const time = Date.now()*0.001; // time bsed animation
        // direction of swiming 
        const dx = Math.sin(time)*swimmingSpeed;
        const dz = Math.cos(time)*swimmingSpeed;
        // move the entire carpet 
        particles.forEach(particel =>{
            particel.position.x +=dx;
            particel.position.z +=dz;
            if (particel.position.x >width/2) particel.position.x -=width;
            if(particel.position.x <-width/2) particel.position.x +=width;
            if(particel.position.z >length/2) particel.position.z -=length;
            if(particel.position.z <-length/2) particel.position.z +=length;

        });
    }
    return updateParticles;
}
