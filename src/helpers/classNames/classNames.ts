// Record - специальный тип, которй позволяет создавать объект с комбинацией определенных свойств
// (т.е. просто объект с ограниченным количеством значений)
type Mods = Record<string, boolean | string>

export function classNames(cls: string, mods: Mods, additional: string[]): string {
    return [
        cls,
        ...additional,
        Object.entries(mods)
            .filter(([className, value]) => Boolean(value))
            .map(([className, value]) => className)
    ].join(' ')
}
