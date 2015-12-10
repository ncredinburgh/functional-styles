# Functional Styles

Create functional ES2015 based style modules as an alternative to CSS. Putting a component's styles its own module allows style logic to be shared between different ecosystems that support inline styles (e.g. React, Angular and vanilla JS).

Style props can be functions:

```javascript
const styleFn = {
  color: 'red',
  padding: ({ padding = 2 }) => padding * padding
}
```

So styles can be updated by `vars` at render time rather than compile time: 

```javascript
toStyle(elementStyle, { padding: 5 })

// {
//   color: 'red',
//   padding: 25
// }

```

Functional style object can also be used to create a styling function that accepts `vars` as config:

```javascript
const configElement = styleFn(elementStyle)
```

Creating a locked down style that can only be updated by `vars`:

```javascript
import theme from './style/theme'
// theme = { padding: 5, fontFamily: 'Arial' }

configElement(theme)

// {
//   color: 'red',
//   padding: 25
// }
```

Think of `vars` as being like the [Bootstrap's Less variables](http://getbootstrap.com/customize/#less-variables). They can be used for things like:

* key colors
* white space
* fonts
* margins and padding

NOTE: props which have style functions as values should use ES2015 default values to make sure they render without errors when `vars` are not supplied.

```javascript
{
  left: ({ margin = 2, padding = 5 }) => padding + margin
}
```






