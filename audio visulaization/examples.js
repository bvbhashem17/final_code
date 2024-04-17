import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { AudioVisualization } from "./AudioVisualization.js";

// ============================================================

// Line
export function audioVisualizerLine({
  audioPath,
  numberPoints,
  lineColor,
  buttonDOM,
  cameraZPos,
}) {
  // Set up the scene, camera, and renderer
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create a geometry for the line
  var geometry = new THREE.BufferGeometry();
  var numPoints = numberPoints; // Number of points for the line
  var positions = new Float32Array(numPoints * 3); // Array to hold positions

  // Set initial positions for the line
  for (var i = 0; i < numPoints; i++) {
    var x = (i / numPoints) * 10 - 5; // X-coordinate
    var y = 0; // Y-coordinate
    var z = 0; // Z-coordinate
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }

  // Add positions to the geometry
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  // Create material for the line
  var material = new THREE.LineBasicMaterial({ color: lineColor });

  // Create the line
  var line = new THREE.Line(geometry, material);
  scene.add(line);

  // ===================================================
  // Set up the Web Audio API
  let av = new AudioVisualization(audioPath);

  let { analyser, audioElement, audioContext } = av.getAudioAnalyser();
  // Start playing the audio
  buttonDOM.addEventListener("click", () => {
    audioContext.resume();
    if (isPlaying(audioElement)) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
  });

  // Function to animate the sphere based on audio frequency
  function animate() {
    var dataArray = av.getDataArray(analyser);

    // Update line position based on audio data
    for (var i = 0; i < dataArray.length; i++) {
      // Update Y-coordinate based on audio data
      var scaleY = 1 + dataArray[i] / 128; // Scale factor may need adjustment
      line.geometry.attributes.position.setY(i, scaleY);
    }

    // Mark the buffer geometry as needing an update
    line.geometry.attributes.position.needsUpdate = true;

    // Render the scene
    renderer.render(scene, camera);

    // Call animate recursively
    requestAnimationFrame(animate);
  }

  // Set up the camera position
  camera.position.z = cameraZPos;
  function isPlaying(audioIn) {
    return !audioIn.paused;
  }
  // Call the animate function to start the animation loop
  animate();
}

// ============================================================

// 3cubes
export function audioVisualizer3Cubes({ audioPath, buttonDOM, cameraZPos }) {
  // Set up the scene, camera, and renderer
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  const group = new THREE.Group();
  // Create a cube
  var cube1 = createCube(2);
  group.add(cube1);

  var cube2 = createCube(0);
  group.add(cube2);

  var cube3 = createCube(-2);
  group.add(cube3);

  scene.add(group);

  // Set up the Web Audio API
  let av = new AudioVisualization(audioPath);
  let { analyser, audioElement, audioContext } = av.getAudioAnalyser();

  // Start playing the audio
  buttonDOM.addEventListener("click", () => {
    audioContext.resume();
    if (isPlaying(audioElement)) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
  });
  let isTrue = false;
  // Function to animate the cube based on audio frequency
  function animate() {
    // Get the frequency data
    var dataArray = av.getDataArray(analyser);

    // Scale the cube's scale along the Y-axis based on the average frequency data
    var average =
      dataArray.reduce(function (a, b) {
        return a + b;
      }, 0) / dataArray.length;
    // Scale factor may need adjustment

    animateShape(cube1, isTrue, average);
    animateShape(cube2, isTrue, average);
    animateShape(cube3, isTrue, average);

    // Render the scene
    renderer.render(scene, camera);
    isTrue = !isTrue;
    // Call animate recursively
    requestAnimationFrame(animate);
  }

  // Set up the camera position
  camera.position.z = cameraZPos;
  function isPlaying(audioIn) {
    return !audioIn.paused;
  }

  // Call the animate function to start the animation loop
  animate();

  // helper functions
  function createCube(xPos) {
    const geometry = new THREE.BoxGeometry(1, 1, 1, 3, 3, 3);
    var material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    });
    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = xPos;
    return cube;
  }
  function animateShape(shape, isTrue, average) {
    shape.scale.x = (average / 128) * 5; // Scale factor may need adjustment
    shape.scale.y = (average / 128) * 5; // Scale factor may need adjustment
    shape.scale.z = (average / 128) * 5; // Scale factor may need adjustment

    // Rotate the cube
    shape.rotation.x -= average / 100000;
    shape.rotation.y += average / 10000;
    shape.rotation.z -= average / 1000;
    if (isTrue) {
      shape.position.x += average / -500;
    } else {
      shape.position.x += average / 500;
    }
    shape.material.color.setRGB(Math.random(), Math.random(), Math.random());
  }
}

// ============================================================

//  sphere
export function audioVisualizerSphere({
  audioPath,
  spherRadius,
  spherSegments,
  color,
  buttonDOM,
  cameraZPos,
}) {
  // Set up the scene, camera, and renderer
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create a sphere
  const geometry = new THREE.SphereGeometry(
    spherRadius,
    spherSegments,
    spherSegments
  );
  var material = new THREE.MeshBasicMaterial({
    color: color,
    wireframe: true,
  });
  var sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  // Set up the Web Audio API
  let av = new AudioVisualization(audioPath);
  let { analyser, audioElement, audioContext } = av.getAudioAnalyser();

  // Start playing the audio
  buttonDOM.addEventListener("click", () => {
    audioContext.resume();
    if (isPlaying(audioElement)) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
  });

  let x = false;
  // Function to animate the sphere based on audio frequency
  function animate() {
    // Get the frequency data
    var dataArray = av.getDataArray(analyser);

    // Scale the sphere's scale along the Y-axis based on the average frequency data
    var average =
      dataArray.reduce(function (a, b) {
        return a + b;
      }, 0) / dataArray.length;
    console.log(average);
    sphere.scale.y = (average / 128) * 5; // Scale factor may need adjustment
    sphere.scale.x = (average / 128) * 5; // Scale factor may need adjustment
    sphere.scale.z = (average / 128) * 5; // Scale factor may need adjustment

    // Rotate the sphere
    sphere.rotation.x += average / 100000;
    sphere.rotation.y += average / 10000;
    sphere.rotation.z += average / 1000;
    if (x) {
      sphere.position.x += average / 500;
    } else {
      sphere.position.x += average / -500;
    }

    // Render the scene
    renderer.render(scene, camera);
    x = !x;
    // Call animate recursively
    requestAnimationFrame(animate);
  }

  // Set up the camera position
  camera.position.z = cameraZPos;
  function isPlaying(audioIn) {
    return !audioIn.paused;
  }
  // Call the animate function to start the animation loop
  animate();
}

// ============================================================

// spider
export function audioVisualizerSpider(audioPath, fourColors, buttonDOM) {
  const group = new THREE.Group();
  // Set up the scene, camera, and renderer
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  //
  var controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  //
  var cylinder = createCylinder(5, 20, fourColors[0]);
  group.add(cylinder);

  var cylinder1 = createCylinder(10, 30, fourColors[1]);
  group.add(cylinder1);

  var cylinder2 = createCylinder(2, 15, fourColors[2]);
  group.add(cylinder2);

  var cylinder3 = createCylinder(0, 10, fourColors[3]);
  group.add(cylinder3);
  scene.add(group);

  // ====================================
  // Set up the Web Audio API
  const av = new AudioVisualization(audioPath);

  let { analyser, audioElement, audioContext } = av.getAudioAnalyser();

  // Start playing the audio
  buttonDOM.addEventListener("click", () => {
    audioContext.resume();
    if (isPlaying(audioElement)) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
  });
  let isTrue = false;
  // Function to animate the cylinder based on audio frequency
  function animate() {
    // Get the frequency data
    let dataArray = av.getDataArray(analyser);
    // Scale the cylinder's scale along the Y-axis based on the average frequency data
    var average =
      dataArray.reduce(function (a, b) {
        return a + b;
      }, 0) / dataArray.length;

    animateShape(cylinder, average, 2);
    animateShape(cylinder1, average, 3);
    animateShape(cylinder2, average, 2);
    animateShape(cylinder3, average, 1);
    // Render the scene
    renderer.render(scene, camera);
    isTrue = !isTrue;
    // Call animate recursively
    requestAnimationFrame(animate);
  }

  // Set up the camera position
  camera.position.z = 60;
  function isPlaying(audioIn) {
    return !audioIn.paused;
  }
  // Call the animate function to start the animation loop
  animate();

  // helper functions
  function createCylinder(radTop, radBottom, color) {
    const geometry = new THREE.CylinderGeometry(
      radTop,
      radBottom,
      20,
      32,
      10,
      true
    );
    var material = new THREE.MeshBasicMaterial({
      color: color,
      wireframe: true,
    });
    var cylinder = new THREE.Mesh(geometry, material);
    return cylinder;
  }

  function animateShape(shape, average, ss) {
    shape.position.z = average / (2 * ss);
    shape.rotation.x = Math.PI / 2;
  }
}
