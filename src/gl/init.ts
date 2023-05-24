import fragment from './test.glsl'
import vertex from './vertex.glsl'

interface bufObjInter {
    pos?: WebGLBuffer
    inx?: WebGLBuffer
    len?: number
}

function initScene(canvas: HTMLCanvasElement) {
    const gl = canvas.getContext("webgl")
    if (gl === null) {
        alert("WebGL is not supported on your browser.")
        return null
    }
    const progDraw = gl.createProgram()!

    for (let i = 0; i < 2; i++) {
        let source = i==0 ? vertex : fragment
        let shaderObj = gl.createShader(i==0 ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER)!

        gl.shaderSource(shaderObj, source)
        gl.compileShader(shaderObj)

        let status = gl.getShaderParameter(shaderObj, gl.COMPILE_STATUS)
        if (status === null) {
            alert(`Error compiling shader: ${gl.getShaderInfoLog(shaderObj)}`)
            return null
        }
        gl.attachShader(progDraw, shaderObj)
    }
    gl.linkProgram(progDraw)
    let status = gl.getProgramParameter(progDraw, gl.LINK_STATUS)
    if (status === null) {
        alert(`Error linking program: ${gl.getProgramInfoLog(progDraw)}`)
        return null
    }
    // Variables (Attribs and uniforms) go here
    progDraw.inPos = gl.getAttribLocation(progDraw, "inPos")
    progDraw.iResolution = gl.getUniformLocation(progDraw, "iResolution")!
    progDraw.iTime = gl.getUniformLocation(progDraw, "iTime")!

    // Variables end
    gl.useProgram(progDraw)

    var pos = [ -1, -1, 1, -1, 1, 1, -1, 1 ];
    var inx = [ 0, 1, 2, 0, 2, 3 ];

    var bufObj: bufObjInter = {}
    bufObj.pos = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, bufObj.pos)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.STATIC_DRAW)
    bufObj.inx = gl.createBuffer()!
    bufObj.len = inx.length
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufObj.inx)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(inx), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(progDraw.inPos)
    gl.vertexAttribPointer(progDraw.inPos, 2, gl.FLOAT, false, 0, 0)

    gl.enable(gl.DEPTH_TEST)
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    const resize = (_?: Event) => {
        // TODO: Resize the canvas on resize
    }

    window.addEventListener('resize', resize)
    resize()

    const render = (deltaMS: number) => {
        gl.viewport(0, 0, canvas.width, canvas.height)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

        gl.uniform1f(progDraw.iTime, deltaMS/1000.0)
        gl.uniform2f(progDraw.iResolution, canvas.width, canvas.height)

        gl.drawElements(gl.TRIANGLES, bufObj.len!, gl.UNSIGNED_SHORT, 0)
    }

    setInterval(() => {requestAnimationFrame(render)}, 1)
}

export default initScene