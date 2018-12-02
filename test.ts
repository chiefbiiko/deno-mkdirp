import { args, exit, lstat, removeAll } from 'deno'
import mkdirp from './mkdirp'

const root_dir: string = args[1] || './mkdirp_test_root_dir'
const leaf_dir: string = `${root_dir}/levelx/levely`

const test_end: Function = async (code?: number) : Promise<void> => {
  try { await removeAll(root_dir) } catch (_) {}
  exit(code)
}

const test: Function = async () : Promise<void> => {
  try {
    await mkdirp(leaf_dir, 0o744)
    if (!(await lstat(leaf_dir)).isDirectory()) {
      console.error('not ok mkdirp')
      await test_end(1)
    } else {
      console.log('ok mkdirp\ntest passed')
      await test_end(0)
    }
  } catch (err) {
    console.error('test failed', err.stack)
    await test_end(1)
  }
}

test()
