import *as THREE from "three"

export function createFireworks(scene, color, count=200, speed=0.05, spread= 4, oscillationRange=1){
    const explosions=[];
    // update explosion 
    function updateExplosions(){
        explosions.forEach((explosion,index)=>{
            const particles =explosion.particles;
            const positions = particles.geometry.attributes.position.array;
            const initialYPositions = explosion.initialYPositions;
            for(let i=0; i<positions.length;i+=3){
                const index=i/3;
                const initialY = initialYPositions[index];
                positions[i+1] +=speed // move particles upword 
                positions[i+1] = initialY+Math.sin(Date.now()*0.005)*oscillationRange; // osclate up down 
            }
            particles.geometry.attributes.position.needsUpdate =true;
            if (particles.material.opacity <= 0){
                scene.remove(particles);
                explosions.splice(index,1);
            } else{
                particles.material.opacity -=0.001; // fade out particles 

            }

        });
    }
    // generate explosion 
    function generateExplosion(){
        const position = new THREE.Vector3((Math.random()-0.5)*20,(Math.random()-0.5)*10,-5);
        const particles = new THREE.BufferGeometry();
        const particleMaterial =new THREE.PointsMaterial({
            size:0.1,
            blending:THREE.AdditiveBlending,
            transparent:true,
            opacity:1,
            vertexColors:true //enable vertex color 
        });
        const positionsArray = new Float32Array(count *3);
        const colorsArray = new Float32Array(count*3);
        const initialYPositions =[];
        for (let i=0; i<count;i++){
            const theta = Math.random()*Math.PI*2; //random angle 
            const phi = Math.random()*Math.PI; // random vertical angle 
            const radius = Math.random()*spread; // random distance from center 
            const x = position.x +radius*Math.sin(phi)*Math.cos(theta);
            const y= position.y +radius *Math.cos(phi);
            const z= position.z +radius *Math.sin(phi)*Math.cos(theta);
            positionsArray [i*3]=x;
            positionsArray [i*3+1]=y;
            positionsArray [i*3+2]=z;
            //random color foreach particles 
            const color = new THREE.Color(Math.random(),Math.random(),Math.random());
            colorsArray [i*3]=color.r;
            colorsArray [i*3+1]= color.g;
            colorsArray [i*3+2] =color.b
            initialYPositions.push(y);
        }
        particles.setAttribute('position',new THREE.BufferAttribute(positionsArray,3))
        particles.setAttribute('color',new THREE.BufferAttribute(colorsArray,3))
        const particleSystem =new THREE.Points(particles,particleMaterial)
        scene.add(particleSystem);
        explosions.push({
            particles:particleSystem,
            initialYPositions:initialYPositions
        });
    }
    //animate 
    function animate(){
        updateExplosions();
        //generate 
        if (Math.random()<0.01){
            generateExplosion();
        }
        requestAnimationFrame(animate);
    }
    animate();
}
