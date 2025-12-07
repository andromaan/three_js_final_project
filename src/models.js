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
    const standTexturesRepeat1 = createMotherlandStandTextures(1.5);

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
                        cylinderMaterial.metalness = 0.5;
                        cylinderMaterial.roughness = 0.8;
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
                        material.metalness = 0.5;
                        material.roughness = 0.8;
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

export function loadFlowers(scene, gui) {
    gltfLoader.load(
        '/models/flowers.glb',
        (gltf) => {
            gltf.scene.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = false;
                    child.receiveShadow = false;

                    child.scale.set(0.5, 0.5, 0.5);
                }

                const amount = 50;
                placeRandomFlowers('periwinkle_plant_01_LOD0', child, scene, amount);
                placeRandomFlowers('periwinkle_plant_02_LOD0', child, scene, amount);
                placeRandomFlowers('periwinkle_plant_03_LOD0', child, scene, amount);
                placeRandomFlowers('periwinkle_plant_04_LOD0', child, scene, amount);
                placeRandomFlowers('periwinkle_plant_05_LOD0', child, scene, amount);
                placeRandomFlowers('periwinkle_plant_06_LOD0', child, scene, amount);
            });
            scene.add(gltf.scene);
        },
        undefined,
        (error) => {
            console.error('An error happened while loading the GLTF model:', error);
        }
    );
}

function placeRandomFlowers(name, child, scene, amount = 20) {
    if (child.name === name) {
        for (let i = 0; i < amount; i++) {
            const flower = child.clone();
            flower.material = child.material.clone();

            // Coordinates
            const angle = Math.random() * Math.PI * 2;
            const radius = 2 / 2 + 1 + Math.random() * 4;
            const x = Math.sin(angle) * radius;
            const z = Math.cos(angle) * radius;

            // Mesh
            flower.position.x = x;
            flower.position.z = z;

            flower.rotation.y = (Math.random() - 0.5) * 0.4;
            flower.rotation.z = (Math.random() - 0.5) * 0.4;
            flower.rotation.x = (Math.random() - 0.5) * 0.4;

            // Add to the graves group
            scene.add(flower);
        }
    }
}
