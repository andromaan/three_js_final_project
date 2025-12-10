import * as THREE from 'three';
import { Timer } from 'three/addons/misc/Timer.js';
import GUI from 'lil-gui';
import { fogSetup, setupEnvironment } from './environment.js';
import { loadMotherlandMonument, loadMonumentStand, loadFlowers } from './models.js';
import { createCamera, createControls } from './camera.js';
import { createRenderer } from './renderer.js';
import { createFloorGeometry } from './geometry.js';
import { createParticles, animateParticles } from './particles.js';
import { createFlagShader } from './shaders/flagShader.js';

/**
 * Base
 */
// Debug
const gui = new GUI();

gui.close();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Group
const monumentGroup = new THREE.Group();
scene.add(monumentGroup);

// Setup environment
setupEnvironment(scene, gui);
fogSetup(scene, gui);

// Load models
loadMotherlandMonument(monumentGroup, gui);
loadMonumentStand(monumentGroup, gui);

gui.add(monumentGroup.rotation, 'y')
    .min(-Math.PI)
    .max(Math.PI)
    .step(0.01)
    .name('Monument Rotation Y');

// Floor
createFloorGeometry(scene, gui);

// Load flowers
loadFlowers(scene, gui);

// Create particles
const particles = createParticles(scene, gui);

// Create custom shader flag
const flagShader = createFlagShader(gui);
scene.add(flagShader.mesh);

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
controls.target.copy(new THREE.Vector3(0, 3, 0));
controls.update();

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

    // Animate particles
    animateParticles(particles, elapsedTime);

    // Update shader uniforms
    if (flagShader) {
        flagShader.uniforms.uTime.value = elapsedTime;
    }

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
