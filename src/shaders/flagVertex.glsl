uniform float uTime;
uniform float uAmplitude;
uniform float uFrequency;
uniform float uSpeed;

varying vec2 vUv;

void main() {
    vUv = uv;
    vec3 pos = position;
    float wave = sin(pos.y * uFrequency + uTime * uSpeed) * uAmplitude;
    wave += sin(pos.x * uFrequency * 0.5 + uTime * uSpeed * 1.5) * (uAmplitude * 0.5);
    pos.z += wave;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
