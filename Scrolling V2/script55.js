

class Experience {
  constructor(
    options = {
      containerSelector: "[data-app-container]"
    }
  ) {
    this.options = options;
    this.container = document.querySelector(this.options.containerSelector);

    // GSAP Plugins
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    // Time
    this.clock = new THREE.Clock();
    this.time = 0;

    // THREE items
    this.renderer;
    this.camera;
    this.scene;
    this.controls;
    this.meshes = [];

    // Rotation
    this.targetRotation = 0;

    // Settings
    this.settings = {
      cameraDistance: 5,
      scalePeriod: 8
    };

    this.init();
  }

  init = () => {

    this.createApp();

    //this.createItems('box'); // Default to box shapes
    //this.createItems('sphere');
    //this.createItems('cylinder');
    //this.createItems('dodecahedron');
    //this.createItems('icosahedron');
    //this.createItems('tetrahedron');
    
    
    //GLTF img
    this.loadGLTFModel('https://raw.githubusercontent.com/ahmedwael17/Project5/main/gltf2/scene.gltf'); // Replace 'path/to/your/model.gltf' with the actual path to your GLTF model

    this.initScroll();
    this.update();

    this.container.classList.add("is-ready");
  };

  initScroll = () => {
    this.scrollSmoother = ScrollSmoother.create({
      content: "#content",
      smooth: 1.2
    });

    // Add scroll triggers for each span item
    document.querySelectorAll("span").forEach((span) => {
      ScrollTrigger.create({
        trigger: span,
        start: "top 90%",
        end: "bottom 10%",
        onUpdate: (self) => {
          const dist = Math.abs(self.progress - 0.5);
          const lightness = this.mapToRange(dist, 0, 0.5, 80, 100);
          span.style.setProperty("--l", lightness + "%");
        }
      });
    });
  };

  createApp = () => {
    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true
    });
    this.renderer.setPixelRatio(1.5);
    this.renderer.setSize(
      this.container.offsetWidth,
      this.container.offsetHeight
    );
    this.container.appendChild(this.renderer.domElement);

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.container.offsetWidth / this.container.offsetHeight,
      1,
      10000
    );
    this.camera.position.set(0, 0, this.settings.cameraDistance);
    this.scene = new THREE.Scene();

    // Orbit Controls
    this.controls = new THREE.OrbitControls(
      this.camera,
      this.renderer.domElement
    );
    this.controls.enableKeys = false;
    this.controls.enableZoom = false;
    this.controls.enableDamping = false;

    // Resize the renderer on window resize
    window.addEventListener(
      "resize",
      () => {
        this.camera.aspect =
          this.container.offsetWidth / this.container.offsetHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(
          this.container.offsetWidth,
          this.container.offsetHeight
        );
      },
      true
    );

    // Ambient Light
    let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    // Directional Light
    let directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 5, 1);
    directionalLight.target.position.set(1, 5, 1);
    this.scene.add(directionalLight);
  };

  createItems = (shapeType) => {
    let geometry, material;

    switch (shapeType) {
      case 'box':
        geometry = new THREE.BoxBufferGeometry(2, 2, 2);
        break;
      case 'sphere':
        geometry = new THREE.SphereGeometry(1, 32, 16);
        break;
      case 'cylinder':
        geometry = new THREE.CylinderGeometry(1, 1, 2, 32);
        break;
      case 'cone':
        geometry = new THREE.ConeGeometry(1, 2, 32);
        break;
      case 'torus':
        geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
        break;
      case 'tetrahedron':
        geometry = new THREE.TetrahedronGeometry(1, 0);
        break;
      case 'octahedron':
        geometry = new THREE.OctahedronGeometry(1, 0);
        break;
      case 'dodecahedron':
        geometry = new THREE.DodecahedronGeometry(1, 0);
        break;
      case 'icosahedron':
        geometry = new THREE.IcosahedronGeometry(1, 0);
        break;
      // Add more cases for other shapes as needed
      default:
        geometry = new THREE.BoxBufferGeometry(2, 2, 2); // Default to a box
    }

    material = new THREE.MeshLambertMaterial({ color: 0xffffff });

    const itemCount = 40;
    for (let i = 0; i < itemCount; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.y = 13 * (Math.random() * 2 - 1);
      mesh.position.x = 3 * (Math.random() * 2 - 1);
      mesh.position.z = 4 * (Math.random() * 2 - 1);
      mesh.rotation.y = Math.PI * Math.random();
      mesh.rotationSpeed = Math.random() * 0.01 + 0.005;
      this.scene.add(mesh);
      this.meshes.push(mesh);
    }
  };



  loadGLTFModel = (modelUrl) => {
    const loader = new THREE.GLTFLoader();
  
    loader.load(
      modelUrl,
      (gltf) => {
        const model = gltf.scene;
        model.position.set(0, 0, 0); // Adjust position as needed
        model.rotation.set(0, 1, 0); // Adjust rotation as needed
        model.scale.set(0.4, 0.4, 0.4); // Adjust scale as needed
        this.scene.add(model);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.error("Error loading GLTF model:", error);
      }
    );
  };
  



  


  // loadGLTFModel = (modelUrl) => {
  //   const loader = new THREE.GLTFLoader();
  
  //   loader.load(
  //     modelUrl,
  //     (gltf) => {
  //       const model = gltf.scene;

  //       const itemCount = 40; // Number of instances to create
  //       for (let i = 0; i < itemCount; i++) {
  //         const clonedModel = model.clone(); // Create a clone of the model
  //         const randomX = Math.random() * 20 - 10; // Random X position
  //         const randomY = Math.random() * 20 - 10; // Random Y position
  //         const randomZ = Math.random() * 20 - 10; // Random Z position
  //         clonedModel.position.set(randomX, randomY, randomZ); // Set random position
  //         this.scene.add(clonedModel); // Add the cloned model to the scene
  //       }
  //     },
  //     (xhr) => {
  //       console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  //     },
  //     (error) => {
  //       console.error("Error loading GLTF model:", error);
  //     }
  //   );
  // };



//random rotation and position 

  // loadGLTFModel = (modelUrl) => {
  //   const loader = new THREE.GLTFLoader();
  
  //   loader.load(
  //     modelUrl,
  //     (gltf) => {
  //       const model = gltf.scene;

  //       const itemCount = 40; // Number of instances to create
  //       for (let i = 0; i < itemCount; i++) {
  //         const clonedModel = model.clone(); // Create a clone of the model
  //         const randomX = Math.random() * 20 - 10; // Random X position
  //         const randomY = Math.random() * 20 - 10; // Random Y position
  //         const randomZ = Math.random() * 20 - 10; // Random Z position
  //         clonedModel.position.set(randomX, randomY, randomZ); // Set random position

  //         // Random rotation
  //         const randomRotationX = Math.random() * Math.PI * 2; // Random rotation around X-axis
  //         const randomRotationY = Math.random() * Math.PI * 2; // Random rotation around Y-axis
  //         const randomRotationZ = Math.random() * Math.PI * 2; // Random rotation around Z-axis
  //         clonedModel.rotation.set(randomRotationX, randomRotationY, randomRotationZ);

  //         // Random scale
  //         const randomScale = Math.random() * 0.5 + 0.5; // Random scale between 0.5 and 1
  //         clonedModel.scale.set(randomScale, randomScale, randomScale);

  //         this.scene.add(clonedModel); // Add the cloned model to the scene
  //       }
  //     },
  //     (xhr) => {
  //       console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  //     },
  //     (error) => {
  //       console.error("Error loading GLTF model:", error);
  //     }
  //   );
  // };









  updateItems = () => {
    const time = this.time;
    const amplitude = 0.05;
    const period = this.settings.scalePeriod;

    const baseScale = 0.2;
    const scaleEffect =
      baseScale + amplitude * Math.sin(Math.PI * 2 * (time / period));

    this.meshes.forEach((mesh) => {
      mesh.scale.set(scaleEffect, scaleEffect, scaleEffect);

      // Update rotation
      mesh.rotation.x += mesh.rotationSpeed;
    });

    // Update camera
    const cameraRange = 10;
    this.camera.position.y = this.mapToRange(
      this.scrollSmoother.progress,
      0,
      1,
      cameraRange,
      -cameraRange
    );
  };

  mapToRange = (value, inMin, inMax, outMin, outMax) => {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  };

  update = () => {
    this.time = this.clock.getElapsedTime();

    this.updateItems();

    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.update);
  };
}

new Experience();
