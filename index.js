/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
'use strict'

const lget = require('lodash.get')

function gameOfLife(initConfig, steps) {
  for (let i = 0; i < initConfig.length; i++) {
    const column = initConfig[i]
    for (let y = 0; y < initConfig.length; y++) {
      const cell = column[y]
    }
  }
}

function getNumberOfAliveNeighbours(config, position) {
  const x = lget(position, 'x', null)
  const y = lget(position, 'y', null)
  if (x === null || y === null) {
    throw new Error('Missing position')
  }
  const row = lget(config, x, [])
  const value = lget(row, y, null)
  if (value === null) {
    throw new Error('Position out of bounds')
  }
  const neighboursPositions = getNeighboursPositions(position)
  const numberOfAliveNeighbours = neighboursPositions.reduce((acc, neighbourPosition) => {
    try {
      const neighbourValue = isAlive(config, neighbourPosition)
      return acc + neighbourValue
    } catch (error) {
      return acc
    }
  }, 0)

  return numberOfAliveNeighbours
}

function isAlive(config, position) {
  const x = lget(position, 'x', null)
  const y = lget(position, 'y', null)
  if (x === null || y === null) {
    throw new Error('Missing position')
  }
  const row = lget(config, x, [])
  const value = lget(row, y, null)
  if (value === null) {
    throw new Error('Position out of bounds')
  }
  return value
}

function getNeighboursPositions(currentPosition) {
  const x = lget(currentPosition, 'x', null)
  const y = lget(currentPosition, 'y', null)
  const leftUp = {
    x: x - 1,
    y: y - 1,
  }
  const up = {
    x: x - 1,
    y,
  }
  const rightUp = {
    x: x - 1,
    y: y + 1,
  }
  const left = {
    x,
    y: y - 1,
  }
  const right = {
    x,
    y: y + 1,
  }
  const leftDown = {
    x: x + 1,
    y: y - 1,
  }
  const down = {
    x: x + 1,
    y,
  }
  const rightDown = {
    x: x + 1,
    y: y + 1,
  }
  return [
    leftUp,
    up,
    rightUp,
    left,
    right,
    leftDown,
    down,
    rightDown,
  ]
}

module.exports = {
  getNumberOfAliveNeighbours,
  isAlive,
}
