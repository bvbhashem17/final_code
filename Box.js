import * as THREE from "three";

export class Box {
  constructor({
    dimensions = { width: 1, height: 1, depth: 1 },
    material = new THREE.MeshBasicMaterial(),
    position = [0, 0, 0],
    castShadow = false,
  }) {
    // Create a BoxGeometry with the specified dimensions
    const geometry = new THREE.BoxGeometry(dimensions.width, dimensions.height, dimensions.depth);

    // Create a Mesh by combining the geometry and material
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = castShadow;
    this.mesh.position.set(position[0], position[1], position[2]);
  }

  // access the mesh
  getMesh() {
    return this.mesh;
  }

  addTo(scene) {
    scene.add(this.mesh);
  }
}
