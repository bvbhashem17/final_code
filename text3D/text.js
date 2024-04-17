import * as THREE from "three";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { Loaders } from "./loaders.js";

export class Text {
  constructor() {}

  async createTextMesh(
    text,
    fontJSONPath,
    matrial,
    textStyle = {
      fontSize: 0.5,
      fontDepth: 0.3,
      curveSegments: 20,
      isBevelEnabeled: false,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0.5,
      bevelSegments: 5,
    }
  ) {
    let loaders = new Loaders();
    let font = await loaders.asyncLoadFont({fontJSONPath: fontJSONPath});
    let textGeometry = new TextGeometry(text, {
      font: font,
      size: textStyle.fontSize || 0.5,
      height: textStyle.fontDepth || 0.3,
      curveSegments: textStyle.curveSegments || 20,
      bevelEnabled: textStyle.isBevelEnabeled || false,
      bevelThickness: textStyle.bevelThickness || 0.03,
      bevelSize: textStyle.bevelSize || 0.02,
      bevelOffset: textStyle.bevelOffset || 0.5,
      bevelSegments: textStyle.bevelSegments || 5,
    });
    textGeometry.computeBoundingBox();
    let bounding = textGeometry.boundingBox;

    textGeometry.center();

    let text3D = new THREE.Mesh(textGeometry, matrial);

    return { text3D, bounding };
  }
}

export class TyperText extends Text {
  groupOfLetters = new THREE.Group();
  text = "";
  isCentered = false;
  font = "";
  textStyle = {
    fontSize: 0.5,
    fontDepth: 0.3,
    curveSegments: 20,
    isBevelEnabeled: false,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0.5,
    bevelSegments: 5,
  };
  arrOfLetters = [];
  isReceiveShadow = true;
  isCastShadow = true;
  constructor({
    font,
    matrial,
    isCentered,
    isReceiveShadow,
    isCastShadow,
    textStyle,
  }) {
    super();
    this.isCentered = isCentered;
    this.font = font;
    this.matrial = matrial;
    this.textStyle = textStyle;
    this.isReceiveShadow = isReceiveShadow;
    this.isCastShadow = isCastShadow;
  }

  async textOnInput(e) {
    this.groupOfLetters.children = [];

    let letterMesh = await this.createTextMesh(
      e.target.value,
      this.font,
      this.matrial,
      this.textStyle
    );
    letterMesh.text3D.position.set(
      letterMesh.bounding.max.x,
      letterMesh.bounding.max.y,
      letterMesh.bounding.max.z
    );
    letterMesh.text3D.castShadow = this.isCastShadow;
    letterMesh.text3D.receiveShadow = this.isReceiveShadow;
    this.groupOfLetters.add(letterMesh.text3D);

    if (this.isCentered) {
      var boundingBox = new THREE.Box3().setFromObject(this.groupOfLetters);
      var groupSize = new THREE.Vector3();
      boundingBox.getSize(groupSize);
      this.groupOfLetters.position.x = -groupSize.x / 2;
    }

    this.text = e.target.value;
    this.arrOfLetters.push(letterMesh.text3D);
  }
  textOnBackspace(e) {
    if (e.code === "Backspace") {
      this.groupOfLetters.remove(this.groupOfLetters.children[0]);
      this.text = e.target.value;
      this.arrOfLetters.pop();
    }
  }
}
