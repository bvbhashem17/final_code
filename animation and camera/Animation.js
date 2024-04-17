class Animation {
    constructor(objectOrObjects, options = {}) {
      this.objects = Array.isArray(objectOrObjects) ? objectOrObjects : [objectOrObjects]; // Convert to array if needed
      this.isActive = false;
      this.startTime = null;
      this.duration = options.duration || 1000; // Default duration in milliseconds
      this.delay = options.delay || 0; // Default delay in milliseconds
      this.easing = options.easing || THREE.MathUtils.Easing.Linear; // Default easing function
      this.cachedValues = {}; // Stores initial values for animation
    }
  
    play() {
      if (!this.isActive) {
        this.isActive = true;
        this.startTime = null;
        this.cacheValues();
        this.animate();
      }
    }
  
    pause() {
      if (this.isActive) {
        this.isActive = false;
      }
    }
  
    resume() {
      if (!this.isActive) {
        this.isActive = true;
        this.startTime = performance.now() - (this.elapsedTime || 0);
        this.animate();
      }
    }
  
    setDuration(duration) {
      this.duration = duration;
    }
  
    setDelay(delay) {
      this.delay = delay;
    }
  
    setEasing(easing) {
      this.easing = easing;
    }
  
    cacheValues() {
      // Override this in child classes to store initial values for specific properties
    }
  
    updateValues(progress) {
      // Override this in child classes to update specific properties based on progress
    }
  
    animate() {
      if (!this.isActive) return;
  
      const currentTime = performance.now();
      const elapsedTime = currentTime - (this.startTime || currentTime - this.delay);
  
      if (elapsedTime >= this.duration) {
        this.isActive = false;
        this.updateValues(1); // Apply final values
        return;
      }
  
      const progress = this.easing(elapsedTime / this.duration);
      for (const obj of this.objects) {
        this.updateValues(progress, obj); // Call updateValues for each object
      }
  
      this.startTime = currentTime;
      requestAnimationFrame(this.animate.bind(this));
    }
  }  
  class RotationAnimation extends Animation {
    constructor(obj, options) {
      super(obj);
      this.initialRotation = { x: obj.rotation.x, y: obj.rotation.y, z: obj.rotation.z };
      this.targetRotation = options.rotation || this.initialRotation;
    }
  
    cacheValues() {
      super.cacheValues();
      this.cachedValues.rotation = this.initialRotation;
    }
  
    updateValues(progress) {
      const lerpedRotation = {
        x: THREE.MathUtils.lerp(this.cachedValues.rotation.x, this.targetRotation.x, progress),
        y: THREE.MathUtils.lerp(this.cachedValues.rotation.y, this.targetRotation.y, progress),
        z: THREE.MathUtils.lerp(this.cachedValues.rotation.z, this.targetRotation.z, progress),
      };
      this.obj.rotation.set(lerpedRotation.x, lerpedRotation.y, lerpedRotation.z);
    }
  }
  
  class ScaleAnimation extends Animation {
    constructor(obj, options) {
      super(obj);
      this.initialScale = { x: obj.scale.x, y: obj.scale.y, z: obj.scale.z };
      this.targetScale = options.scale || this.initialScale;
    }
  
    cacheValues() {
      super.cacheValues();
      this.cachedValues.scale = this.initialScale;
    }
  
    updateValues(progress) {
      const lerpedScale = {
        x: THREE.MathUtils.lerp(this.cachedValues.scale.x, this.targetScale.x, progress),
        y: THREE.MathUtils.lerp(this.cachedValues.scale.y, this.targetScale.y, progress),
        z: THREE.MathUtils.lerp(this.cachedValues.scale.z, this.targetScale.z, progress),
      };
      this.obj.scale.set(lerpedScale.x, lerpedScale.y, lerpedScale.z);
    }
  }
  
  class PositionAnimation extends Animation {
    constructor(obj, options) {
      super(obj);
      this.initialPosition = { x: obj.position.x, y: obj.position.y, z: obj.position.z };
      this.targetPosition = options.position || this.initialPosition; // Set default to initial position
    }
  
    cacheValues() {
      super.cacheValues();
      this.cachedValues.position = this.initialPosition;
    }
  
    updateValues(progress) {
      const lerpedPosition = {
        x: THREE.MathUtils.lerp(this.cachedValues.position.x, this.targetPosition.x, progress),
        y: THREE.MathUtils.lerp(this.cachedValues.position.y, this.targetPosition.y, progress),
        z: THREE.MathUtils.lerp(this.cachedValues.position.z, this.targetPosition.z, progress),
      };
      this.obj.position.set(lerpedPosition.x, lerpedPosition.y, lerpedPosition.z);
    }
  }
  class BouncingBallAnimation extends PositionAnimation {
    constructor(obj, options) {
      super(obj);
      this.initialPosition = { x: obj.position.x, y: obj.position.y, z: obj.position.z };
      this.targetPosition = options.position || this.initialPosition;
      this.bounceHeight = options.bounceHeight || 1; // Default bounce height
      this.gravity = options.gravity || -9.81; // Default gravity
      this.velocity = 0; // Initial vertical velocity
    }
  
    updateValues(progress) {
      const lerpedPosition = super.updateValues(progress); // Call parent updateValues
  
      // Simulate bouncing using basic physics equations
      this.velocity += this.gravity * progress;
      lerpedPosition.y += this.velocity * progress;
  
      // Check for ground collision and bounce back
      if (lerpedPosition.y <= this.initialPosition.y) {
        lerpedPosition.y = this.initialPosition.y;
        this.velocity = -Math.abs(this.velocity) * options.bounceFactor || 0.8; // Default bounce factor
      }
  
      this.obj.position.set(lerpedPosition.x, lerpedPosition.y, lerpedPosition.z);
    }
  }
  class RollingAnimation extends Animation {
    constructor(obj, options) {
      super(obj);
      this.center = options.center || { x: 0, y: 0, z: 0 }; // Default center point
      this.radius = options.radius || 0.5; // Default radius
      this.rotationAxis = options.rotationAxis || new THREE.Vector3(0, 1, 0); // Default rotation axis (y-axis)
      this.initialRotation = obj.rotation.clone(); // Clone initial object rotation
      this.totalAngle = options.totalAngle || Math.PI * 2; // Default total rotation angle (full circle)
    }
  
    cacheValues() {
      super.cacheValues();
      this.cachedValues.initialRotation = this.initialRotation.clone();
    }
  
    updateValues(progress) {
      const angle = this.totalAngle * progress;
      const rotation = this.cachedValues.initialRotation.clone();
      rotation.x += angle * this.rotationAxis.x;
      rotation.y += angle * this.rotationAxis.y;
      rotation.z += angle * this.rotationAxis.z;
  
      this.obj.position.set(
        this.center.x + Math.cos(angle) * this.radius,
        this.center.y + Math.sin(angle) * this.radius,
        this.center.z
      );
      this.obj.rotation.copy(rotation);
    }
  }
  class SinSwingAnimation extends Animation {
    constructor(obj, options) {
      super(obj);
      this.swingAxis = options.swingAxis || new THREE.Vector3(0, 1, 0); // Default swing axis (y-axis)
      this.swingAngle = options.swingAngle || Math.PI / 4; // Default swing angle
      this.initialRotation = obj.rotation.clone(); // Clone initial object rotation
    }
  
    cacheValues() {
      super.cacheValues();
      this.cachedValues.initialRotation = this.initialRotation.clone();
    }
  
    updateValues(progress) {
      const angle = Math.sin(progress * Math.PI) * this.swingAngle;
      const rotation = this.cachedValues.initialRotation.clone();
      rotation[this.swingAxis.x] += angle; // Apply angle based on swing axis
      this.obj.rotation.copy(rotation);
    }
  }
  
  class CosSwingAnimation extends SinSwingAnimation {
    constructor(obj, options) {
      super(obj, options);
    }
  
    updateValues(progress) {
      const angle = Math.cos(progress * Math.PI) * this.swingAngle;
      const rotation = this.cachedValues.initialRotation.clone();
      rotation[this.swingAxis.x] += angle; // Apply angle based on swing axis
      this.obj.rotation.copy(rotation);
    }
  }
  
  class TanSwingAnimation extends SinSwingAnimation {
    constructor(obj, options) {
      super(obj, options);
    }
  
    updateValues(progress) {
      const angle = Math.tan(progress * Math.PI) * this.swingAngle; // Adjust for potential division by zero
      const rotation = this.cachedValues.initialRotation.clone();
      rotation[this.swingAxis.x] += angle; // Apply angle based on swing axis
      this.obj.rotation.copy(rotation);
    }
  }
  
  class FadeAnimation extends Animation {
    constructor(obj, options) {
      super(obj);
      this.initialOpacity = obj.material ? obj.material.opacity : 1; // Default initial opacity
      this.targetOpacity = options.opacity || 0; // Default target opacity (disappear)
      this.easing = options.easing || THREE.MathUtils.Easing.Linear; // Default easing function
    }
  
    cacheValues() {
      super.cacheValues();
      this.cachedValues.opacity = this.initialOpacity;
    }
  
    updateValues(progress) {
      const lerpedOpacity = THREE.MathUtils.lerp(this.cachedValues.opacity, this.targetOpacity, progress);
      if (this.obj.material) {
        this.obj.material.opacity = lerpedOpacity;
      } else {
        console.warn("Object does not have a material property. Fade animation might not work as expected.");
      }
    }
  }
  class RollingAnimation extends Animation {
    constructor(obj, options) {
      super(obj);
      this.center = options.center || { x: 0, y: 0, z: 0 }; // Default center point
      this.radius = options.radius || 0.5; // Default radius
      this.rotationAxis = options.rotationAxis || new THREE.Vector3(0, 1, 0); // Default rotation axis (y-axis)
      this.initialRotation = obj.rotation.clone(); // Clone initial object rotation
      this.totalAngle = options.totalAngle || Math.PI * 2; // Default total rotation angle (full circle)
      this.path = options.path || null; // Optional path function (receives progress as argument)
    }
  
    cacheValues() {
      super.cacheValues();
      this.cachedValues.initialRotation = this.initialRotation.clone();
    }
  
    updateValues(progress) {
      let position;
  
      if (this.path) {
        // Follow a provided path function
        position = this.path(progress);
      } else {
        // Default rolling around a center point
        const angle = this.totalAngle * progress;
        position = {
          x: this.center.x + Math.cos(angle) * this.radius,
          y: this.center.y + Math.sin(angle) * this.radius,
          z: this.center.z
        };
      }
  
      const rotation = this.cachedValues.initialRotation.clone();
      rotation.x += progress * Math.PI * 2; // Rotate around chosen axis
      this.obj.position.set(position.x, position.y, position.z);
      this.obj.rotation.copy(rotation);
    }
  }
  class RotateAndMoveAnimation extends Animation {
    constructor(obj, options) {
      super(obj);
      this.rotation = options.rotation || 27; // Default rotation in degrees
      this.x = options.x || 100; // Default x-axis movement in pixels
    }
  
    cacheValues() {
      super.cacheValues();
      this.cachedValues.initialRotation = this.obj.rotation.clone(); // Store initial rotation
    }
  
    updateValues(progress) {
      const rotation = this.cachedValues.initialRotation.clone();
      rotation.x += this.rotation * progress; // Apply rotation based on progress
      this.obj.rotation.copy(rotation);
      this.obj.position.x += this.x * progress; // Apply x-axis movement based on progress
    }
  }
  class FadeSlideAnimation extends Animation {
    constructor(obj, options) {
      super(obj);
      this.targetOpacity = options.opacity || 1; // Default target opacity
      this.targetX = options.x || 0; // Default target x-position
      this.yoyo = options.yoyo || false; // Default yoyo behavior (repeat back and forth)
      this.repeat = options.repeat || 0; // Default number of repetitions (-1 for infinite)
      this.duration = options.duration || 1000; // Default duration in milliseconds
    }
  
    cacheValues() {
      super.cacheValues();
      this.cachedValues.initialOpacity = this.obj.material ? this.obj.material.opacity : 1; // Store initial opacity
      this.cachedValues.initialX = this.obj.position.x; // Store initial x-position
    }
  
    updateValues(progress) {
      const opacity = THREE.MathUtils.lerp(this.cachedValues.initialOpacity, this.targetOpacity, progress);
      if (this.obj.material) {
        this.obj.material.opacity = opacity;
      } else {
        console.warn("Object does not have a material property. Fade animation might not work as expected.");
      }
      const x = THREE.MathUtils.lerp(this.cachedValues.initialX, this.targetX, progress);
      this.obj.position.x = x;
    }
  
    play() {
      super.play();
      this.pingPong = 1; // Initial direction for yoyo behavior
    }
  
    update() {
      super.update();
      if (this.yoyo && this.progress >= 1) {
        this.pingPong *= -1;
        this.progress = 0;
      }
    }
  }
  
  class FadeSlideFromAnimation extends FadeSlideAnimation {
    constructor(obj, options, delay) {
      super(obj, options);
      this.delay = delay || 0; // Delay before starting animation
    }
  
    play() {
      super.play();
      this.startTime = performance.now() + this.delay; // Apply delay
    }
  }
  
  class FadeSlideFromToAnimation extends FadeSlideAnimation {
    constructor(obj, options1, options2) {
      super(obj, options1);
      this.targetOpacity2 = options2.opacity || 1; // Second target opacity (for "fromTo" animation)
      this.targetX2 = options2.x || 0; // Second target x-position (for "fromTo" animation)
    }
  
    updateValues(progress) {
      const isSecondHalf = progress > 0.5;
      const targetOpacity = isSecondHalf ? this.targetOpacity2 : this.targetOpacity;
      const targetX = isSecondHalf ? this.targetX2 : this.targetX;
      const opacity = THREE.MathUtils.lerp(this.cachedValues.initialOpacity, targetOpacity, progress);
      if (this.obj.material) {
        this.obj.material.opacity = opacity;
      } else {
        console.warn("Object does not have a material property. Fade animation might not work as expected.");
      }
      const x = THREE.MathUtils.lerp(this.cachedValues.initialX, targetX, progress);
      this.obj.position.x = x;
    }
  }
  function animateCircularColorChange(mesh, radius, options = {}) {
  // Default options
  const defaultOptions = {
    speed: 0.5, // Adjust speed here (lower value for slower movement)
    initialTime: 0, // Starting time for animation (optional)
    initialHue: 0, // Starting hue for color change (optional)
  };

  // Merge options with defaults
  const { speed, initialTime = 0, initialHue = 0 } = Object.assign({}, defaultOptions, options);

  let time = initialTime;

  return function animate() {
    // Calculate angle and position
    const angle = time * speed;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    mesh.position.set(x, 0, z);

    // Calculate color based on angle
    const color = new THREE.Color(0xffffff); // White
    const hue = (angle / Math.PI * 2 + initialHue) % 1; // Normalize hue, consider initialHue
    color.setHSL(hue, 1, 0.5); // Set hue, saturation, and lightness

    // Update material color
    mesh.material.color = color;

    // Update time for next animation frame
    time += 0.01;

    // Request next animation frame
    requestAnimationFrame(animate);
  };
}
function animateCircularColorChange(mesh, radius, options = {}) {
  // Default options
  const defaultOptions = {
    speed: 0.5, // Adjust speed here (lower value for slower movement)
    initialTime: 0, // Starting time for animation (optional)
    initialHue: 0, // Starting hue for color change (optional)
    color: 0xffffff, // Initial color (optional)
  };

  // Merge options with defaults
  const { speed, initialTime, initialHue, color } = Object.assign({}, defaultOptions, options);

  let time = initialTime;

  return function animate() {
    // Calculate angle and position
    const angle = time * speed;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    mesh.position.set(x, 0, z);

    // Calculate color based on angle
    const initialColor = new THREE.Color(color); // Convert provided color to THREE.Color
    const hue = (angle / Math.PI * 2 + initialHue) % 1; // Normalize hue, consider initialHue
    initialColor.setHSL(hue, 1, 0.5); // Set hue, saturation, and lightness

    // Update material color
    mesh.material.color.copy(initialColor); // Use copy for color consistency

    // Update time for next animation frame
    time += 0.01;

    // Request next animation frame
    requestAnimationFrame(animate);
  };
}

  
  