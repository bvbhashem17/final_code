import * as THREE from "three";
import './style.css'
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/addons/renderers/CSS2DRenderer.js";
export default class HoverEffect {
  constructor(canvas) {
    this.canvas = canvas;
    this.init();
  }
  init() {
    this.setRenderer();
    this.setCamera();
    this.setLight();
    this.setFloor();
    this.setModel();
    this.events();
    this.animate();
  }
  setRenderer() {
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.viewport.width, this.viewport.height);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.physicallyCorrectLights = true;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(this.viewport.width, this.viewport.height);
    this.labelRenderer.domElement.style.position = "absolute";
    this.labelRenderer.domElement.style.top = "0px";
    document.body.appendChild(this.labelRenderer.domElement);
  }
  setCamera() {
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.viewport.aspectRatio,
      1,
      10000
    );
    this.camera.position.set(0, 150, 200);
    this.camera.lookAt(new THREE.Vector3(0, 20, 0));
  }
  setLight() {
    this.dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
    this.dirLight.position.set(-100, 100, 50);
    this.dirLight.castShadow = true;
    this.dirLight.shadow.mapSize.width = 4096;
    this.dirLight.shadow.mapSize.height = 4096;
    this.scene.add(this.dirLight);

    this.spotLight = new THREE.SpotLight(0xffffff, 3000);
    this.spotLight.position.set(0, 60, -20);
    this.spotLight.angle = Math.PI / 3;
    this.spotLight.penumbra = 0.9;
    this.spotLight.decay = 2;
    this.spotLight.distance = 200;

    this.spotLight.castShadow = true;
    this.spotLight.shadow.mapSize.width = 128;
    this.spotLight.shadow.mapSize.height = 128;
    this.scene.add(this.spotLight);

    this.ambLight = new THREE.AmbientLight(0xffffff, 3.0);
    this.scene.add(this.ambLight);
  }
  setFloor() {
    this.geometry = new THREE.PlaneGeometry(2000, 2000, 1, 1);
    this.material = new THREE.MeshPhongMaterial({
      color: 0x2590d1,
      side: THREE.DoubleSide,
    });
    this.floor = new THREE.Mesh(this.geometry, this.material);
    this.floor.rotation.x = Math.PI / 2;
    this.floor.position.set(0, -4, 0);
    this.floor.receiveShadow = true;
    this.scene.add(this.floor);
  }
  setModel() {
    const loader = new GLTFLoader();
    const modelURL = "./models/untitled1.glb";
    this.targetMesh = [];

    loader.load(
      modelURL,
      (gltf) => {
        this.btnModel = gltf.scene;
        this.btnModel.scale.set(50.0, 50.0, 50.0);
        this.btnModel.position.set(0, 0, 0);
        this.btnModel.rotation.y = -Math.PI / 4;
        this.scene.add(this.btnModel);

        this.btnModel.traverse((obj) => {
          if (obj.isMesh) {
            if (!this.targetMesh.length) this.targetMesh.push(obj);
            obj.castShadow = true;
            console.log(obj);
          }
        });

        const labelDiv = document.createElement("div");
        labelDiv.className = "label";
        const labelText = document.createElement("p");
        labelText.textContent = "Button";
        labelDiv.insertBefore(labelText, labelDiv.firstChild);
        const btnLabel = new CSS2DObject(labelDiv);
        btnLabel.position.set(0,0, 0);
        this.btnModel.add(btnLabel);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  events() {
    window.addEventListener("mousemove", this.onPointerMove.bind(this));
    window.addEventListener("resize", this.onResize.bind(this));
  }
  onPointerMove(event) {
    const pointer = new THREE.Vector2();
    pointer.x = (event.clientX / this.viewport.width) * 2 - 1;
    pointer.y = -(event.clientY / this.viewport.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(pointer, this.camera);

    const intersects = raycaster.intersectObjects(this.targetMesh, false);

    if (intersects.length > 0) {
      document.body.style.cursor = "pointer";
      this.btnModel.position.set(0, -2, 0);
      document.querySelector(".label").classList.add("hover");
    } else {
      document.body.style.cursor = "default";
      this.btnModel.position.set(0, 0, 0);
      document.querySelector(".label").classList.remove("hover");
    }
  }
  onResize() {
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.viewport.width, this.viewport.height);
    this.labelRenderer.setSize(this.viewport.width, this.viewport.height);

    this.camera.aspect = this.viewport.aspectRatio;
    this.camera.updateProjectionMatrix();
  }
  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);
  }
  get viewport() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspectRatio = width / height;
    return {
      width,
      height,
      aspectRatio,
    };
  }
}
