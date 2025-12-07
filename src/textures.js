import * as THREE from 'three';
import { textureLoader } from './loaders.js';

export function createMonumentTextures() {
    const monumentColorTexture = textureLoader.load(
        '/textures/motherland/Metal055A_2K-JPG_Color.jpg'
    );
    const monumentDisplacementTexture = textureLoader.load(
        '/textures/motherland/Metal055A_2K-JPG_Displacement.jpg'
    );
    const monumentNormalTexture = textureLoader.load(
        '/textures/motherland/Metal055A_2K-JPG_NormalGL.jpg'
    );
    const monumentRoughnessTexture = textureLoader.load(
        '/textures/motherland/Metal055A_2K-JPG_Roughness.jpg'
    );
    const monumentMetalnessTexture = textureLoader.load(
        '/textures/motherland/Metal055A_2K-JPG_Metalness.jpg'
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

// export function createFloorTextures() {
//     // Floor
//     const floorAlphaTexture = textureLoader.load('/textures/floor/alpha.webp');
//     const floorColorTexture = textureLoader.load(
//         '/textures/floor/coast_sand_rocks/coast_sand_rocks_02_diff_1k.webp'
//     );
//     const floorARMTexture = textureLoader.load(
//         '/textures/floor/coast_sand_rocks/coast_sand_rocks_02_arm_1k.webp'
//     );
//     const floorNormalTexture = textureLoader.load(
//         '/textures/floor/coast_sand_rocks/coast_sand_rocks_02_nor_gl_1k.webp'
//     );
//     const floorDisplacementTexture = textureLoader.load(
//         '/textures/floor/coast_sand_rocks/coast_sand_rocks_02_disp_1k.webp'
//     );

//     floorColorTexture.colorSpace = THREE.SRGBColorSpace;

//     const floorTextures = [
//         floorColorTexture,
//         floorARMTexture,
//         floorNormalTexture,
//         floorDisplacementTexture,
//     ];

//     const floorRepeat = 8;

//     floorTextures.forEach((texture) => {
//         texture.repeat.set(floorRepeat, floorRepeat);
//         texture.wrapS = THREE.RepeatWrapping;
//         texture.wrapT = THREE.RepeatWrapping;
//     });

//     return {
//         color: floorColorTexture,
//         displacement: floorDisplacementTexture,
//         normal: floorNormalTexture,
//         alpha: floorAlphaTexture,
//         arm: floorARMTexture,
//     };
// }


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