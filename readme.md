# deno-mkdirp

[![Travis](http://img.shields.io/travis/chiefbiiko/deno-mkdirp.svg?style=flat)](http://travis-ci.org/chiefbiiko/deno-mkdirp) [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/chiefbiiko/deno-mkdirp?branch=master&svg=true)](https://ci.appveyor.com/project/chiefbiiko/deno-mkdirp)

***

`mkdir -p` 4 `deno`.

***

## Import

``` ts
import mkdirp from 'https://raw.githubusercontent.com/chiefbiiko/deno-mkdirp/master/mkdirp.ts'
```

***

## API

Same as [`deno.mkdir`](https://deno.land/typedoc/index.html#mkdir).

### `mkdirp(path: string, mode?: number) : Promise<void>`

Create directories if they do not already exist and make parent directories as needed.

***

## License

[MIT](./license.md)