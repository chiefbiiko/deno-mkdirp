import { args, lstat, removeAll, FileInfo } from 'deno'
import { test, assert } from 'https://deno.land/x/testing/testing.ts'
import mkdirp from './mkdirp.ts'

const root_dir: string = args[1] || './mkdirp_test_root_dir'

test(async function nestedDirs () : Promise<void> {
  const leaf_dir: string = `${root_dir}/levelx/levely`
  await mkdirp(leaf_dir)
  const info: FileInfo = await lstat(leaf_dir)
  assert(info.isDirectory())
  await removeAll(root_dir)
})

test(async function anyPathSeparator () : Promise<void> {
  const leaf_dir: string = `${root_dir}\\levelx\\levely`
  await mkdirp(leaf_dir)
  const info: FileInfo = await lstat(leaf_dir.replace(/\\/g, '/'))
  assert(info.isDirectory())
  await removeAll(root_dir)
})

test(async function failsNonDir () : Promise<void> {
  try {
    await mkdirp('./test.ts/flex.fs')
  } catch (err) {
    // TODO: assert throws DenoError kind NOT A DIRECTORY
    assert(err)
  }
})