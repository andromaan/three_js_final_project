import { gltfLoader } from './loaders.js';
import { createMonumentTextures } from './textures.js';

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

                    child.position.set(0, 0, 0);

                    gui.add(child.rotation, 'y')
                        .min(-Math.PI)
                        .max(Math.PI)
                        .step(0.01)
                        .name('Monument Rotation Y');
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
