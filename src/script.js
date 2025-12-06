import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Timer } from 'three/addons/misc/Timer.js';
import GUI from 'lil-gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// HDR Environment Map
const exrLoader = new EXRLoader();
exrLoader.load('/citrus_orchard_road_puresky_2k.exr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
    scene.background = texture;
});

// GLTF Loader
const gltfLoader = new GLTFLoader();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

// Motherland monument texture
const monumentColorTexture = textureLoader.load('/textures/Motherland/metal_plate_02_diff_2k.jpg');
const monumentARMTexture = textureLoader.load('/textures/Motherland/metal_plate_02_arm_2k.jpg');
const monumentDisplacementTexture = textureLoader.load(
    '/textures/Motherland/metal_plate_02_disp_2k.jpg'
);
const monumentNormalTexture = textureLoader.load(
    '/textures/Motherland/metal_plate_02_nor_gl_2k.jpg'
);
const monumentRoughnessTexture = textureLoader.load(
    '/textures/Motherland/metal_plate_02_rough_2k.exr'
);

monumentColorTexture.colorSpace = THREE.SRGBColorSpace;

const monumentRepeatX = 10;
const monumentRepeatY = 10;
monumentColorTexture.repeat.set(monumentRepeatX, monumentRepeatY);
monumentARMTexture.repeat.set(monumentRepeatX, monumentRepeatY);
monumentDisplacementTexture.repeat.set(monumentRepeatX, monumentRepeatY);
monumentNormalTexture.repeat.set(monumentRepeatX, monumentRepeatY);
monumentRoughnessTexture.repeat.set(monumentRepeatX, monumentRepeatY);

monumentColorTexture.wrapS = THREE.RepeatWrapping;
monumentARMTexture.wrapS = THREE.RepeatWrapping;
monumentDisplacementTexture.wrapS = THREE.RepeatWrapping;
monumentNormalTexture.wrapS = THREE.RepeatWrapping;
monumentRoughnessTexture.wrapS = THREE.RepeatWrapping;

monumentColorTexture.wrapT = THREE.RepeatWrapping;
monumentARMTexture.wrapT = THREE.RepeatWrapping;
monumentDisplacementTexture.wrapT = THREE.RepeatWrapping;
monumentNormalTexture.wrapT = THREE.RepeatWrapping;
monumentRoughnessTexture.wrapT = THREE.RepeatWrapping;

/**
 * Historical monument
 */
// Motherland monument kiyv
gltfLoader.load(
    '/models/motherland-monument-kyiv.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                child.material = child.material.clone();
                child.material.map = monumentColorTexture;
                child.material.aoMap = monumentARMTexture;
                child.material.metalnessMap = monumentRoughnessTexture;
                child.material.displacementMap = monumentDisplacementTexture;
                child.material.normalMap = monumentNormalTexture;

                child.position.set(0, 0, 0);

                gui.addColor(child.material, 'color').name('Monument Color');
            }
        });

        scene.add(gltf.scene);
    },
    undefined,
    (error) => {
        console.error('An error happened while loading the GLTF model:', error);
    }
);

// /**
//  * Lights
//  */
// // Ambient light
// const ambientLight = new THREE.AmbientLight('#ffffff', 0.5);
// scene.add(ambientLight);

// // Directional light
// const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5);
// directionalLight.position.set(3, 2, -8);
// scene.add(directionalLight);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const timer = new Timer();

const tick = () => {
    // Timer
    timer.update();
    const elapsedTime = timer.getElapsed();

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
