'use strict'

const tap = require('tap')

const {
  isAlive,
  getNumberOfAliveNeighbours,
  nextState,
  executeStep,
  gameOfLife,
} = require('../index')

tap.test('isAlive', t => {
  t.test('returns 1 because cell is alive ', assert => {
    const config = [[0, 1]]
    const position = {
      x: 0,
      y: 1,
    }
    const found = isAlive(config, position)
    assert.same(found, 1)
    assert.end()
  })
  t.test('returns error because position is out of bound ', assert => {
    const config = [[0, 1]]
    const position = {
      x: 0,
      y: 2,
    }

    try {
      isAlive(config, position)
    } catch (error) {
      const expectedErrorMessage = 'Position out of bounds'
      assert.strictSame(error.message, expectedErrorMessage)
    }
    assert.end()
  })
  t.test('returns 0 because cell is death ', assert => {
    const config = [[0, 1]]
    const position = {
      x: 0,
      y: 0,
    }
    const found = isAlive(config, position)
    assert.same(found, 0)
    assert.end()
  })
  t.end()
})

tap.test('getNumberOfAliveNeighbours', t => {
  t.test('throws error because config is empy ', assert => {
    const config = [[]]
    const position = {
      x: 0,
      y: 2,
    }

    try {
      getNumberOfAliveNeighbours(config, position)
    } catch (error) {
      const expectedErrorMessage = 'Position out of bounds'
      assert.strictSame(error.message, expectedErrorMessage)
    }
    assert.end()
  })
  t.test('return 0 because there s just one element ', assert => {
    const config = [[0]]
    const position = {
      x: 0,
      y: 0,
    }

    const found = getNumberOfAliveNeighbours(config, position)
    assert.same(found, 0)
    assert.end()
  })
  t.test('returns the number of alive neighbours', assert => {
    const config = [[0, 0, 0], [0, 1, 0], [0, 0, 0]]
    const position = {
      x: 0,
      y: 1,
    }

    const found = getNumberOfAliveNeighbours(config, position)
    assert.same(found, 1)
    assert.end()
  })
  t.test('returns the number of alive neighbours', assert => {
    const config = [[0, 0, 0], [0, 1, 0], [0, 0, 0]]
    const position = {
      x: 2,
      y: 2,
    }

    const found = getNumberOfAliveNeighbours(config, position)
    assert.same(found, 1)
    assert.end()
  })
  t.test('returns the number of alive neighbours', assert => {
    const config = [[0, 0, 0], [0, 1, 0], [0, 0, 0], [0, 0, 0]]
    const position = {
      x: 3,
      y: 2,
    }

    const found = getNumberOfAliveNeighbours(config, position)
    assert.same(found, 0)
    assert.end()
  })
  t.end()
})


tap.test('nextState', t => {
  t.test('throws error because config is empy ', assert => {
    const config = [[]]
    const position = {
      x: 0,
      y: 2,
    }

    try {
      nextState(config, position)
    } catch (error) {
      const expectedErrorMessage = 'Position out of bounds'
      assert.strictSame(error.message, expectedErrorMessage)
    }
    assert.end()
  })
  t.test('Se ALIVE diventa DEAD se ha memo di 2 vicini', assert => {
    const config = [[1, 0]]
    const position = {
      x: 0,
      y: 0,
    }

    const found = nextState(config, position)
    assert.same(found, 0)
    assert.end()
  })
  t.test('Se ALIVE diventa DEAD se ha più di 3 vicini', assert => {
    const config = [[1, 1, 0], [1, 1, 0], [1, 1, 0]]
    const position = {
      x: 1,
      y: 0,
    }

    const found = nextState(config, position)
    assert.same(found, 0)
    assert.end()
  })
  t.test('Se ALIVE rimane ALIVE se ha 2 o 3 vicini', assert => {
    const config = [[1, 1, 0], [1, 1, 0]]
    const position = {
      x: 0,
      y: 0,
    }

    const found = nextState(config, position)
    assert.same(found, 1)
    assert.end()
  })
  t.test('Se DEAD diventa ALIVE se ha 3 vicini', assert => {
    const config = [[0, 1, 0], [1, 1, 0]]
    const position = {
      x: 0,
      y: 0,
    }

    const found = nextState(config, position)
    assert.same(found, 1)
    assert.end()
  })
  t.test('Se DEAD rimane DEAD se ha un numero diverso di 3 vicini', assert => {
    const config = [[0, 0, 0], [1, 1, 0]]
    const position = {
      x: 0,
      y: 0,
    }

    const found = nextState(config, position)
    assert.same(found, 0)
    assert.end()
  })
  t.end()
})

tap.test('executeStep', t => {
  t.test('throws error because config is empy ', assert => {
    const config = [[]]
    try {
      executeStep(config)
    } catch (error) {
      const expectedErrorMessage = 'Position out of bounds'
      assert.strictSame(error.message, expectedErrorMessage)
    }
    assert.end()
  })
  t.test('executeStep next configuration', assert => {
    const config = [[0]]
    const expected = config

    const found = executeStep(config)
    assert.same(found, expected)
    assert.end()
  })
  t.test('executeStep next configuration', assert => {
    const config = [[0, 1, 0], [0, 1, 0], [0, 1, 0]]
    const expected = [[0, 0, 0], [1, 1, 1], [0, 0, 0]]

    const found = executeStep(config)
    assert.same(found, expected)
    assert.end()
  })
  t.end()
})

tap.test('gameOfLife', t => {
  t.test('throws error because config is empy ', assert => {
    const config = [[]]
    try {
      gameOfLife(config, 5)
    } catch (error) {
      const expectedErrorMessage = 'Position out of bounds'
      assert.strictSame(error.message, expectedErrorMessage)
    }
    assert.end()
  })
  t.test('executeStep next configuration', assert => {
    const config = [[0]]
    const expected = config

    const found = gameOfLife(config, 0)
    assert.same(found, expected)
    assert.end()
  })

  t.test('executeStep next configuration', assert => {
    const config = [[0, 1, 0], [0, 1, 0], [0, 1, 0]]
    const expected = [[0, 0, 0], [1, 1, 1], [0, 0, 0]]

    const found = gameOfLife(config, 9)
    assert.same(found, expected)
    assert.end()
  })

  t.test('executeStep next configuration', assert => {
    const config = [[0, 1, 0], [0, 1, 0], [0, 1, 0]]

    const found = gameOfLife(config, 100)
    assert.same(found, config)
    assert.end()
  })
  t.test('executeStep next configuration', assert => {
    const config = [[1, 0, 0], [1, 1, 0], [1, 0, 0]]
    const expected = [[1, 1, 0], [1, 1, 0], [1, 1, 0]]

    const found = gameOfLife(config, 1)
    assert.same(found, expected)
    assert.end()
  })

  t.end()
})
