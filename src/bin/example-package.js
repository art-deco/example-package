/*!
 * @artdeco/example-package: My New Example Package.
 *
 * Copyright (C) 2020  Art Deco Code Limited
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { _help, _init, _output, _version, _input, argsConfig } from './get-args'
import { reduceUsage } from 'argufy'
import usually from 'usually'
import { readFileSync, writeFileSync } from 'fs'
import { c } from 'erte'
import Init from './commands/init'
import examplePackage from '../'

if (_help) {
  const usage = usually({
    description: 'My New Example Package.',
    example: 'example-package example.txt -o out.txt',
    line: 'example-package input [-o output] [-ihv]',
    usage: reduceUsage(argsConfig),
  })
  console.log(usage)
  process.exit(0)
} else if (_version) {
  console.log(require('../../package.json').version)
  process.exit(0)
}

(async () => {
  try {
    if (_init) return await Init()
    if (!_input) throw new Error('Please pass an input file.')
    const content = /** @type {string} */ (readFileSync(_input, 'utf8'))
    const output = await examplePackage({
      shouldRun: true,
      text: content,
    })
    if (_output == '-') console.log(output)
    else writeFileSync(_output, output)
    console.error('File %s successfully processed.', c(_input, 'yellow'))
  } catch (err) {
    if (process.env['DEBUG']) console.error(err.stack)
    else console.log(err.message)
  }
})()