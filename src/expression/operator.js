
import * as env from '../config/env'
import * as object from '../util/object'

import Unary from './node/Unary'
import Binary from './node/Binary'

/**
 * 倒排对象的 key
 *
 * @param {Object} obj
 * @return {Array.<string>}
 */
function sortKeys(obj) {
  return object.keys(obj).sort(
    function (a, b) {
      return b.length - a.length
    }
  )
}

// 一元操作符
export const unaryMap = { }
unaryMap[Unary.PLUS] =
unaryMap[Unary.MINUS] =
unaryMap[Unary.BANG] =
unaryMap[Unary.WAVE] = env.TRUE

export const unaryList = sortKeys(unaryMap)


// 二元操作符
// 操作符和对应的优先级，数字越大优先级越高
export const binaryMap = { }
binaryMap[Binary.OR] = 1
binaryMap[Binary.AND] = 2
binaryMap[Binary.LE] = 3
binaryMap[Binary.LNE] = 3
binaryMap[Binary.SE] = 3
binaryMap[Binary.SNE] = 3
binaryMap[Binary.LT] = 4
binaryMap[Binary.LTE] = 4
binaryMap[Binary.GT] = 4
binaryMap[Binary.GTE] = 4
binaryMap[Binary.PLUS] = 5
binaryMap[Binary.MINUS] = 5
binaryMap[Binary.MULTIPLY] = 6
binaryMap[Binary.DIVIDE] = 6
binaryMap[Binary.MODULO] = 6

export const binaryList = sortKeys(binaryMap)
