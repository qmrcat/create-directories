import fs from 'fs'
import path from 'path'

function mostrarAjuda() {
  console.log(`
Ús:
  createDirs.mjs [options] <fitxer_estructura> [directori_destí]

Arguments:
  fitxer_estructura     Fitxer de text amb l’estructura (espais o ASCII-tree)
  directori_destí       (Opcional) Carpeta arrel on crear l’arbre (per defecte: cwd)

Options:
  -h, --help            Mostra aquesta ajuda i surt

Exemple:
  node createDirs.mjs arbre.txt
  node createDirs.mjs arbre.txt /home/usuari/projecte
`)
}

function crearDirectoris(lines, rootDir) {
  const isTree = lines.some(l =>
    l.trimStart().startsWith('├──') ||
    l.trimStart().startsWith('└──')
  )

  let indentUnit = null
  const currentPaths = []

  for (const line of lines) {
    let indent = 0
    let namePart = line.trim()

    if (isTree) {
      const m = line.match(/^(\s*[│ ]*)(?:├── |└── )(.+)$/)
      if (!m) continue
      const prefix = m[1]
      namePart = m[2]
      const spaces = prefix.replace(/│/g, ' ')
      indent = spaces.length
      if (indentUnit === null && indent > 0) indentUnit = indent
    } else {
      const m = line.match(/^(\s*)(\S.*)$/)
      if (!m) continue
      const spaces = m[1]
      namePart = m[2]
      indent = spaces.length
      if (indentUnit === null && indent > 0) indentUnit = indent
    }

    const level = indentUnit ? Math.round(indent / indentUnit) : 0
    const dirName = namePart.replace(/\/$/, '')
    const parentPath = level > 0
      ? currentPaths[level - 1]
      : rootDir
    const dirPath = path.join(parentPath, dirName)

    if (path.extname(dirName)) {
      console.log(`ℹ️  S'ignora fitxer: ${dirName}`)
      continue
    }

    if (fs.existsSync(dirPath)) {
      console.warn(`⚠️  Ja existeix: ${dirPath}`)
    } else {
      fs.mkdirSync(dirPath, { recursive: true })
      console.log(`✅ Creant: ${dirPath}`)
    }

    currentPaths[level] = dirPath
  }
}

async function main() {
  const args = process.argv.slice(2)

  if (args.includes('-h') || args.includes('--help')) {
    mostrarAjuda()
    process.exit(0)
  }

  const [ inputFile, outputDir ] = args

  if (!inputFile) {
    console.error('❌ Falta el <fitxer_estructura>. Prova `--help` per més informació.')
    process.exit(1)
  }

  const rootDir = outputDir
    ? path.resolve(process.cwd(), outputDir)
    : process.cwd()

  if (!fs.existsSync(rootDir)) {
    fs.mkdirSync(rootDir, { recursive: true })
    console.log(`✅ Creant directori arrel: ${rootDir}`)
  }

  const content = fs.readFileSync(inputFile, 'utf-8')
  const lines = content.split(/\r?\n/).filter(l => l.trim() !== '')
  crearDirectoris(lines, rootDir)
}

main().catch(err => {
  console.error('Error:', err)
  process.exit(1)
})
//fi del script 