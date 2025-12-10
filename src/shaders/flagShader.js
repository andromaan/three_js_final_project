import * as THREE from 'three';
import vertexShader from './flagVertex.glsl';
import fragmentShader from './flagFragment.glsl';

export function createFlagShader(gui) {
    const geometry = new THREE.PlaneGeometry(4, 2.2, 128, 64);
    const uniforms = {
        uTime: { value: 0 },
        uAmplitude: { value: 0.25 },
        uFrequency: { value: 4.0 },
        uSpeed: { value: 2.0 },
    };

    const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        side: THREE.DoubleSide,
        transparent: true,
    });

    const flagMesh = new THREE.Mesh(geometry, material);
    flagMesh.position.set(-2, 5.5, -1.5);
    flagMesh.rotation.y = Math.PI * 0.2;

    if (gui) {
        const folder = gui.addFolder('Flag Shader');
        folder.add(uniforms.uAmplitude, 'value', 0, 0.8, 0.01).name('Amplitude');
        folder.add(uniforms.uFrequency, 'value', 1, 10, 0.1).name('Frequency');
        folder.add(uniforms.uSpeed, 'value', 0.5, 5, 0.1).name('Speed');
    }

    return {
        mesh: flagMesh,
        uniforms,
    };
}
