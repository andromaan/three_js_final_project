import * as THREE from 'three';
import { Timer } from 'three/addons/misc/Timer.js';
import GUI from 'lil-gui';
import { setupEnvironment } from './environment.js';
import { loadMotherlandMonument } from './models.js';
import { createCamera, createControls } from './camera.js';
import { createRenderer } from './renderer.js';

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Setup environment
setupEnvironment(scene);

// Load models
loadMotherlandMonument(scene, gui);

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
const camera = createCamera(sizes);
scene.add(camera);

// Controls
const controls = createControls(camera, canvas);

/**
 * Renderer
 */
const renderer = createRenderer(canvas, sizes);

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
