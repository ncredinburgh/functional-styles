# Functional Styles

Functional Style Modules is an ES2015 based format for creating configurable dynamic inline styles that can be shared between different ecosystems (e.g. React, Angular, vanilla JS).

Styles can be configured with `vars`:

```javascript
const styleFn = {
  color: 'red',
  padding: ({ padding = 2 }) => padding * padding
}
```

Then instantiated: 

```javascript
toStyle(elementStyle, { padding: 5 })

// {
//   color: 'red',
//   padding: 25
// }

```

Or used to create a styling function that accepts `vars` as config:

```javascript
const configElement = styleFn(elementStyle)
```

This allows us to lock down components so they can only be style by `vars`. Think of `vars` as being like the [Bootstrap's Less variables](http://getbootstrap.com/customize/#less-variables).

```javascript
import theme from './style/theme'
// theme = { padding: 5, fontFamily: 'Arial' }

configElement(theme)

// {
//   color: 'red',
//   padding: 25
// }
```

NOTE: props which have style functions as values should use ES2015 default values to make sure they render without errors when `vars` are not supplied.

```javascript
{
  left: ({ margin = 2, padding = 5 }) => padding + margin
}
```






