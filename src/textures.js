import * as THREE from 'three';
import { textureLoader } from './loaders.js';

export function createMonumentTextures() {
    const monumentColorTexture = textureLoader.load(
        '/textures/motherland-monument/Metal055A_2K-JPG_Color.jpg'
    );
    const monumentDisplacementTexture = textureLoader.load(
        '/textures/motherland-monument/Metal055A_2K-JPG_Displacement.jpg'
    );
    const monumentNormalTexture = textureLoader.load(
        '/textures/motherland-monument/Metal055A_2K-JPG_NormalGL.jpg'
    );
    const monumentRoughnessTexture = textureLoader.load(
        '/textures/motherland-monument/Metal055A_2K-JPG_Roughness.jpg'
    );
    const monumentMetalnessTexture = textureLoader.load(
        '/textures/motherland-monument/Metal055A_2K-JPG_Metalness.jpg'
    );

    monumentColorTexture.colorSpace = THREE.SRGBColorSpace;

    const textures = [
        monumentColorTexture,
        monumentDisplacementTexture,
        monumentNormalTexture,
        monumentRoughnessTexture,
        monumentMetalnessTexture,
    ];

    const monumentRepeat = 20;

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

export function createFloorTextures() {
    // Floor
    const floorAlphaTexture = textureLoader.load('/textures/floor/alpha.webp');
    const floorColorTexture = textureLoader.load(
        '/textures/floor/grass_patchy_ground/Poliigon_GrassPatchyGround_4585_BaseColor.jpg'
    );
    const floorAOTexture = textureLoader.load(
        '/textures/floor/grass_patchy_ground/Poliigon_GrassPatchyGround_4585_AmbientOcclusion.jpg'
    );
    const floorNormalTexture = textureLoader.load(
        '/textures/floor/grass_patchy_ground/Poliigon_GrassPatchyGround_4585_Normal.png'
    );
    const floorDisplacementTexture = textureLoader.load(
        '/textures/floor/grass_patchy_ground/Poliigon_GrassPatchyGround_4585_Displacement.tiff'
    );
    const floorMetalnessTexture = textureLoader.load(
        '/textures/floor/grass_patchy_ground/Poliigon_GrassPatchyGround_4585_Metallic.jpg'
    );
    const floorRoughnessTexture = textureLoader.load(
        '/textures/floor/grass_patchy_ground/Poliigon_GrassPatchyGround_4585_Roughness.jpg'
    );

    floorColorTexture.colorSpace = THREE.SRGBColorSpace;

    const floorTextures = [
        floorColorTexture,
        floorNormalTexture,
        floorDisplacementTexture,
        floorMetalnessTexture,
        floorAOTexture,
        floorRoughnessTexture,
    ];

    const floorRepeat = 8;

    floorTextures.forEach((texture) => {
        texture.repeat.set(floorRepeat, floorRepeat);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
    });

    return {
        color: floorColorTexture,
        displacement: floorDisplacementTexture,
        normal: floorNormalTexture,
        alpha: floorAlphaTexture,
        ao: floorAOTexture,
        metalness: floorMetalnessTexture,
        roughness: floorRoughnessTexture,
    };
}

export function createMotherlandStandTextures(repeat = 4) {
    const rootPath = '/textures/motherland-stand/MetalPlates004_2K-JPG/';

    const standColorTexture = textureLoader.load(
        rootPath + 'MetalPlates004_2K-JPG_Color.jpg'
    );
    const standNormalTexture = textureLoader.load(
        rootPath + 'MetalPlates004_2K-JPG_NormalGL.jpg'
    );
    const standRoughnessTexture = textureLoader.load(
        rootPath + 'MetalPlates004_2K-JPG_Roughness.jpg'
    );
    const standDisplacementTexture = textureLoader.load(
        rootPath + 'MetalPlates004_2K-JPG_Displacement.jpg'
    );
    const standMetalnessTexture = textureLoader.load(
        rootPath + 'MetalPlates004_2K-JPG_Metalness.jpg'
    );

    standColorTexture.colorSpace = THREE.SRGBColorSpace;

    const textures = [
        standColorTexture,
        standNormalTexture,
        standRoughnessTexture,
        standDisplacementTexture,
        standMetalnessTexture,
    ];

    const standRepeat = repeat;

    textures.forEach((texture) => {
        texture.repeat.set(standRepeat, standRepeat);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
    });

    return {
        color: standColorTexture,
        normal: standNormalTexture,
        roughness: standRoughnessTexture,
        displacement: standDisplacementTexture,
        metalness: standMetalnessTexture,
    };
}