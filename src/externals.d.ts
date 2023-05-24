declare module '*.glsl' {
    const resource: string;
    export = resource;
}

interface WebGLProgram {
    inPos: number
    iResolution: WebGLUniformLocation
    iTime: WebGLUniformLocation
}