//functional-style-sheet

import {
//  fnStyle,
//  fnStyleMerge,
//  fnStyleCasscade,
  toMergedStyles,
  mergeStyles,
  styleFn,
  toStyle
//  componentStyleFn
} from '../index'

import expect from 'expect'

describe('functional-styles', () => {

  const hoverStyle = {
    left: ({ margin = 100 }) => margin,
    ':hover': {
      color: 'pink',
      right: ({ margin = 100 }) => margin
    }
  }

  const componentStyle = {
    button: {
      left: ({ margin = 100 }) => margin,
      ':hover': {
        color: 'pink',
        right: ({ margin = 100 }) => margin
      }
    },
    link: { height: '20px' }
  }

  const elementStyle = {
    color: 'red',
    padding: ({ padding = 2 }) => padding * padding
  }

  describe('styleFn', () => {
    it('should replace functions with values for element styles', () => {
      let testee = styleFn(elementStyle)({ padding: 4 })
      expect(testee).toEqual({ color: 'red', padding: 16 })
    })

    it('should replace hover functions props with values', () => {
      let testee = styleFn(hoverStyle)({ margin: 200 })
      expect(testee).toEqual({
        left: 200,
        ':hover': {
          color: 'pink',
          right: 200
        }
      })
    })

    it('should apply default values when passed undefined', () => {
      let testee = styleFn(hoverStyle)()
      expect(testee).toEqual({
        left: 100,
        ':hover': {
          color: 'pink',
          right: 100
        }
      })
    })

    it('should replace nested functions with values', () => {
      let testee = styleFn(componentStyle)({ margin: 200 })
      expect(testee).toEqual({
        button: {
          left: 200,
          ':hover': {
            color: 'pink',
            right: 200
          }
        },
        link: { height: '20px' }
      })
    })
  })

  describe('mergeStyles', () => {
    const testee = mergeStyles(
      { a: 1, b: { x: 1, y: 2 }, c: 4 },
      { c: 5 },
      { b: { y: 3, z : 4 } }
    )

    it('should merge multiple styles', () => {
      expect(testee.a).toEqual(1)
      expect(testee.c).toEqual(5)
      expect(testee.b.z).toEqual(4)
    })

    it('later styles override older ones', () => {
      expect(testee.c).toEqual(5)
      expect(testee.b.y).toEqual(3)
    })

    it('merge should be recursive', () => {
      expect(testee.b).toEqual({ x: 1, y: 3, z: 4 })
    })

    it('should replace nested functions with values', () => {
      let testee = styleFn(componentStyle)({ margin: 200 })
      expect(testee).toEqual({
        button: {
          left: 200,
          ':hover': {
            color: 'pink',
            right: 200
          }
        },
        link: { height: '20px' }
      })
    })
  })

  describe('toStyle', () => {
    it('should replace functions with values for element styles', () => {
      let testee = toStyle(elementStyle, { padding: 4 })
      expect(testee).toEqual({ color: 'red', padding: 16 })
    })

    it('should replace hover functions props with values', () => {
      let testee = toStyle(hoverStyle, { margin: 200 })
      expect(testee).toEqual({
        left: 200,
        ':hover': {
          color: 'pink',
          right: 200
        }
      })
    })

    it('should apply default values when passed undefined', () => {
      let testee = toStyle(hoverStyle)
      expect(testee).toEqual({
        left: 100,
        ':hover': {
          color: 'pink',
          right: 100
        }
      })
    })

    it('should replace nested functions with values', () => {
      let testee = toStyle(componentStyle, { margin: 200 })
      expect(testee).toEqual({
        button: {
          left: 200,
          ':hover': {
            color: 'pink',
            right: 200
          }
        },
        link: { height: '20px' }
      })
    })
  })

})
