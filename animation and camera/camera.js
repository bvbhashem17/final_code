class Camera {
    constructor(fov = 75, aspect = window.innerWidth / window.innerHeight, near = 0.1, far = 1000) {
      this.fov = fov;
      this.aspect = aspect;
      this.near = near;
      this.far = far;
      this.position = new THREE.Vector3(0, 0, 10);
      this.target = new THREE.Vector3(0, 0, 0);
    }
  
    updateProjectionMatrix() {
      this.camera.updateProjectionMatrix();
    }
  
    isActive() {
      return this.isActiveCamera;
    }
  
    setActive(isActive = true) {
      this.isActiveCamera = isActive;
    }
  }
  
  class PerspectiveCamera extends Camera {
    constructor(fov, aspect, near, far) {
      super(fov, aspect, near, far);
      this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    }
  
    lookAt(target) {
      this.camera.lookAt(target);
    }
  }
  
  class OrthographicCamera extends Camera {
    constructor(left, right, top, bottom, near, far) {
      super(undefined, undefined, near, far);
      this.camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
    }
  
    update() {
      this.camera.updateProjectionMatrix();
    }
  }
  
  class CubeCamera extends Camera {
    constructor(near, far) {
      super(undefined, undefined, near, far);
      this.camera = new THREE.CubeCamera(near, far);
    }
  }
  
  class StereoCamera extends Camera {
    constructor(eyeSep = 0.05) {
      super();
      this.camera = new THREE.StereoCamera();
      this.camera.eyeSep = eyeSep;
    }
  
    update(camera) {
      this.camera.update(camera);
    }
  }