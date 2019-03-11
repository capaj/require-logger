const m = require('module')
const path = require('path')
const chalk = require('chalk')
const originalLoader = m._load
let c = 0
let parentModule

const SYMBOLS = {
  BRANCH: '├── ',
  EMPTY: '',
  INDENT: '    ',
  LAST_BRANCH: '└── ',
  VERTICAL: '│   '
}

m._load = function(request, parent, isMain) {
  const parentDir = path.dirname(parent.id)

  if (request.startsWith('.') && !parentDir.match(/node_modules/)) {
    // console.log('parent: ', parent);
    c++
    let parentLevels = 0
    let current = parent
    while (current.parent) {
      parentLevels++
      // console.log('parentLevels: ', parent.id);
      current = current.parent
    }
    const indentSymbols =
      parentLevels > 1
        ? Array(parentLevels - 1)
            .fill(SYMBOLS.VERTICAL)
            .join('')
        : ''
    const branchSymbol = parentLevels >= 1 ? SYMBOLS.BRANCH : ''

    if (parent !== parentModule) {
      console.log(`${indentSymbols}${branchSymbol}${chalk.yellow(parent.id)}`)
      parentModule = parent
    }
    const absPath = path.join(parentDir, request)
    const relPath = path.relative(process.cwd(), absPath)

    console.log(`${indentSymbols}${branchSymbol}`, chalk.green(relPath))
  }
  return originalLoader(request, parent, isMain)
}
