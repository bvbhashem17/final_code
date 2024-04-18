
import * as THREE from 'three'
import gsap from 'gsap'

class Animation {
    constructor(object) {
      this.object = object; // The object to animate
      this.isPlaying = false; // Flag for animation state
      this.repeat = 1; // Default repetition count (one time)
      this.onComplete = null; // Callback function for animation completion
      this.duration = null; // Optional duration for timed animation (in seconds)
      this.delay = 0; // Optional delay before starting the animation (in seconds)
      this.easingFunction = null; // Optional easing function
    }
  
  
    start() {
      if (!this.isPlaying) {
        this.isPlaying = true;
        this.animate();
      }
    }
  
    stop() {
      this.isPlaying = false;
    }
  
    setRepeat(count) {
      this.repeat = count;
    }
  
    setOnComplete(callback) {
      this.onComplete = callback;
    }
  
    // Abstract method to be implemented by child classes
    animate() {
      throw new Error('Abstract method animate() must be implemented by child classes');
    }
  }
  class Scale extends Animation {
    constructor(object, options) {
      super(object);
      this.options = options || {}; // User-defined options (optional)
    }
  
    animate() {
      if (!this.isPlaying) return;
  
      // Apply scaling based on options (adjust as needed)
      if (this.options.x) this.object.scale.x = this.options.x;
      if (this.options.y) this.object.scale.y = this.options.y;
      if (this.options.z) this.object.scale.z = this.options.z;
  
      // Implement repetition logic using requestAnimationFrame
      if (--this.repeat > 0) {
        requestAnimationFrame(() => this.animate());
      } else if (this.onComplete) {
        this.onComplete();
      }
    }
  }
  
  class Position extends Animation {
    constructor(object, options) {
      super(object);
      this.options = options || {}; // User-defined options (optional)
    }
  
    animate() {
      if (!this.isPlaying) return;
  
      // Apply position changes based on options (adjust as needed)
      if (this.options.x) this.object.position.x = this.options.x;
      if (this.options.y) this.object.position.y = this.options.y;
      if (this.options.z) this.object.position.z = this.options.z;
  
      // Implement repetition logic using requestAnimationFrame
      if (--this.repeat > 0) {
        requestAnimationFrame(() => this.animate());
      } else if (this.onComplete) {
        this.onComplete();
      }
    }
  }
  class Rotation extends Animation {
    constructor(object, options) {
      super(object);
      this.options = options || {}; // User-defined options (optional)
    }
  
    animate() {
      if (!this.isPlaying) return;


    // Apply easing function if available
    const easeFactor = this.easingFunction ? this.easingFunction(elapsedTime) : elapsedTime;

  
      // Apply rotation changes based on options (adjust as needed)
      if (this.options.x) this.object.rotation.x += this.options.x;
      if (this.options.y) this.object.rotation.y += this.options.y;
      if (this.options.z) this.object.rotation.z += this.options.z;
  
      // Implement repetition logic using requestAnimationFrame
      if (--this.repeat > 0) {
        requestAnimationFrame(() => this.animate());
      } else if (this.onComplete) {
        this.onComplete();
      }
    }
  }
  class Quaternion extends Animation {
    constructor(object, options) {
      super(object);
      this.options = options || {}; // User-defined options (optional)
      this.targetQuaternion = null; // Stores the target quaternion for animation
    }
  
    setTargetQuaternion(quaternion) {
      this.targetQuaternion = quaternion.clone(); // Clone to avoid modifying the original
    }
  
    animate() {
      if (!this.isPlaying || !this.targetQuaternion) return;
  
      const currentQuaternion = this.object.quaternion.clone(); // Clone current quaternion
      const lerpAmount = 0.1; // Adjust for desired animation speed (0 to 1)
  
      // Perform linear interpolation (SLERP) towards target quaternion
      const newQuaternion = THREE.Quaternion.slerp(currentQuaternion, this.targetQuaternion, lerpAmount);
      this.object.quaternion.copy(newQuaternion);
  
      // Implement repetition logic using requestAnimationFrame
      if (--this.repeat > 0) {
        requestAnimationFrame(() => this.animate());
      } else if (this.onComplete) {
        this.onComplete();
      }
    }
  }
  export class RotateAroundY extends Animation {
    constructor(object, options) {
      super(object);
      this.options = options || {}; // Optional options (can include speed)
      this.speed = this.options.speed || 1; // Default speed (rotations per second)
      this.previousTime = 0; // Store timestamp from previous frame
    }
  
    animate() {
      if (!this.isPlaying) return;
  
      const timestamp = Date.now(); // Get current timestamp
  
      // Calculate elapsed time since last frame (in seconds)
      const elapsedTime = (timestamp - this.previousTime) / 1000;
  
      // Update previous time for next frame
      this.previousTime = timestamp;
  
      // Calculate rotation angle based on elapsed time and speed
      const rotationAngle = elapsedTime * this.speed;
  
      // Update object's rotation around Y-axis
      this.object.rotation.y = rotationAngle;
  
      // Implement repetition logic using requestAnimationFrame
      if (--this.repeat > 0 || !this.duration) { // Handle timed and infinite animations
        requestAnimationFrame(() => this.animate());
      } else if (this.onComplete) {
        this.onComplete();
      }
    }
  }
  class CameraZoom extends Animation {
    constructor(camera, options) {
      super(camera); // Pass camera as the object to animate
      this.options = options || {}; // Optional options
      this.initialPosition = camera.position.clone(); // Store initial camera position
      this.zoomDistance = this.options.zoomDistance || 5; // Default zoom distance
      this.zoomSpeed = this.options.zoomSpeed || 1; // Default zoom speed
    }
  
    animate() {
      if (!this.isPlaying) return;
  
      const timestamp = Date.now();
  
      // Calculate elapsed time since last frame (in seconds)
      const elapsedTime = (timestamp - this.previousTime) / 1000;
      this.previousTime = timestamp;
  
      // Update zoom phase based on elapsed time and zoom speed
      this.zoomPhase += this.zoomSpeed * elapsedTime;
  
      // Wrap zoom phase within 0 to 1 range
      this.zoomPhase = this.zoomPhase % 1;
  
      // Calculate zoom offset based on zoom phase and zoom distance
      const zoomOffset = this.zoomPhase * this.zoomDistance;
  
      // Apply zoom offset to camera's z position
      this.object.position.z = this.initialPosition.z - zoomOffset;
  
      // Implement repetition logic using requestAnimationFrame
      if (--this.repeat > 0 || !this.duration) { // Handle timed and infinite animations
        requestAnimationFrame(() => this.animate());
      } else if (this.onComplete) {
        this.onComplete();
      }
    }
  }
  class Swing extends Animation {
    constructor(object, options) {
      super(object);
      this.options = options || {}; // Optional options
      this.swingAngle = this.options.swingAngle || Math.PI / 4; // Default swing angle (radians)
      this.swingSpeed = this.options.swingSpeed || 1; // Default swing speed
      this.previousTime = 0; // Store timestamp from previous frame
    }
  
    animate() {
      if (!this.isPlaying) return;
  
      const timestamp = Date.now();
  
      // Calculate elapsed time since last frame (in seconds)
      const elapsedTime = (timestamp - this.previousTime) / 1000;
      this.previousTime = timestamp;
  
      // Update swing phase based on elapsed time and swing speed
      this.swingPhase += this.swingSpeed * elapsedTime;
  
      // Wrap swing phase within 0 to PI range
      this.swingPhase = this.swingPhase % Math.PI;
  
      // Calculate swing offset based on sin and swing angle
      const swingOffset = Math.sin(this.swingPhase) * this.swingAngle;
  
      // Apply swing offset to object's position (adjust based on your object's setup)
      this.object.position.y = swingOffset + (this.options.offset || 0); // Add optional offset
  
      // Implement repetition logic using requestAnimationFrame
      if (--this.repeat > 0 || !this.duration) { // Handle timed and infinite animations
        requestAnimationFrame(() => this.animate());
      } else if (this.onComplete) {
        this.onComplete();
      }
    }
  }
  class Faraway extends Animation {
    constructor(object, options) {
      super(object); // Pass object to the Animation base class
      this.options = options || {}; // Optional options
      this.swingAngle = this.options.swingAngle || Math.PI / 2; // Default swing angle (180 degrees)
      this.swingSpeed = this.options.swingSpeed || 1; // Default swing speed
      this.previousTime = 0; // Store timestamp from previous frame
    }
  
    animate() {
      if (!this.isPlaying) return;
  
      const timestamp = Date.now();
  
      // Calculate elapsed time since last frame (in seconds)
      const elapsedTime = (timestamp - this.previousTime) / 1000;
      this.previousTime = timestamp;
  
      // Update swing phase based on elapsed time and swing speed
      this.swingPhase += this.swingSpeed * elapsedTime;
  
      // Wrap swing phase within 0 to PI range
      this.swingPhase = this.swingPhase % Math.PI;
  
      // Calculate swing offset based on sin and swing angle
      const swingOffset = Math.sin(this.swingPhase) * this.swingAngle;
  
      // Apply swing offset to object's position on Z-axis (adjust for your object)
      this.object.position.z = swingOffset;
  
      // Implement repetition logic using requestAnimationFrame
      if (--this.repeat > 0 || !this.duration) { // Handle timed and infinite animations
        requestAnimationFrame(() => this.animate());
      } else if (this.onComplete) {
        this.onComplete();
      }
    }
  }
  class Comeback extends Animation {
    constructor(object, options) {
      super(object); // Pass object to the Animation base class
      this.options = options || {}; // Optional options
      this.swingAngle = this.options.swingAngle || Math.PI / 4; // Default swing angle (45 degrees)
      this.swingSpeed = this.options.swingSpeed || 1; // Default swing speed
      this.previousTime = 0; // Store timestamp from previous frame
    }
  
    animate() {
      if (!this.isPlaying) return;
  
      const timestamp = Date.now();
  
      // Calculate elapsed time since last frame (in seconds)
      const elapsedTime = (timestamp - this.previousTime) / 1000;
      this.previousTime = timestamp;
  
      // Update swing phase based on elapsed time and swing speed
      this.swingPhase += this.swingSpeed * elapsedTime;
  
      // Wrap swing phase within 0 to PI range
      this.swingPhase = this.swingPhase % Math.PI;
  
      // Calculate swing offset based on tan and swing angle (adjusted for comeback effect)
      const swingOffset = -Math.tan(swingPhase) * this.swingAngle; // Use negative tangent for "comeback" motion
  
      // Apply swing offset to object's position on Y-axis (adjust for your object)
      this.object.position.y = swingOffset;
  
      // Implement repetition logic using requestAnimationFrame
      if (--this.repeat > 0 || !this.duration) { // Handle timed and infinite animations
        requestAnimationFrame(() => this.animate());
      } else if (this.onComplete) {
        this.onComplete();
      }
    }
  }
  class RotateAroundX extends Animation {
    constructor(object, options) {
      super(object); // Pass object to the Animation base class
      this.options = options || {}; // Optional options
      this.speed = this.options.speed || 1; // Default rotation speed (rotations per second)
      this.previousTime = 0; // Store timestamp from previous frame
    }
  
    animate() {
      if (!this.isPlaying) return;
  
      const timestamp = Date.now();
  
      // Calculate elapsed time since last frame (in seconds)
      const elapsedTime = (timestamp - this.previousTime) / 1000;
      this.previousTime = timestamp;
  
      // Calculate rotation angle based on elapsed time and speed
      const rotationAngle = elapsedTime * this.speed;
  
      // Update object's rotation around X-axis
      object.rotation.x += rotationAngle; // Use addition for continuous rotation
  
      // Implement repetition logic using requestAnimationFrame
      if (--this.repeat > 0 || !this.duration) { // Handle timed and infinite animations
        requestAnimationFrame(() => this.animate());
      } else if (this.onComplete) {
        this.onComplete();
      }
    }
  }
  class RotateAroundY extends Animation {
    constructor(object, options) {
      super(object); // Pass object to the Animation base class
      this.options = options || {}; // Optional options
      this.speed = this.options.speed || 1; // Default rotation speed (rotations per second)
      this.previousTime = 0; // Store timestamp from previous frame
    }
  
    animate() {
      if (!this.isPlaying) return;
  
      const timestamp = Date.now();
  
      // Calculate elapsed time since last frame (in seconds)
      const elapsedTime = (timestamp - this.previousTime) / 1000;
      this.previousTime = timestamp;
  
      // Calculate rotation angle based on elapsed time and speed
      const rotationAngle = elapsedTime * this.speed;
  
      // Update object's rotation around Y-axis
      object.rotation.y += rotationAngle; // Use addition for continuous rotation
  
      // Implement repetition logic using requestAnimationFrame
      if (--this.repeat > 0 || !this.duration) { // Handle timed and infinite animations
        requestAnimationFrame(() => this.animate());
      } else if (this.onComplete) {
        this.onComplete();
      }
    }
  }

  
  
      