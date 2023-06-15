import {Project} from "ts-morph"
import path from 'path'

const project = new Project({})

// добавляем файлы с исходным кодом, с которыми будем работать - ts-morph будет рекурсивно по ним проходиться и выполнять скрипт
project.addSourceFilesAtPaths('src/**/*.ts')
project.addSourceFilesAtPaths('src/**/*.tsx')

// получаем все файлы нашего проекта
const files = project.getSourceFiles()
// получаем папку, в которой находятся shared-компоненты
const uiPath = path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui')
const sharedUiDirectory = project.getDirectory(uiPath)
// получаем все папки, которые находятся внутри shared-ui (AppLink, Avatar, Button, Card ...)
const componentsDirs = sharedUiDirectory?.getDirectories()

const isAbsolute = (value: string) => {
  const appLayers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages']
  if (appLayers.some(layer => value.startsWith(layer))) return true
}

componentsDirs?.forEach(directory => {
  const indexFilePath = `${directory.getPath()}/index.ts`
  const indexFile = directory.getSourceFile(indexFilePath)

  // создаем index.ts, если его нет в директории
  if (!indexFile) {
    const sourceCode = `export * from './${directory.getBaseName()}'`
    const file = directory.createSourceFile(indexFilePath, sourceCode)
    file.save()
  }

})


files.forEach(sourceFile => {
  // обращаемся ко всем импортам файла
  const importDeclarations = sourceFile.getImportDeclarations()

  // проходимся по импортам, получаем значение каждого в виде строки и переопределяем это значение с учетом
  // добавленных индексов в папках shared-слоя
  importDeclarations.forEach(importDeclaration => {
    const value = importDeclaration.getModuleSpecifierValue()
    const valueWithoutAlias = value.replace('@/', '')

    const segments = valueWithoutAlias.split('/')

    const isSharedLayer = segments?.[0] === 'shared'
    const isUISlice = segments?.[1] === 'ui'

    if (isAbsolute(valueWithoutAlias) && isSharedLayer && isUISlice) {
      // убираем последнюю часть из пути, т.е. 'shared/ui/Skeleton/Skeleton' => 'shared/ui/Skeleton'
      const result = valueWithoutAlias.split('/').slice(0, 3).join('/')
      importDeclaration.setModuleSpecifier('@/' + result)
    }
  })
})

project.save()
