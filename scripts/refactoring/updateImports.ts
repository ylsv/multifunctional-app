import {Project} from "ts-morph"

const project = new Project({})

// добавляем файлы с исходным кодом, с которыми будем работать - ts-morph будет рекурсивно по ним проходиться и выполнять скрипт
project.addSourceFilesAtPaths('src/**/*.ts')
project.addSourceFilesAtPaths('src/**/*.tsx')

// получаем все файлы нашего проекта
const files = project.getSourceFiles()

const isAbsolute = (value: string) => {
  const appLayers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages']
  if (appLayers.some(layer => value.startsWith(layer))) return true
}

files.forEach(sourceFile => {
  // обращаемся ко всем импортам файла
  const importDeclarations = sourceFile.getImportDeclarations()

  // проходимся по импортам, получаем значение каждого в виде строки и переопределяем это значение с учетом того, что
  // путь должен быть абсолютным и принадлежать к проекту, а не к сторонней библиотеке
  importDeclarations.forEach(importDeclaration => {
    const value = importDeclaration.getModuleSpecifierValue()
    if (isAbsolute(value)) {
      importDeclaration.setModuleSpecifier('@/' + value)
    }
  })
})

project.save()
