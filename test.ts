import { args, exit, lstat } from 'deno'
import mkdirp from './mkdirp'

const TEST_DIR: string = `${args[1] || './testdir'}/levelx/levely`

async function test () : Promise<void> {
  try {
    await mkdirp(TEST_DIR, 0o744)
    if (!(await lstat(TEST_DIR)).isDirectory()) {
      console.error('not ok mkdirp')
      exit(1)
    } else {
      console.log('ok mkdirp')
      console.log('test passed')
      exit(0)
    }
  } catch (err) {
    console.error('test failed', err.stack)
    exit(1)
  }
}

test()