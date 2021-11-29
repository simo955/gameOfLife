'use strict'

const lget = require('lodash.get')

function gameOfLife(config, steps) {
  if (steps === 0) {
    return config
  }
  const newConfig = executeStep(config)
  return gameOfLife(newConfig, steps - 1)
}

function executeStep(config) {
  return config.map((row, x) => {
    return row.map((cell, y) => {
      return nextState(config, { x, y })
    })
  })
}

function nextState(config, position) {
  const numberOfAliveNeighbours = getNumberOfAliveNeighbours(config, position)
  const currentState = isAlive(config, position)
  if (currentState === 1) {
    if (isUnderPopulation(numberOfAliveNeighbours) || isOvercrowding(numberOfAliveNeighbours)) {
      return 0
    }
    return 1
  }
  if (currentState === 0) {
    if (isReproduction(numberOfAliveNeighbours)) {
      return 1
    }
    return 0
  }
}

function isUnderPopulation(numberOfAliveNeighbours) {
  return numberOfAliveNeighbours < 2
}

function isOvercrowding(numberOfAliveNeighbours) {
  return numberOfAliveNeighbours > 3
}

function isReproduction(numberOfAliveNeighbours) {
  return numberOfAliveNeighbours === 3
}

function getNumberOfAliveNeighbours(config, position) {
  const x = lget(position, 'x', null)
  const y = lget(position, 'y', null)
  if (x === null || y === null) {
    throw new Error('Missing position')
  }
  const row = lget(config, x, null)

  const value = lget(row, y, null)
  if (value === null) {
    throw new Error('Position out of bounds')
  }
  const neighboursPositions = getNeighboursPositions(position)
  const numberOfAliveNeighbours = neighboursPositions.reduce((currentNumberOfAliveNeighbours, neighbourPosition) => {
    try {
      const neighbourState = isAlive(config, neighbourPosition)
      return currentNumberOfAliveNeighbours + neighbourState
    } catch (error) {
      return currentNumberOfAliveNeighbours
    }
  }, 0)
  return numberOfAliveNeighbours
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

function isAlive(config, position) {
  const x = lget(position, 'x', null)
  const y = lget(position, 'y', null)
  if (x === null || y === null) {
    throw new Error('Missing position')
  }
  const row = lget(config, x, null)
  const value = lget(row, y, null)
  if (value === null) {
    throw new Error('Position out of bounds')
  }
  return value
}

module.exports = {
  getNumberOfAliveNeighbours,
  isAlive,
  nextState,
  executeStep,
  gameOfLife,
}
