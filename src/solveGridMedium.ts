/* In the medium level problems, the easy approach is not enough. 
We will also need to additionally check if a row / column / subgrid can only 
have a value at a particular cell. If that is the case, write it there.*/

import {
    position, grid, checkIfSolved, printGrid, getSubgrid,
    getAllNeighbourValuesSet
} from "./utilities"

function getPossibleValues(grid: grid, currPosition: position<number>):
    Array<number> | number {

    const valuesSet = getAllNeighbourValuesSet(grid, currPosition)

    // Compliment of this valuesSet = answer
    const outputSet: Array<number> = []
    for (let index = 1; index <= 9; index++) {
        if (!valuesSet.has(index)) {
            outputSet.push(index)
        }
    }

    // If only one possible value
    if (outputSet.length === 1) {
        // Setting it in the grid
        grid[currPosition.yValue][currPosition.xValue] = outputSet[0]
        return outputSet[0]
    }

    return outputSet
}

function checkAndFillPossibleValues(grid: grid,
    possibleValues: Array<grid> | grid): boolean {

    let changed = false

    // Going Row wise first
    // First, we'll have an array of all the absolute values in the row.
    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
    }

    return changed
}

export function solveGridMedium(grid: grid) {
    while (!checkIfSolved) {
        let changed: boolean = false

        /* 3d Array (Sometimes 2d) representing 
        1. Number - Absolute value at the position in the grid.
        2. Array - All possible values at that position in the grid.
        */
        const possibleValues: Array<grid> | grid = []

        // Vertical rows
        for (let yIndex = 0; yIndex < 9; yIndex++) {
            // Horizontal columns
            for (let xIndex = 0; xIndex < 9; xIndex++) {
                if (grid[yIndex][xIndex] !== 0) {
                    // Not in an array format => Absolute value.
                    possibleValues[yIndex][xIndex] = grid[yIndex][xIndex]
                    continue
                }

                const currPosition: position<number> = {
                    xValue: xIndex,
                    yValue: yIndex
                }

                // Taking and feeding all possible values for the 
                possibleValues[yIndex][xIndex] =
                    getPossibleValues(grid, currPosition)
            }
        }

        // Till here, we have a perfectly full 3d array of all possible values
        // Now, we need to check and fill them.
        changed = checkAndFillPossibleValues(grid, possibleValues)

        // Lose case
        if (!changed) {
            console.log("The algorithm has been conquered by this grid.")
            printGrid(grid)
            return false
        }
    }

    // Win case
    console.log("The algorithm has conquered this grid.")
    printGrid(grid)
    return true
}