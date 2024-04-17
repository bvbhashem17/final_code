import * as THREE from 'three';
import {createParticleRiver} from './ri.js';
import {createParticleRiver2} from './ri.js';

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;
  const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('canvas.webgl') });
  renderer.setSize(window.innerWidth, window.innerHeight);
  const particleCount = 1000;
  const color = 0x87CEEB; // Light blue color
  const size = 0.03;
  const velocityRange = 0.01;
  //createParticleRiver2(scene, camera, renderer, particleCount, color, size, velocityRange);

  createParticleRiver(scene,camera,renderer,7, 30,1, 0.6, 0xfff000, 0.02, 0xf0f000, 4)