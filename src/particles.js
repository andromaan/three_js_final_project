import * as THREE from 'three';

export function createParticles(scene, gui) {
    const particlesCount = 500;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount * 3; i += 3) {
        // Random positions in a sphere around the monument
        const radius = 10;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;

        positions[i] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = Math.random() * 15 - 1; // Y position
        positions[i + 2] = radius * Math.sin(phi) * Math.sin(theta);

        // Initialize sizes
        sizes[i / 3] = Math.random() * 0.5 + 0.5;

        // Blue-yellow colors (Ukrainian flag colors)
        const isBlue = Math.random() > 0.5;
        if (isBlue) {
            colors[i] = 0.0; // R
            colors[i + 1] = 0.5; // G
            colors[i + 2] = 1.0; // B
        } else {
            colors[i] = 1.0; // R
            colors[i + 1] = 0.9; // G
            colors[i + 2] = 0.0; // B
        }
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.07,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Add GUI controls
    if (gui) {
        const particlesFolder = gui.addFolder('Particles');
        particlesFolder.add(particlesMaterial, 'size', 0.01, 0.5, 0.01).name('Size');
        particlesFolder.add(particlesMaterial, 'opacity', 0, 1, 0.1).name('Opacity');
        particlesFolder.add(particles, 'visible').name('Visible');
    }

    return particles;
}

export function animateParticles(particles, elapsedTime) {
    if (particles) {
        // Rotate particles slowly
        particles.rotation.y = elapsedTime * 0.05;

        // Animate individual particles
        const positions = particles.geometry.attributes.position.array;

        for (let i = 0; i < positions.length; i += 3) {

            // Make particles float up and down
            positions[i + 1] += Math.sin(elapsedTime + i) * 0.001;

            // Reset if too high or too low
            if (positions[i + 1] > 20) positions[i + 1] = -5;
            if (positions[i + 1] < -5) positions[i + 1] = 20;
        }

        particles.geometry.attributes.position.needsUpdate = true;
        particles.geometry.attributes.size.needsUpdate = true;
    }
}
