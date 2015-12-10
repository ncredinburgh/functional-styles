# Functional Styles

```bash
npm install functional-styles
```

## Style with Functions and Vars

Create functional ES2015 based style modules as an alternative to CSS. Putting component's style logic into vanilla JS modules allows them to be shared among different ecosystems (e.g. React, Angular or vanilla JS).

Style props can be functions:

```javascript
const elementStyle = {
  color: 'red',
  padding: ({ padding = 2 }) => padding + 5
  backgroundColor: ({ bgColor = 'transparent' }) => bgColor
}

export default elementStyle
```

__NOTE:__ Props which have style functions as values use ES2015 default values to make sure they render without errors when `vars` are not supplied.

## Render with toStyle

Styles can be updated at render time using a `vars` object: 

```javascript
import { toStyle } from 'functional-styles'
import elementStyle from './elementStyle'

const vars = { padding: 5, bgColor: '#fee' }
toStyle(elementStyle, vars)

// {
//   color: 'red',
//   padding: 7,
//   backgroundColor: '#fee'
// }
```

Think of `vars` as being like the [Bootstrap's Less variables](http://getbootstrap.com/customize/#less-variables). They can be used for:

* key colors
* white space
* fonts
* margins and padding

Vars objects can be stored in a database or a module:

```javascript
// ./myTheme

const myTheme = {
  spacing: 5,
  mainFont: 'Arial',
  keyColor: '#A2B51A'
}

export default myTheme
```

Functional style objects can be nested to provide all the styles needed for multiple elements in a component in their various states:

```javascript

import {toStyle} from 'functional-styles'
import myTheme from './myTheme'

const spacingFn = ({spacing = 10}) => spacing

const base = {
  display: 'inline-block',
  paddingLeft: spacingFn,
  paddingRight: spacingFn,
  fontFamily: (mainFont = 'Arial') => mainFont,
  backgroundColor: '#ccc'
}

const selected = {
  backgroundColor: ({keyColor: 'orange'} => keyColor)
}

//use object spread, Object.assign or merge for cascade
const buttonStyle = {
  base,
  selected: {...base, ...selected}
}

export default buttonStyle

toStyle(buttonStyle, myTheme)

// {
//   base: {
//     display: 'inline-block',
//     paddingLeft: 5,
//     paddingRight: 5,
//     fontFamily: 'Arial',
//     backgroundColor: '#ccc'
//   },
//   selected: {
//     display: 'inline-block',
//     paddingLeft: 5,
//     paddingRight: 5,
//     fontFamily: 'Arial',
//     backgroundColor: '#A2B51A'
//   },
// }
```

## Merging Styles

`vars` will only get you so far when it comes to customizing a component. If more power is needed then use deep merges to override props you would like to change:

```javascript
import { toStyle, merge } from 'functional-styles'

const borderRadiusFn ({ borderRadius: 3 }) => borderRadius

const overrides = {
  base: {
    borderRadiusFn
  },
  selected: {
    borderRadiusFn,
    backgroundColor: 'pink'
  }
}

const myButtonStyle = merge(buttonStyle, overrides)
toStyle(myButtonStyle, myTheme)

// {
//   base: {
//     display: 'inline-block',
//     paddingLeft: 5,
//     paddingRight: 5,
//     fontFamily: 'Arial',
//     backgroundColor: '#ccc',
//     borderRadius: 3
//   },
//   selected: {
//     display: 'inline-block',
//     paddingLeft: 5,
//     paddingRight: 5,
//     fontFamily: 'Arial',
//     backgroundColor: 'pink',
//     borderRadius: 3
//   },
// }
```






