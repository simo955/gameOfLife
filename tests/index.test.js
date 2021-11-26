'use strict'

const tap = require('tap')

const {
  getNumberOfNeighbours,
} = require('../index')


tap.test('getNumberOfNeighbours', t => {
  t.test('for empty initConfig and (0, 0) thows error', assert => {
    const position = {
      x: 0,
      y: 0,
    }
    const initConfig = [[]]
    try {
      getNumberOfNeighbours(initConfig, position)
      assert.fail('an exception should have been thrown')
    } catch (error) {
      const expectedErrorMessage = 'Position out of bounds'
      assert.strictSame(error.message, expectedErrorMessage)
    }
    assert.end()
  })

  t.test('empty position thows error', assert => {
    const position = {}
    const initConfig = [[0, 0]]
    try {
      getNumberOfNeighbours(initConfig, position)
      assert.fail()
    } catch (error) {
      const expectedErrorMessage = 'Missing position'
      assert.strictSame(error.message, expectedErrorMessage)
    }
    assert.end()
  })

  t.test('existing position but unexisting neighbours returns 0', assert => {
    const position = {
      x: 0,
      y: 0,
    }
    const initConfig = [[0, 0]]
    const expectedNeighbours = 0
    const found = getNumberOfNeighbours(initConfig, position)
    assert.strictSame(found, expectedNeighbours)
    assert.end()
  })

  t.end()
})
