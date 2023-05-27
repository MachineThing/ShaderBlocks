import Blockly from 'blockly'

interface recolor {
    name: string
    hue: number
}

const hues = {
    control: 40,
    operators: 130,
    input: 202
}

const recolors: recolor[] = [
    {name: 'controls_if', hue: hues['control']},
    {name: 'logic_compare', hue: hues['operators']},
    {name: 'math_arithmetic', hue: hues['operators']},
    
    {name: 'logic_operation', hue: hues['operators']},
    {name: 'logic_boolean', hue: hues['operators']},
    {name: 'math_number', hue: hues['operators']},
    
]

function recolorBlock(block: Blockly.Block, hue: number) {
    let oldInit = block.init
    block.init = function () {
        //@ts-expect-error
        oldInit.call(this)
        this.setColour(hue)
    }
}

function recolorBlocks() {
    for (const toRecolor of recolors) {
        recolorBlock(Blockly.Blocks[toRecolor['name']], toRecolor['hue'])
    }
}

export default recolorBlocks