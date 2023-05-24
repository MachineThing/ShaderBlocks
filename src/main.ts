import './style/index.less'
import inject from './editor'
import initScene from './gl/init'

const blocklyArea = document.getElementById('blocklyArea')!
const playerDiv = document.getElementById('player')!
inject(blocklyArea, playerDiv)

function setupWebGL(_?: Event) {
    const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("glview")!

    initScene(canvas, playerDiv)
}

window.addEventListener("load", setupWebGL)