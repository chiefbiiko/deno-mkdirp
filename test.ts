import { test, assert, assertEqual } from 'https://deno.land/x/testing/testing.ts'
import { ErrKind, args, lstat, removeAll, FileInfo } from 'deno'
import mkdirp from './mkdirp'

const root_dir: string = args[1] || './mkdirp_test_root_dir'
var leaf_dir: string

test('creates nested directories...', async () => {
  leaf_dir = `${root_dir}/levelx/levely`
  await mkdirp(leaf_dir)
  const info: FileInfo = await lstat(leaf_dir)
  assert(info.isDirectory(), `${leaf_dir} is not a directory`)
})

test('...irregardless of path separator', async () => {
  leaf_dir = `${root_dir}\levelx\levely`
  await mkdirp(leaf_dir)
  const info: FileInfo = await lstat(leaf_dir)
  assert(info.isDirectory(), `${leaf_dir} is not a directory`)
})

test('sets mode on all levels', async () => {
  leaf_dir = `${root_dir}/levelx`
  const mode: number = 0o744
  var info: FileInfo
  await mkdirp(leaf_dir, mode)
  info = await lstat(root_dir)
  assertEqual(info.mode, mode, `${root_dir} does not have mode ${mode}`)
  info = await lstat(leaf_dir)
  assertEqual(info.mode, mode, `${leaf_dir} does not have mode ${mode}`)
})

test('fails if the input path contains a file reference', async () => {
  try {
    await mkdirp('./test.ts/flex.fs')
  } catch (err) {
    // TODO: assert throws DenoError kind NOT A DIRECTORY
    assert(!!err)
  }
})

// TODO: await removeAll(root_dir)