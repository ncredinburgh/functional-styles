import merge from 'merge'

export const styleFn = fnStyle => (vars = {}) => {
  const props = Object.keys(fnStyle)
  const reducer = (acc, prop) => {
    const value = fnStyle[prop]
    switch (typeof value) {
      case 'function':
        acc[prop] = value(vars)
        break
      case 'object':
        acc[prop] = styleFn(value)(vars)
        break
      default:
        acc[prop] = value
    }
    return acc
  }

  return props.reduce(reducer, {})
}

export const toStyle = (fnStyle = {}, vars = {}) => (
  styleFn(fnStyle)(vars)
)

export const mergeStyles = (...styles) => merge.recursive(true, ...styles)

// would be nice to auto extract vars used in a style for tooling
// but need transpillers will cause problems
export const extractVars = (fnStyle) => {
  const text = fnStyle.toString()
  text.match(/_ref\.([^;])/g)
}
