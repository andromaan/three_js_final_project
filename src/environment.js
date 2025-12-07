import * as THREE from 'three';
import { exrLoader } from './loaders.js';

export function setupEnvironment(scene, gui) {
    exrLoader.load('/citrus_orchard_road_puresky_2k.exr', function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        scene.background = texture;
    });

    // Add directional light for shadows
    const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;

    // Configure shadow properties
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.bias = -0.001;

    scene.add(directionalLight);

    // Add GUI controls for light
    if (gui) {
        const lightFolder = gui.addFolder('Directional Light');
        lightFolder.add(directionalLight, 'intensity', 0, 5, 0.1).name('Intensity');
        lightFolder.add(directionalLight.position, 'x', -20, 20, 0.1).name('Position X');
        lightFolder.add(directionalLight.position, 'y', 0, 20, 0.1).name('Position Y');
        lightFolder.add(directionalLight.position, 'z', -20, 20, 0.1).name('Position Z');
    }
}

export function fogSetup(scene, gui) {
    scene.fog = new THREE.Fog('#8ca7bf', 1, 40);

    if (gui) {
        const fogFolder = gui.addFolder('Fog');
        fogFolder.add(scene.fog, 'near', 0, 20, 0.1).name('Near');
        fogFolder.add(scene.fog, 'far', 0, 50, 0.1).name('Far');
    }
}
