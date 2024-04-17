import * as THREE from "three";
import C from "cannon";
const fontURL = "./src/fonts/helvetiker_bold.typeface.json";
const margin = 6;
const totalMass = 1;
const force = 25;

export default class TryMenu {
  constructor(scene, world, camera) {
    this.$navItems = document.querySelectorAll(".mainNav a");
    // ممكن ادي شويه perameter يعدلولي scene
    this.scene = scene;
    this.world = world;
    this.camera = camera;
    this.loader = new THREE.FontLoader();
    // Constants
    this.words = [];
    this.offset = this.$navItems.length * margin * 0.6; // هنا هتديني شويه انميشن ف الاول يحركه تحريك بصيط
    // Interaction
    this.mouse = new THREE.Vector3();
    this.raycaster = new THREE.Raycaster();
    this.loader.load(fontURL, (f) => {
      this.setup(f);
    });

    this.bindEvents();
  }
  bindEvents() {
    document.addEventListener("click", () => {
      this.onClick();
    });
    window.addEventListener("mousemove", (e) => {
      this.onMouseMove(e);
    });
  }
  setup(f) {
    const fontOption = {
      font: f,
      size: 2.5,
      height: 0.4,
      //curveSegments: 24,
      bevelEnabled: true,
      bevelThickness: 0.9,
      bevelSize: 0.5, // براحتنا هنا نقدر نلعب في size
      bevelOffset: 0, //  لو غيرنا اقيمه لو 1 هشوف تعديل تاني
      bevelSegments: 50,
    };
    Array.from(this.$navItems)
      .reverse()
      .forEach(($item, i) => {
        const { innerText } = $item;
        const words = new THREE.Group();
        words.letterOff = 0;

        words.ground = new C.Body({
          mass: 0,
          shape: new C.Box(new C.Vec3(50, 0.1, 50)),
          position: new C.Vec3(0, i * margin - this.offset, 0),
        });
        this.world.addBody(words.ground);
        Array.from(innerText).forEach((letter, j) => {
          const material = new THREE.MeshPhongMaterial({
            color: 0x97df5e,
          });
          const geometry = new THREE.TextBufferGeometry(letter, fontOption);
          geometry.computeBoundingBox();
          geometry.computeBoundingSphere();
          const mesh = new THREE.Mesh(geometry, material);
          mesh.size = mesh.geometry.boundingBox.getSize(new THREE.Vector3());
          words.letterOff += mesh.size.x;
          const box = new C.Box(new C.Vec3().copy(mesh.size).scale(0.5));
          mesh.body = new C.Body({
            mass: totalMass / innerText.length,
            position: new C.Vec3(words.letterOff, this.getOffsetY(i), 0),
          });
          const { center } = mesh.geometry.boundingSphere;
          mesh.body.addShape(box, new C.Vec3(center.x, center.y, center.z));
          this.world.addBody(mesh.body);
          words.add(mesh);
        });
        words.children.forEach((letter) => {
          letter.body.position.x -= letter.size.x + words.letterOff * 0.5;
        });
        this.words.push(words);
        this.scene.add(words);
      });
    this.setConstraints();
  }

  update() {
    if (!this.words) return;

    this.words.forEach((word, j) => {
      for (let i = 0; i < word.children.length; i++) {
        const letter = word.children[i];

        letter.position.copy(letter.body.position);
        letter.quaternion.copy(letter.body.quaternion);
      }
    });
  }
  getOffsetY(i) {
    return (this.$navItems.length - i - 1) * margin - this.offset;
  }
  setConstraints() {
    this.words.forEach((word) => {
      for (let i = 0; i < word.children.length; i++) {
        const letter = word.children[i];
        const nextLetter =
          i === word.children.length - 1 ? null : word.children[i + 1];
        if (!nextLetter) continue;
        const c = new C.ConeTwistConstraint(letter.body, nextLetter.body, {
          pivotA: new C.Vec3(letter.size.x, 0, 0),
          pivotB: new C.Vec3(0, 0, 0),
        });
        c.collideConnected = true;
        this.world.addConstraint(c);
      }
    });
  }
  onClick() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(
      this.scene.children,
      true
    );
    if (intersects.length > 0) {
      const obj = intersects[0];
      const { object, face } = obj;
      if (!object.isMesh) return;
      const impulse = new C.Vec3().copy(face.normal).scale(-force);
      this.words.forEach((word) => {
        word.children.forEach((letter) => {
          const { body } = letter;
          if (letter !== object) return;
          body.applyLocalImpulse(impulse, new C.Vec3());
        });
      });
    }
  }
  onMouseMove(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }
}
