import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
const defaultParams = {
  //  A canvas where the renderer draws its output
  canvasDOMElement: document.createElement("canvas"),
  // Renderer style [width, height, backgroundColor, Opacity]
  style: {
    width: window.innerWidth,
    height: window.innerHeight,
    bgColor: 0x000000,
    opacity: 1,
  },
  // Camera
  camera: new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  ),
  // More Renderers like [css2drenderer,css3drenderer]
  renderers: [],
  // CHILDS of THE SCENE [objects, models]
  childrens: [],
  // Lights
  lights:[],
  loop(clock) {},
  addControls(renderer, camera, scene) {},
  isResponsive: true,
  haveOrbitControls: true,
};

export function World(params = defaultParams) {
  let scene = new THREE.Scene();

  // ADD 3DObjects OR EXTERNAL Models TO THE SCENE
  params.childrens?.map((obj) => scene.add(obj));
  params.lights?.map((light) => scene.add(light));

  var webGLRenderer = new THREE.WebGLRenderer({
    canvas: params.canvasDOMElement,
  });
  webGLRenderer.setSize(params.style.width, params.style.height);
  webGLRenderer.setClearColor(params.style.bgColor, params.style.opacity);
  document.body.appendChild(webGLRenderer.domElement);

  // IF ANY RENDERERS NEED TO ADD like "CSS2Rendere, CSS3DRendere, SVGRendere"
  params.renderers?.map((renderer) => {
    document.body.appendChild(renderer.domElement);
  });

  // ADD OrbitControls if haveOrbitControls else ADD ANY TYPE OF CONTROLS using addControls(webGLRenderer, camera, scene) funcion its a callback func
  let controls;
  if (params.haveOrbitControls) {
    controls = new OrbitControls(params.camera, webGLRenderer.domElement);
    controls.update();
  } else {
    params.addControls(webGLRenderer, params.camera, scene);
  }
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    clock.getDelta();
    // ADD A CUSTOM ANIMATE FUNC using loop(clock) function it's a callback function
    params.loop(clock);

    // UPDATE AN OrbitControls
    if (params.haveOrbitControls) {
      controls.update();
    }
    webGLRenderer.render(scene, params.camera);
  }
  animate();
  // USE THIS TO MAKE THE CANVAS REPONSIVE WHEN THE WINDOW RESIZED
  if (params.isResponsive) {
    window.addEventListener("resize", () => {
      params.camera.aspect = window.innerWidth / window.innerHeight;
      webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
}
