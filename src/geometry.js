import * as THREE from 'three';
import { createFloorTextures } from './textures';

export function createFloorGeometry(scene, gui) {
    const floorTextures = createFloorTextures();

    const floorMaterial = new THREE.MeshStandardMaterial({
        alphaMap: floorTextures.alpha,
        transparent: true,
        map: floorTextures.color,
        aoMap: floorTextures.ao,
        roughnessMap: floorTextures.roughness,
        metalnessMap: floorTextures.metalness,
        normalMap: floorTextures.normal,
        displacementMap: floorTextures.displacement,
        displacementScale: 0.3,
        displacementBias: -0.18,
    });

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(20, 20, 100, 100), floorMaterial);

    floor.rotation.x = -Math.PI * 0.5;

    // Add GUI controls for displacementScale and displacementBias
    if (gui) {
        const folder = gui.addFolder('Floor Displacement');
        folder.add(floorMaterial, 'displacementScale', 0, 1, 0.01).name('Displacement Scale');
        folder.add(floorMaterial, 'displacementBias', -1, 1, 0.01).name('Displacement Bias');
    }

    scene.add(floor);
}
