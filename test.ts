import { args, cwd, lstat, makeTempDirSync, removeAll, FileInfo } from "deno";
import { test, assert } from "https://deno.land/x/testing/testing.ts";
import { mkdirp } from "./mkdirp.ts";

const root: string = `${cwd()}/${Date.now()}`; //makeTempDirSync

test(async function nestedDirs(): Promise<void> {
  const leaf: string = `${root}/levelx/levely`;
  await mkdirp(leaf);
  const info: FileInfo = await lstat(leaf);
  assert(info.isDirectory());
  await removeAll(root);
});

test(async function anyPathSeparator(): Promise<void> {
  const leaf: string = `${root}\\levelx\\levely`;
  await mkdirp(leaf);
  const info: FileInfo = await lstat(leaf.replace(/\\/g, "/"));
  assert(info.isDirectory());
  await removeAll(root);
});

test(async function failsNonDir(): Promise<void> {
  try {
    await mkdirp("./test.ts/flex.fs");
  } catch (err) {
    // TODO: assert throws DenoError kind NOT A DIRECTORY
    assert(err);
  }
});
