import './style/index.less'
import inject from './editor'

const blocklyArea = document.getElementById('blocklyArea')!
const playerDiv = document.getElementById('player')!
inject(blocklyArea, playerDiv)