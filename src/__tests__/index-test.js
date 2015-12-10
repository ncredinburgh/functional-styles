//functional-style-sheet

import {
//  fnStyle,
//  fnStyleMerge,
//  fnStyleCasscade,
//  fnStyleElement,
  styleFn
//  componentStyleFn
} from '../index'

import expect from 'expect'

describe('fnStyle', () => {

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

})
