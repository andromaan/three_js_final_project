import { gltfLoader } from './loaders.js';
import { createMonumentTextures, createMotherlandStandTextures } from './textures.js';

export function loadMotherlandMonument(scene, gui) {
    const monumentTextures = createMonumentTextures();

    gltfLoader.load(
        '/models/motherland-monument-kyiv.glb',
        (gltf) => {
            gltf.scene.traverse((child) => {
                if (child.isMesh) {
                    child.material = child.material.clone();
                    child.material.map = monumentTextures.color;
                    child.material.metalnessMap = monumentTextures.metalness;
                    child.material.roughnessMap = monumentTextures.roughness;
                    child.material.normalMap = monumentTextures.normal;

                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.position.set(0, 2.385, 0);

                    gui.add(child.position, 'y')
                        .min(-5)
                        .max(5)
                        .step(0.01)
                        .name('Monument Y Position');
                }
            });

            scene.add(gltf.scene);
        },
        undefined,
        (error) => {
            console.error('An error happened while loading the GLTF model:', error);
        }
    );
}

export function loadMonumentStand(scene, gui) {
    const standTextures = createMotherlandStandTextures();
    const standTexturesRepeat1 = createMotherlandStandTextures(2);

    gltfLoader.load(
        '/models/motherland-monument-stand.glb',
        (gltf) => {
            gltf.scene.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;

                    // If this is Cylinder1, assign separate textures
                    if (child.name === 'Cylinder1') {
                        const cylinderMaterial = child.material.clone();
                        cylinderMaterial.map = standTexturesRepeat1.color;
                        cylinderMaterial.displacementMap = standTexturesRepeat1.displacement;
                        cylinderMaterial.normalMap = standTexturesRepeat1.normal;
                        cylinderMaterial.metalnessMap = standTexturesRepeat1.metalness;
                        cylinderMaterial.roughnessMap = standTexturesRepeat1.roughness;
                        cylinderMaterial.displacementScale = 0.005;
                        cylinderMaterial.displacementBias = 0.0;
                        child.material = cylinderMaterial;
                    } else {
                        const material = child.material.clone();
                        material.map = standTextures.color;
                        material.displacementMap = standTextures.displacement;
                        material.normalMap = standTextures.normal;
                        material.metalnessMap = standTextures.metalness;
                        material.roughnessMap = standTextures.roughness;
                        material.displacementScale = 0.005;
                        material.displacementBias = 0.0;
                        child.material = material;
                    }
                }
            });
            scene.add(gltf.scene);
        },
        undefined,
        (error) => {
            console.error('An error happened while loading the GLTF model:', error);
        }
    );
}
