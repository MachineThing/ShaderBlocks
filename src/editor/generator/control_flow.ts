import Blockly from 'blockly'
import precedence from './precedence'
import glslGenerator, { LooseObject } from '../generator'

const glsl: LooseObject = {}

glsl['controls_if'] = function(block: Blockly.Block) {
    const inputMembers = glslGenerator.valueToCode(block, 'IF0', precedence.ORDER_NONE)
    const statementMembers = glslGenerator.statementToCode(block, 'DO0')

    return `if (${inputMembers}) {\n${statementMembers}\n}`
}

export {glsl as control_flow}