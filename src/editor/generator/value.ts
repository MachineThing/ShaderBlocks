import Blockly from 'blockly'
import precedence from './precedence'
import glslGenerator, { LooseObject } from '../generator'

const glsl: LooseObject = {}

glsl['math_number'] = function(block: Blockly.Block) {
    const number = String(block.getFieldValue('NUM'))

    return [number, precedence.ORDER_ATOMIC]
}

export {glsl as value}