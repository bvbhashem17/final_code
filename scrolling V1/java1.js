//Variables for setup
let container;
let camera;
let renderer;
let scene;
let shape;

function init() {
  container = document.querySelector(".scene.one");

  //Create scene
  scene = new THREE.Scene();

  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.9;
  const far = 1000;

  //Camera setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);



  // Add basic lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 9);
  directionalLight.position.set(0, 1, 0); // Adjust as needed
  scene.add(directionalLight);





  // Call function to add shape
  addModelToScene('https://raw.githubusercontent.com/ahmedwael17/Project5/main/gltf2/scene.gltf', { position: { x: 0, y: 0, z: 0 }, scale: 0.6 });

  //addShapeToScene("box", { sizeX: 0.3, sizeY: 0.3, sizeZ: 0.3, position: { x: 0, y: 0, z: 0 }, spacingX: 0.5 }, 2);
  //addShapeToScene("sphere", { radius: 1, segments: 32, position: { x: 0, y: 0, z: 0 }, spacingX: 2 },2);
  //addShapeToScene("cylinder", { radiusTop: 0.5, radiusBottom: 0.5, height: 2, segments: 16, position: { x: 2, y: 0, z: 0 } ,spacingX: 2 }, 2);
  //addShapeToScene("tetrahedron", { radius: 1, position: { x: 0, y: 0, z: 0 } }, );
  //addShapeToScene("torusKnot", { radius: 1, tube: 0.3, radialSegments: 64, tubularSegments: 8, p: 2, q: 3, position: { x: 0, y: 0, z: 0 },spacingX: 3 }, 2);

  // Animation loop
  animate();

  // Event listener for window resize
  window.addEventListener("resize", onWindowResize);

  // Setup ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.defaults({
    immediateRender: false,
    ease: "power1.inOut",
    scrub: true,
  });

  // Set initial scene rotation and camera position
  scene.rotation.set(0, 1.88, 0);
  camera.position.set(2, 0, 5);

  // Define animations using ScrollTrigger
  let car_anim = gsap.timeline();

  // Full Height
  car_anim.to(scene.rotation, { y: 4.79, scrollTrigger: {
    trigger: ".section-two",
    endTrigger: ".section-four",
    end: "top bottom",
  }});

  // Slide 2
  car_anim.to(camera.position, { x: -0.1, scrollTrigger: {
    trigger: ".section-two",
    start: "top bottom",
    end: "top top",
  }});

  // Slide 3
  car_anim.to(scene.rotation, { z: 1.6, scrollTrigger: {
    trigger: ".section-three",
    start: "top bottom",
    end: "top top",
  }});

  // Slide 4 - The problem child
  car_anim.to(scene.rotation, { z: 0.02, y: 3.1, scrollTrigger: {
    trigger: ".section-four",
    start: "top bottom",
    end: "top top",
  }});

  car_anim.to(camera.position, { x: 0.16, scrollTrigger: {
    trigger: ".section-four",
    start: "top top",
    end: "bottom top",
  }});
}

// Function to add shape to scene
function addShapeToScene(type, options, count) {
  let geometry, material;

  switch (type) {
    case "box":
      geometry = new THREE.BoxGeometry(options.sizeX, options.sizeY, options.sizeZ);
      break;
    case "sphere":
      geometry = new THREE.SphereGeometry(options.radius, options.widthSegments, options.heightSegments);
      break;
    case "cylinder":
      geometry = new THREE.CylinderGeometry(options.radiusTop, options.radiusBottom, options.height, options.radialSegments);
      break;
    case "cone":
      geometry = new THREE.ConeGeometry(options.radius, options.height, options.radialSegments);
      break;
    case "torus":
      geometry = new THREE.TorusGeometry(options.radius, options.tube, options.radialSegments, options.tubularSegments);
      break;
    case "dodecahedron":
      geometry = new THREE.DodecahedronGeometry(options.radius);
      break;
    case "octahedron":
      geometry = new THREE.OctahedronGeometry(options.radius);
      break;
    case "tetrahedron":
      geometry = new THREE.TetrahedronGeometry(options.radius);
      break;
    case "torusKnot":
      geometry = new THREE.TorusKnotGeometry(options.radius, options.tube, options.radialSegments, options.tubularSegments, options.p, options.q);
      break;
    default:
      console.error("Invalid shape type:", type);
      return;
  }

  material = new THREE.MeshNormalMaterial(); // Use standard material for better lighting

  for (let i = 0; i < count; i++) {
    const shape = new THREE.Mesh(geometry, material);
    shape.position.set(
      options.position.x + (i * options.spacingX || 0),
      options.position.y + (i * options.spacingY || 0),
      options.position.z + (i * options.spacingZ || 0)
    );
    scene.add(shape);
  }

}

function addModelToScene(modelPath, options) {
    const loader = new THREE.GLTFLoader();
    loader.load(modelPath, function(gltf) {
      const model = gltf.scene;
      model.position.set(options.position.x, options.position.y, options.position.z);
      model.scale.set(options.scale, options.scale, options.scale); // Scale the model uniformly
      scene.add(model);
    }, undefined, function(error) {
      console.error(error);
    });
  }


// Animation loop function
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// Function to handle window resize
function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}




// Initialize the scene
init();

