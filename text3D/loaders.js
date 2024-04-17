import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

export class Loaders {
  constructor() {}
  manager({onStart, onload, onProgress, onError}) {
    const manager = new THREE.LoadingManager();
    manager.onStart = function (url, itemsLoaded, itemsTotal) {
      onStart(url, itemsLoaded, itemsTotal);
    };

    manager.onLoad = onload();

    manager.onProgress = function (url, itemsLoaded, itemsTotal) {
      onProgress(url, itemsLoaded, itemsTotal);
    };

    manager.onError = function (url) {
      onError(url);
    };
    return manager;
  }

  loadGLTFModel(
    {modelPath,
    isCompressed = false,
    manager,
    successFunction = (model) => {
      console.log(model);
    },
    progressFunction = (xhr) => {},
    errorFunction = (error) => {
      console.log(error);
    }}
  ) {
    const loader = new GLTFLoader(manager);

    if (isCompressed) {
      const dracoLoader = new DRACOLoader(manager);
      dracoLoader.setDecoderPath("/examples/jsm/libs/draco/");
      loader.setDRACOLoader(dracoLoader);
    }
    loader.load(modelPath, successFunction, progressFunction, errorFunction);
  }

  async asyncLoadGLTFModel({modelPath, isCompressed = false, manager}) {
    const loader = new GLTFLoader(manager);

    if (isCompressed) {
      const dracoLoader = new DRACOLoader(manager);
      dracoLoader.setDecoderPath("/examples/jsm/libs/draco/");
      loader.setDRACOLoader(dracoLoader);
    }
    return await loader.loadAsync(modelPath);
  }

  loadFont(
    {fontJSONPath,
    manager,
    successFunction,
    progressFunction,
    errorFunction = () => {
      console.error(
        "the file must be json file you can convert this file in facetype.js"
      );
    }}
  ) {
    let fontLoader = new FontLoader(manager);
    fontLoader.load(
      fontJSONPath,
      successFunction,
      progressFunction,
      errorFunction
    );
  }

  async asyncLoadFont({fontJSONPath, manager}) {
    if (fontJSONPath.split(".")[1] !== "json") {
      return console.error(
        "the file must be json file you can convert this file in facetype.js"
      );
    }
    let fontLoader = new FontLoader(manager);
    return await fontLoader.loadAsync(fontJSONPath);
  }

  loadTexture(
    {textureJSONPath,
    manager,
    successFunction,
    progressFunction,
    errorFunction}
  ) {
    let textureLoader = new THREE.TextureLoader(manager);
    textureLoader.load(
      textureJSONPath,
      successFunction,
      progressFunction,
      errorFunction
    );
  }

  async asyncLoadTexture({textureJSONPath, manager}) {
    let textureLoader = new THREE.TextureLoader(manager);
    return await textureLoader.loadAsync(textureJSONPath);
  }

  loadFile(
    {filePath,
    manager,
    successFunction,
    progressFunction,
    errorFunction}
  ) {
    let fileLoader = new THREE.FileLoader(manager);
    fileLoader.load(filePath, successFunction, progressFunction, errorFunction);
  }

  async asyncLoadFile({filePath, manager}) {
    let fileLoader = new THREE.FileLoader(manager);
    return await fileLoader.loadAsync(filePath);
  }

  loadImageBitmap(
    {imagePath,
    manager,
    successFunction,
    progressFunction,
    errorFunction}
  ) {
    const loader = new THREE.ImageBitmapLoader(manager);
    loader.setOptions({ imageOrientation: "flipY" });
    loader.load(imagePath, successFunction, progressFunction, errorFunction);
  }

  async asyncLoadImageBitmap({imagePath, manager}) {
    const loader = new THREE.ImageBitmapLoader(manager);
    loader.setOptions({ imageOrientation: "flipY" });
    return await loader.loadAsync(imagePath);
  }

  loadImage(
    {imagePath,
    manager,
    successFunction,
    progressFunction,
    errorFunction}
  ) {
    const loader = new THREE.ImageLoader(manager);
    loader.load(imagePath, successFunction, progressFunction, errorFunction);
  }

  async asyncLoadImage({imagePath, manager}) {
    const loader = new THREE.ImageLoader(manager);
    return await loader.loadAsync(imagePath);
  }

  loadMaterial(
    {materialPath,
    manager,
    successFunction,
    progressFunction,
    errorFunction}
  ) {
    const loader = new THREE.MaterialLoader(manager);
    loader.load(materialPath, successFunction, progressFunction, errorFunction);
  }

  async asyncLoadMaterial({materialPath, manager}) {
    const loader = new THREE.MaterialLoader(manager);
    return await loader.loadAsync(materialPath);
  }

  loadObject(
    {objectJsonPath,
    manager,
    successFunction,
    progressFunction,
    errorFunction}
  ) {
    const loader = new THREE.MaterialLoader(manager);
    loader.load(
      objectJsonPath,
      successFunction,
      progressFunction,
      errorFunction
    );
  }

  async asyncLoadObject({objectJsonPath, manager}) {
    const loader = new THREE.MaterialLoader(manager);
    return await loader.loadAsync(objectJsonPath);
  }

  loadAudio(
    {audioPath,
    manager,
    successFunction,
    progressFunction,
    errorFunction}
  ) {
    const loader = new THREE.AudioLoader(manager);
    loader.load(audioPath, (data) => { successFunction(data); }, progressFunction, errorFunction);
  }

  async asyncLoadAudio({audioPath, manager}) {
    const loader = new THREE.AudioLoader(manager);
    return await loader.loadAsync(audioPath);
  }
}
