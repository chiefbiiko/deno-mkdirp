import { ErrorKind, FileInfo, lstat, mkdir, platform } from 'deno'

const PATH_SEPARATOR: string = platform.os === 'win' ? '\\' : '/'

export default async function mkdirp (path: string, mode?: number) : Promise<void> {
  const levels: string[] = path
    .split(PATH_SEPARATOR)
    .reduce(function (acc: string[], _: string, i: number, arr: string[]) : string[] {
      acc.push(arr.slice(0, i + 1).join(PATH_SEPARATOR))
      return acc
    }, [])
  const levels_len: number = levels.length
  for (var level: string, info: FileInfo, i: number = 0; i < levels_len; i++) {
    level = levels[i]
    try {
      info = await lstat(level)
      if (!info.isDirectory()) throw Error(`${level} is not a directory`)
    } catch (err) {
      if (err.kind !== ErrorKind.NotFound) 
        throw Error(`unexpected error kind ${err.kind}`)
      await mkdir(level, mode)
    }
  }
}