import *as THREE from 'three'

export function createFlowerParticles(scene, count=1000, radius=1, gap=0.2, tailLength=1){
    const particleGroup = new THREE.Group();
    const petalCount =8; // number of pelats
    const petalSize =0.1; // size of each one 
    for(let i=0;i<count;i++){
        const t=i/count*Math.PI*2;
        const angle = t*petalCount;
        const petalRadius = radius*(1+ 0.2* Math.sin(angle));
        // particle position
        const x= petalRadius *Math.sin(t);
        const y =0.5*petalSize*Math.sin(angle);
        const z= petalRadius *Math.cos(t);
        // create particle
        const particleGeometry = new THREE.BoxGeometry(0.05,0.05,0.05);
        const particleMaterial = new THREE.MeshBasicMaterial({color:0xff0000});
        const particle = new THREE.Mesh(particleGeometry,particleMaterial);
        // gap position 
        particle.position.set(x*(1+gap),y*(1+gap),z*(1+gap));
        particleGroup.add(particle);
        
    }
    //tail
    for (let i=0;i<count*tailLength;i++){
        const t=i /(count*tailLength)*Math.PI*2;
        const x= radius*Math.sin(t);
        const y=0; // center 
        const z = radius*Math.cos(t);
        const tailParticleGeometry = new THREE.BoxGeometry(0.02,0.02,0.02);
        const tailParticleMaterial = new THREE.MeshBasicMaterial({color:0xff0000});
        const tailParticle = new THREE.Mesh(tailParticleGeometry,tailParticleMaterial);
        // tail position 
        tailParticle.position.set(x*(1+gap),y*(1+gap),z*(1+gap));
        particleGroup.add(tailParticle)

    }
    scene.add(particleGroup)
    const stemGeometry = new THREE.CylinderGeometry(0.05,0.05,radius*2,32);
    const stemMaterial = new THREE.MeshBasicMaterial({color:0x00ff00});
    const stem = new THREE.Mesh(stemGeometry,stemMaterial);
    stem.position.setY(-radius);
    scene.add(stem)
    // animate particles 
    let angle=0;
    const speed=0.01; // particle movement
    function animateParticles(){
        angle+=speed;
        particleGroup.children.forEach((particle,index)=>{
            const t= index/count*Math.PI*2;
            const petalRadius=radius*(1+0.2*Math.sin(t*petalCount+angle)); // radius with time animation 
            const x= petalRadius *Math.sin(t);
            const y= 0.5 *petalSize*Math.sin(t*petalCount+angle);
            const z= petalRadius*Math.cos(t);
            particle.position.set(x*(1+gap),y*(1+gap),z*(1+gap))
        });
        requestAnimationFrame(animateParticles);
    } 
    animateParticles();
}
