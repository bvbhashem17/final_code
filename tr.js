import * as THREE from 'three'
import gsap from 'gsap'
export class AnimationFunctions {
    constructor(mesh) {
    }

        createBouncingAnimation(mesh, params = {}) {
            const {
            delay = 1,
            duration = 1,
            x = 0, // Default no movement on x-axis
            y = 2,  // Default bounce height on y-axis
            z = 0, // Default no movement on z-axis
            ease = 'bounce.in.out',
            repetitions = 1
            } = params;
            // Create a GSAP timeline object
            const animation = gsap.timeline({ repeat: repetitions });
        
            // Add animation tweens to the timeline based on user input
            animation
            .to(mesh.position, { duration, delay, y, ease }) // Animate position with bouncing ease
            .to(mesh.position, { duration, y: 0, ease }); // Animate back to original position
        
            // Play the animation
            animation.play();
        }

      halfrotate(mesh, params = {}) {
        const { speed = 0.1, angle = 0, relativePosition = true } = params;
      
        // Validate input parameters (optional)
        // You can add validation logic here to ensure valid values for speed and angle
      
        const radius = mesh.geometry && mesh.geometry.boundingSphere ? mesh.geometry.boundingSphere.radius : 1; // Default radius of 1 if no bounding sphere
      
        // Handle cases where the mesh doesn't have a valid radius
        if (!mesh.geometry || !mesh.geometry.boundingSphere) {
          console.warn('Mesh geometry does not have a bounding sphere. Using default radius:', radius);
        }
      
        const currentRotation = mesh.rotation.y; // Get current rotation (optional)
      
        // Calculate adjusted angle based on speed and current rotation
        
        let adjustedAngle = currentRotation + (speed * performance.now()) / 1000 + angle;
        adjustedAngle = adjustedAngle % (Math.PI * 2);
      
        // Calculate slope based on adjusted angle
        const slope = Math.tan(adjustedAngle);
      
        // Calculate new x and z based on slope and radius
        const newX = radius / Math.sqrt(1 + slope * slope);
        const newZ = slope * newX;
      
        // Set the mesh position (relative or absolute)
        if (relativePosition) {
          mesh.position.set(newX, mesh.position.y, newZ);
        } else {
          // Adjust for absolute positioning based on the mesh's initial position (assuming known)
          mesh.position.set(mesh.position.x + newX, mesh.position.y, mesh.position.z + newZ);
        }
      
        // Update rotation for continuous animation
        mesh.rotation.y += speed;
      }

       rotateAroundZ(object, speed) {
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

       rotateAroundY(object, speed) {
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

       rotateAroundX(object, speed) {
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

       comeback(object, swingAngle, swingSpeed) {
        // Adjust swing angle (larger for wider swing)
        // Adjust swing speed (higher for faster swings)
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

       faraway(object, swingAngle, swingSpeed) {
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
    wallhit(object, swingAngle, swingSpeed) {
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

    bounce(object, swingAngle, swingSpeed) {
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
    

      camera_animation (camera, initialPosition, zoomDistance, zoomSpeed, repeat) {
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
    
    circluar(mesh ,  time , options) { 
        mesh.position.y = Math.sin(time);
        mesh.position.x = Math.cos(time);
        
      }
    movingout(mesh,time,options)
    {
     const   {
            delay = 1,
            duration = 1,
            ease = 'bounce.in.out',
            repetitions = 1
        } = options;
        up = mesh.position.y = Math.tan(time)
        right = mesh.position.x = Math.tan(time)
        zoom_in = mesh.position.x = Math.tan(time)
    }
    disappearing (camera, target = scene.position, options = {}) {
        const clock = new THREE.Clock(); // Create clock instance here (consider creating outside for better performance)
      
        const {
          delay = 1,
          duration = 2,
          ease = 'linear',
          radius = 1, // Radius of camera orbit (optional)
        } = options;
      
        return function updateAnimation() {
          const elapsedTime = clock.getElapsedTime();
      
          if (elapsedTime < delay) return; // Skip if animation hasn't reached delay
      
          const progress = Math.min(elapsedTime / duration, 1); // Clamped progress
      
          // Ease function simulation (consider using a library like Easing.js for more options)
          const easedProgress = THREE.EasingFunctions[ease](progress);
      
          // Calculate angles based on progress and radius (optional)
          const angle = Math.PI * 2 * easedProgress;
          const offsetX = Math.sin(angle) * radius;
          const offsetY = Math.cos(angle) * radius;
      
          // Update camera position based on target and offset
          camera.position.set(target.x + offsetX, target.y + offsetY, target.z);
      
          // Update camera lookAt target (optional)
          camera.lookAt(target);
      
          renderer.render(scene, camera);
        };
      }

}