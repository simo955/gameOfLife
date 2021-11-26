/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
'use strict'

const lget = require('lodash.get')
function gameOfLife(initConfig, steps) {

}


function getNumberOfNeighbours(config, position) {
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
  return 0
}

module.exports = {
  getNumberOfNeighbours,
}
