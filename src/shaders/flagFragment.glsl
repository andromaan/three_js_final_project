precision mediump float;
varying vec2 vUv;

void main() {
    if (gl_FrontFacing == false) {
        discard;
    }
    vec3 topColor = vec3(0.07, 0.38, 0.85);
    vec3 bottomColor = vec3(1.0, 0.85, 0.0);
    vec3 color = vUv.y > 0.5 ? topColor : bottomColor;
    gl_FragColor = vec4(color, 1.0);
}
