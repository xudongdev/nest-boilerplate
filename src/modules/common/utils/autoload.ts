import * as glob from 'glob';
import { join } from 'path';

export function autoload(pattern) {
  let output = [];
  glob.sync(join(pattern, '**/*{.ts,.js}')).forEach(file => {
    const modules = require(file);
    if (modules) {
      output = [...output, ...Object.keys(modules).map(key => modules[key])];
    }
  });
  return output;
}
