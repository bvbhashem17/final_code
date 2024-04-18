import * as THREE from 'three'
import gsap from 'gsap'
import {Animator} from "./class_animation"
import {animation} from "./animation"
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Base
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
const clock = new THREE.Clock()
const elapsedtime = clock.getElapsedTime()
/**
 * Animate
 */
/* jump over and bounce 
function bouncingAnimation(mesh, repetitions ) {
    // Create a GSAP timeline object
    const animation = gsap.timeline({ repeat: repetitions });
  
    // Add animation tweens to the timeline
    
    animation
    .to(mesh.position, { duration: 1, delay: 1, y: 2, ease: "bounce.in" })
    .to(mesh.position, { duration: 1, delay: 1, y: 0, ease: "bounce.out" })
  
    // Play the animation
    animation.play();
  }
 
  function arounditself(mesh, speed, angle) {
    const radius = mesh.geometry.boundingSphere.radius;
    const currentRotation = mesh.rotation.y; // Get current rotation (optional)
  
    // Calculate slope based on angle
    let adjustedAngle = currentRotation + angle;
    adjustedAngle = adjustedAngle % (Math.PI * 2)
    const slope = Math.tan(adjustedAngle);
    // Calculate new x and z based on slope and radius
    const newX = radius / Math.sqrt(1 + slope * slope);
    const newZ = slope * newX;
  
    // Set the mesh position (relative to center)
    //mesh.position.set(newX, mesh.position.y, newZ);
  
    // Update rotation for continuous animation (optional)
    mesh.rotation.y += speed;
  }
  
  function rotateAroundZ(object, speed) {
    let previousTime = 0; // Store timestamp from previous frame
  
    function updateRotation(timestamp) {
      // Calculate elapsed time since last frame (in seconds)
      const elapsedTime = (timestamp - previousTime) / 1000;
  
      // Update previous time for next frame
      previousTime = timestamp;
  
      // Calculate rotation angle based on elapsed time and speed
      const rotationAngle = elapsedTime * speed;
  
      // Update object's rotation around Z-axis
      object.rotation.z = rotationAngle;
  
      // Schedule next animation frame using requestAnimationFrame
      requestAnimationFrame(updateRotation);
    }
  
    // Start the animation loop
    requestAnimationFrame(updateRotation);
  }
  
  function rotateAroundY(object, speed) {
    let previousTime = 0; // Store timestamp from previous frame
  
    function updateRotation(timestamp) {
      // Calculate elapsed time since last frame (in seconds)
      const elapsedTime = (timestamp - previousTime) / 1000;
  
      // Update previous time for next frame
      previousTime = timestamp;
  
      // Calculate rotation angle based on elapsed time and speed
      const rotationAngle = elapsedTime * speed;
  
      // Update object's rotation around Y-axis
      object.rotation.y = rotationAngle;
  
      // Schedule next animation frame using requestAnimationFrame
      requestAnimationFrame(updateRotation);
    }
  
    // Start the animation loop
    requestAnimationFrame(updateRotation);
  }

function rotateAroundX(object, speed) {
    let previousTime = 0; // Store timestamp from previous frame
  
    function updateRotation(timestamp) {
      // Calculate elapsed time since last frame (in seconds)
      const elapsedTime = (timestamp - previousTime) / 1000;
  
      // Update previous time for next frame
      previousTime = timestamp;
  
      // Calculate rotation angle based on elapsed time and speed
      const rotationAngle = elapsedTime * speed;
  
      // Update object's rotation around X-axis
      object.rotation.x = rotationAngle;
  
      // Schedule next animation frame using requestAnimationFrame
      requestAnimationFrame(updateRotation);
    }
  
    // Start the animation loop
    requestAnimationFrame(updateRotation);
  }


function comeback(object, swingAngle, swingSpeed) {
  let previousTime = 0; // Store timestamp from previous frame
  let swingPhase = 0; // Current swing phase (0 to PI)


  function updateSwing(timestamp) {
    // Calculate elapsed time since last frame (in seconds)
    const elapsedTime = (timestamp - previousTime) / 1000;

    // Update previous time for next frame
    previousTime = timestamp;

    // Update swing phase based on elapsed time and swing speed
    swingPhase += swingSpeed * elapsedTime;

    // Wrap swing phase within 0 to PI range
    swingPhase = swingPhase % Math.PI;

    // Calculate swing offset based on tan and swing angle
    const swingOffset = Math.tan(swingPhase) * swingAngle;

    // Apply swing offset to object's position (adjust based on your object's setup)
    object.position.y = swingOffset; // You might need to adjust this based on your object's initial position and desired swing axis

    // Schedule next animation frame using requestAnimationFrame
    requestAnimationFrame(updateSwing);
  }

  // Start the animation loop
  requestAnimationFrame(updateSwing);
}

function faraway(object, swingAngle, swingSpeed) {
    // Adjust swing angle (larger for wider swing)
    // // Adjust swing speed (higher for faster swings)
    let previousTime = 0; // Store timestamp from previous frame
    let swingPhase = 0; // Current swing phase (0 to PI)
  
  
    function updateSwing(timestamp) {
      // Calculate elapsed time since last frame (in seconds)
      const elapsedTime = (timestamp - previousTime) / 1000;
  
      // Update previous time for next frame
      previousTime = timestamp;
  
      // Update swing phase based on elapsed time and swing speed
      swingPhase += swingSpeed * elapsedTime;
  
      // Wrap swing phase within 0 to PI range
      swingPhase = swingPhase % Math.PI;
  
      // Calculate swing offset based on tan and swing angle
      const swingOffset = Math.sin(swingPhase) * swingAngle;
  
      // Apply swing offset to object's position (adjust based on your object's setup)
      object.position.z = swingOffset; // You might need to adjust this based on your object's initial position and desired swing axis
  
      // Schedule next animation frame using requestAnimationFrame
      requestAnimationFrame(updateSwing);
    }
  
    // Start the animation loop
    requestAnimationFrame(updateSwing);
  }
  
  function wallhit(object, swingAngle, swingSpeed) {
    // Adjust swing angle (larger for wider swing)
    // // Adjust swing speed (higher for faster swings)
    let previousTime = 0; // Store timestamp from previous frame
    let swingPhase = 0; // Current swing phase (0 to PI)
  
  
    function updateSwing(timestamp) {
      // Calculate elapsed time since last frame (in seconds)
      const elapsedTime = (timestamp - previousTime) / 1000;
  
      // Update previous time for next frame
      previousTime = timestamp;
  
      // Update swing phase based on elapsed time and swing speed
      swingPhase += swingSpeed * elapsedTime;
  
      // Wrap swing phase within 0 to PI range
      swingPhase = swingPhase % Math.PI;
  
      // Calculate swing offset based on tan and swing angle
      const swingOffset = Math.sin(swingPhase) * swingAngle;
  
      // Apply swing offset to object's position (adjust based on your object's setup)
      object.position.x = swingOffset; // You might need to adjust this based on your object's initial position and desired swing axis
  
      // Schedule next animation frame using requestAnimationFrame
      requestAnimationFrame(updateSwing);
    }
  
    // Start the animation loop
    requestAnimationFrame(updateSwing);
  }
  
  function bounce(object, swingAngle, swingSpeed) {
    // Adjust swing angle (larger for wider swing)
    // // Adjust swing speed (higher for faster swings)
    let previousTime = 0; // Store timestamp from previous frame
    let swingPhase = 0; // Current swing phase (0 to PI)
  
  
    function updateSwing(timestamp) {
      // Calculate elapsed time since last frame (in seconds)
      const elapsedTime = (timestamp - previousTime) / 1000;
  
      // Update previous time for next frame
      previousTime = timestamp;
  
      // Update swing phase based on elapsed time and swing speed
      swingPhase += swingSpeed * elapsedTime;
  
      // Wrap swing phase within 0 to PI range
      swingPhase = swingPhase % Math.PI;
  
      // Calculate swing offset based on tan and swing angle
      const swingOffset = Math.sin(swingPhase) * swingAngle;
  
      // Apply swing offset to object's position (adjust based on your object's setup)
      object.position.y = swingOffset; // You might need to adjust this based on your object's initial position and desired swing axis
  
      // Schedule next animation frame using requestAnimationFrame
      requestAnimationFrame(updateSwing);
    }
  
    // Start the animation loop
    requestAnimationFrame(updateSwing);
  }
  function animateCameraZoom(camera, initialPosition, zoomDistance, zoomSpeed, repeat) {
    // Repeat indefinitely (set to 1 for one-time zoom)
    // Distance to move camera on Z-axis
    // Adjust zoom speed
    //const initialPosition = camera.position.clone(); // Store initial camera position
    let zoomPhase = 0; // Track zoom phase (0 to 1)
  
    function updateZoom(timestamp) {
      // Calculate elapsed time since last frame (in seconds)
      const elapsedTime = (timestamp - previousTime) / 1000;
      previousTime = timestamp;
  
      // Update zoom phase based on elapsed time and zoom speed
      zoomPhase += zoomSpeed * elapsedTime;
  
      // Wrap zoom phase within 0 to 1 range
      zoomPhase = zoomPhase % 1;
  
      // Calculate zoom offset based on zoom phase and zoom distance
      const zoomOffset = zoomPhase * zoomDistance;
  
      // Apply zoom offset to camera's z position
      camera.position.z = initialPosition.z - zoomOffset;
  
      // Schedule next animation frame using requestAnimationFrame
      requestAnimationFrame(updateZoom);
    }
  
    // Initial timestamp for time calculation
    let previousTime = 0;
  
    // Start the animation loop
    requestAnimationFrame(updateZoom);
  
    // Optional: Return the timeline object for potential control (play/pause)
    const timeline = gsap.timeline({
      repeat: repeat, // Control repetition (set to 1 for one-time zoom)
      ease: 'power3.inout' // Smooth zoom in and out
    })
    .to(camera.position, {
      duration: zoomSpeed, // Adjust duration for zoom speed
      z: initialPosition.z - zoomDistance, // Move camera faraway on Z-axis
    })
    .to(camera.position, {
      duration: zoomSpeed, // Adjust duration for zoom speed
      z: initialPosition.z, // Return camera to initial position
    });
  
    return timeline; // Uncomment this line to return the timeline object
  }
  
  const scaleAnimation = new rotateObject(mesh, {
    x: 1, // Scale on X-axis to double the size
    y: 1.5, // Scale on Y-axis by 1.5 times
    z: 0.75, // Scale on Z-axis to 0.75 times the size
    repeat: 2, // Repeat the animation twice
    delay: 1, // Start the animation after 1 second delay
    onComplete: () => console.log("Scaling animation completed"), // Optional callback function
  });*/

  //usage of rotation 

  /*
  const rotationControls = rotateObject(mesh, { y: 45 }); // Example with degrees

  // Increase speed on X and Y axes after 2 seconds
  setTimeout(() => {
    rotationControls.setSpeed({ y: 0.03 });
  }, 2000);
  */
   //usage of scale 

  //scale(mesh, { x: 2, y: 1.5, z: 0.75 });


  const animation1 = new animation(mesh);
  animation1.addanimation('Scale', { x: 2, y: 1.1, z: 1 }, 2000);




const tick = () =>
{
    // Render
    renderer.render(scene, camera)
    
    //const angle = performance.now() / 1000 * 0.2
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()