import * as THREE from 'three';
import { exrLoader } from './loaders.js';

export function setupEnvironment(scene) {
    exrLoader.load('/citrus_orchard_road_puresky_2k.exr', function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        scene.background = texture;
    });
}
