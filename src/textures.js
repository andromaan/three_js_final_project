import * as THREE from 'three';
import { textureLoader } from './loaders.js';

export function createMonumentTextures() {
    const monumentColorTexture = textureLoader.load(
        '/textures/Motherland/Metal055A_2K-JPG_Color.jpg'
    );
    const monumentDisplacementTexture = textureLoader.load(
        '/textures/Motherland/Metal055A_2K-JPG_Displacement.jpg'
    );
    const monumentNormalTexture = textureLoader.load(
        '/textures/Motherland/Metal055A_2K-JPG_NormalGL.jpg'
    );
    const monumentRoughnessTexture = textureLoader.load(
        '/textures/Motherland/Metal055A_2K-JPG_Roughness.jpg'
    );
    const monumentMetalnessTexture = textureLoader.load(
        '/textures/Motherland/Metal055A_2K-JPG_Metalness.jpg'
    );

    monumentColorTexture.colorSpace = THREE.SRGBColorSpace;

    const monumentRepeat = 20;
    const textures = [
        monumentColorTexture,
        monumentDisplacementTexture,
        monumentNormalTexture,
        monumentRoughnessTexture,
        monumentMetalnessTexture,
    ];

    textures.forEach((texture) => {
        texture.repeat.set(monumentRepeat, monumentRepeat);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
    });

    return {
        color: monumentColorTexture,
        displacement: monumentDisplacementTexture,
        normal: monumentNormalTexture,
        roughness: monumentRoughnessTexture,
        metalness: monumentMetalnessTexture,
    };
}
