import Blockly from 'blockly'
import { control_flow } from './generator/control_flow'
import { operators } from './generator/operators'
import { value } from './generator/value'

interface LooseObject {
    [key: string]: any
}

const glslGenerator: LooseObject = new Blockly.Generator('GLSL')

function register(defs: LooseObject) {
    Object.keys(defs).forEach(func => {
        glslGenerator[func] = defs[func]
    });
}

register(control_flow)
register(operators)
register(value)

export default glslGenerator
export type {LooseObject}




