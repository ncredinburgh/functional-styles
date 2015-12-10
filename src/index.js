import { default as exMerge } from 'merge'

export const toStyle = (fnStyle, vars = {}) => {
  const props = Object.keys(fnStyle)
  const reducer = (acc, prop) => {
    const value = fnStyle[prop]
    switch (typeof value) {
      case 'function':
        acc[prop] = value(vars)
        break
      case 'object':
        acc[prop] = toStyle(value, vars)
        break
      default:
        acc[prop] = value
    }
    return acc
  }

  return props.reduce(reducer, {})
}

export const merge = (...styles) => exMerge.recursive(true, ...styles)
