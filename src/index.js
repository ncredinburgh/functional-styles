import { merge } from 'merge'

export const styleFn = elementStyle => (vars = {}) => {
  const props = Object.keys(elementStyle)
  const reducer = (acc, prop) => {
    const value = elementStyle[prop]
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

// export const componentStyleFn = componentStyle => (vars = {}) => {
//   const names = Object.keys(componentStyle)
//   const reducer = (acc, name) => {
//     const elementStyle = componentStyle[name]
//     acc[name] = elementStyleFn(elementStyle)(vars)
//     return acc
//   }

//   return names.reduce(reducer, {})
// }

export const casscade = (...styles) => merge.recursive(true, ...styles)

// export const casscade = (componentStyleArray) => {

//   let mergedStyles = {}

//   componentStyleArray.forEach(componentStyle => {
//     for (let name in componentStyle) if( componentStyle.hasOwnProperty( name ) ) {
//       if (!mergedStyles[name]) {
//         mergedStyles[name] = componentStyle[name]
//       } else {
//         let elementStyle = componentStyle[name]
//         for (let prop in elementStyle) if( elementStyle.hasOwnProperty( prop ) ) {
//           mergedStyles[name][prop] = elementStyle[prop]
//         }
//       }
//     }
//   })
//   return JSON.stringify(mergedStyles)
// }

export const toStyle = (fnStyle = {}, vars = {}) => (
  styleFn(fnStyle)(vars)
)

export const casscadeToStyle = (fnStyles = [], vars = {}) => (
  styleFn(merge.re(fnStyles), vars)
)
