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
        displacementBias: 0.02,
    });

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(20, 20, 50, 50), floorMaterial);

    floor.rotation.x = -Math.PI * 0.5;
    floor.receiveShadow = true;

    scene.add(floor);
}
