import Blockly from 'blockly'
import toolbox from './toolbox.json'
import recolorBlocks from './recolor'
import glslGenerator from './generator'

let workspace: Blockly.WorkspaceSvg

recolorBlocks()

function inject(blocklyArea: HTMLElement, playerDiv: HTMLElement) {
    const blocklyDiv: any = blocklyArea.children[0]

    workspace = Blockly.inject(blocklyDiv, {
        toolbox: toolbox,
        move: {
            scrollbars: {
                horizontal: true,
                vertical: true
            },
            drag: true,
            wheel: false
        }
    })

    const onResize = (_?: Event) => {
        if (window.innerWidth <= 600) {
            blocklyDiv.style.width = `${blocklyArea.offsetWidth}px`
            blocklyDiv.style.height = `${window.innerHeight - playerDiv.offsetHeight}px`
            workspace.options.horizontalLayout = true
        } else {
            blocklyDiv.style.width = `${blocklyArea.offsetWidth}px`
            blocklyDiv.style.height = `${blocklyArea.offsetHeight}px`
        }
        Blockly.svgResize(workspace)
    }
    window.addEventListener('resize', onResize)
    onResize()
}

// @ts-expect-error
window.runCode = () => {
    const code = glslGenerator.workspaceToCode(workspace)
    console.log(code)
    alert(code)
}

export default inject