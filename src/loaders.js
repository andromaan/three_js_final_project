import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
import * as THREE from 'three';

export const gltfLoader = new GLTFLoader();
export const exrLoader = new EXRLoader();
export const textureLoader = new THREE.TextureLoader();
