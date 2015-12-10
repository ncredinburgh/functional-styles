# Functional Styles

Functional Style Modules is an ES6 based format for creating configurable dynamic inline styles that can be shared between different ecosystems (e.g. React, Angular, vanilla JS).

Styles can be configured with `vars`:

e.g.

```javascript
const elementStyle = {
  color: 'red',
  padding: ({ padding = 2 }) => padding * padding
}

toStyle(elementStyle, { padding: 5 })

//returns
{
  color: 'red',
  padding: 25
}

```

