precision mediump float;

uniform vec2 iResolution;
uniform float iTime;

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    float r = fragCoord[0] / iResolution[0];
    float g = (iResolution[1] - fragCoord[1]) / iResolution[1];
    float b = fragCoord[1] / iResolution[1];
    
    fragColor = vec4(r, g, b, 1.0);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}