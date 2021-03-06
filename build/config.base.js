import typescript from 'rollup-plugin-typescript'
// 替换代码中的 process.env.NODE_ENV
import replace from 'rollup-plugin-replace'
// 输出打包后的文件大小
import filesize from 'rollup-plugin-filesize'
// 压缩
import buble from 'rollup-plugin-buble'
// 压缩
import { terser } from 'rollup-plugin-terser'
// 本地服务器
import serve from 'rollup-plugin-serve'

import { name, version, author, license } from '../package.json'

const banner =
  `${'/**\n' + ' * '}${name}.js v${version}\n` +
  ` * (c) 2017-${new Date().getFullYear()} ${author}\n` +
  ` * Released under the ${license} License.\n` +
  ` */\n`;

const sourcemap = true

const suffix = '.js'

export default function (env, minify = false, legacy = false, port = 0) {

  let plugins = [
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
      'process.env.NODE_VERSION': JSON.stringify(version),
      'process.env.NODE_LEGACY': legacy
    }),
    typescript(),
    // buble 比 typescript 直接转 ES3 效果更好
    buble()
  ]

  let dir = (legacy ? 'legacy' : 'standard') + '/' + env

  if (minify) {
    plugins.push(
      terser()
    )
  }

  plugins.push(
    filesize()
  )

  if (port) {
    plugins.push(
      serve({
        port,
        contentBase: ['']
      })
    )
  }

  return [
    {
      input: 'src/Yox.ts',
      output: [
        // umd
        {
          file: `dist/${dir}/${name}${suffix}`,
          format: 'umd',
          name: 'Yox',
          banner,
          sourcemap,
        },
        // cjs
        {
          file: `dist/${dir}/${name}.cjs${suffix}`,
          format: 'cjs',
          banner,
          sourcemap,
        },
        // esm
        {
          file: `dist/${dir}/${name}.esm${suffix}`,
          format: 'es',
          banner,
          sourcemap,
        }
      ],
      plugins
    }
  ]
}