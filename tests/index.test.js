'use strict'

const tap = require('tap')

const {
  gameOfLife,
  getNumberOfAliveNeighbours,
  isAlive,
} = require('../index')

tap.test('getNumberOfAliveNeighbours', t => {
  t.test('for empty initConfig and (0, 0) thows error', assert => {
    const position = {
      x: 0,
      y: 0,
    }
    const initConfig = [
      [],
    ]
    try {
      getNumberOfAliveNeighbours(initConfig, position)
      assert.fail('an exception should have been thrown')
    } catch (error) {
      const expectedErrorMessage = 'Position out of bounds'
      assert.strictSame(error.message, expectedErrorMessage)
    }
    assert.end()
  })

  t.test('empty position thows error', assert => {
    const position = {}
    const initConfig = [
      [0, 0],
    ]
    try {
      getNumberOfAliveNeighbours(initConfig, position)
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
    const initConfig = [
      [0, 0],
    ]
    const expectedNeighbours = 0
    const found = getNumberOfAliveNeighbours(initConfig, position)
    assert.strictSame(found, expectedNeighbours)
    assert.end()
  })

  t.test('existing position but unexisting neighbours returns 0', assert => {
    const position = {
      x: 0,
      y: 0,
    }
    const initConfig = [
      [0, 1],
    ]
    const expectedNeighbours = 1
    const found = getNumberOfAliveNeighbours(initConfig, position)
    assert.strictSame(found, expectedNeighbours)
    assert.end()
  })


  t.test('existing position and no neighbours returns 0', assert => {
    const position = {
      x: 1,
      y: 1,
    }
    const initConfig = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ]
    const expectedNeighbours = 0
    const found = getNumberOfAliveNeighbours(initConfig, position)
    assert.strictSame(found, expectedNeighbours)
    assert.end()
  })


  t.test('existing position and 1 unexisting neighbours returns 1', assert => {
    const position = {
      x: 1,
      y: 1,
    }
    const initConfig = [
      [0, 0, 1],
      [0, 1, 0],
      [0, 0, 0],
    ]
    const expectedNeighbours = 1
    const found = getNumberOfAliveNeighbours(initConfig, position)
    assert.strictSame(found, expectedNeighbours)
    assert.end()
  })


  t.test('existing position and 2 unexisting neighbours returns 2', assert => {
    const position = {
      x: 1,
      y: 1,
    }
    const initConfig = [
      [0, 0, 1],
      [0, 1, 0],
      [0, 0, 2],
    ]
    const expectedNeighbours = 1
    const found = getNumberOfAliveNeighbours(initConfig, position)
    assert.strictSame(found, expectedNeighbours)
    assert.end()
  })


  t.end()
})

tap.test('isAlive', t => {
  t.test('for empty initConfig and (0, 0) thows error', assert => {
    const position = {
      x: 0,
      y: 0,
    }
    const initConfig = [
      [],
    ]
    try {
      isAlive(initConfig, position)
      assert.fail('an exception should have been thrown')
    } catch (error) {
      const expectedErrorMessage = 'Position out of bounds'
      assert.strictSame(error.message, expectedErrorMessage)
    }
    assert.end()
  })

  t.test('empty position thows error', assert => {
    const position = {}
    const initConfig = [
      [0, 0],
    ]
    try {
      isAlive(initConfig, position)
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
    const initConfig = [
      [0, 0],
    ]
    const expectedNeighbours = 0
    const found = isAlive(initConfig, position)
    assert.strictSame(found, expectedNeighbours)
    assert.end()
  })

  t.test('existing position but unexisting neighbours returns 0', assert => {
    const position = {
      x: 0,
      y: 0,
    }
    const initConfig = [
      [1, 0],
    ]
    const expectedNeighbours = 1
    const found = isAlive(initConfig, position)
    assert.strictSame(found, expectedNeighbours)
    assert.end()
  })

  t.end()
})

tap.test('gameOfLife', t => {
  t.test('for 0 steps returns the same config', assert => {
    const initConfig = [
      [0, 0, 1],
      [0, 1, 0],
      [0, 0, 0],
    ]
    const foundFinalConfig = gameOfLife(initConfig, 0)
    assert.strictSame(foundFinalConfig, initConfig)
  })
})
