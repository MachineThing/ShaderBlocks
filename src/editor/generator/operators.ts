import Blockly from 'blockly'
import precedence from './precedence'
import glslGenerator, { LooseObject } from '../generator'

const glsl: LooseObject = {}

glsl['logic_compare'] = function(block: Blockly.Block) {
    const order = precedence.ORDER_LOGICAL_AND

    const A = glslGenerator.valueToCode(block, 'A', order)
    const B = glslGenerator.valueToCode(block, 'B', order)
    
    return [`${A} == ${B}`, precedence.ORDER_EQUALITY]
}

export {glsl as operators}