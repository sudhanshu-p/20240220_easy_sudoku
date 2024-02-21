/* Approach - Iterate over every cell and check it's possible values in
the row, column, and subgrid. If there is only one possible value, it is final. */

import { grid, position, checkIfSolved, printGrid, getSubgrid } from "./utilities.ts"

/** Checks if a cell can be solved or not. */
function solveCell(grid: grid, currPosition: position<number>): false | number {
    // Getting the row and column values for this cell.

    const rowValues: Array<number> = grid[currPosition.yValue]
    const columnValues: Array<number> = []
    for (const index in grid) {
        columnValues.push(grid[index][currPosition.xValue])
    }

    // Represents the 3x3 subgrid inside the grid.
    const subgrid: Array<number> = getSubgrid(grid, currPosition)

    /* Using a set to keep track of all the values that exist in this cell's.
        row, column, or subgrid. */
    const valuesSet = new Set()

    // Rows
    for (const value of rowValues) {
        // Ignore 0s
        if (value === 0) continue

        if (!valuesSet.has(value)) {
            valuesSet.add(value)
        }
    }

    // Columns
    for (const value of columnValues) {
        // Ignore 0s
        if (value === 0) continue

        if (!valuesSet.has(value)) {
            valuesSet.add(value)
        }
    }

    // Subgrid
    for (const value of subgrid) {
        // Ignore 0s
        if (value === 0) continue

        if (!valuesSet.has(value)) {
            valuesSet.add(value)
        }
    }

    // If size of the set is 8, there is only 1 perfect match and we can input it there.
    if (valuesSet.size === 8) {
        for (let i = 1; i <= 9; i++) {
            if (!valuesSet.has(i)) {
                return i
            }
        }
    }

    return false

    // Further logic: 
    // We'll keep track of this set of all possible values for each cell.
    // We will then check by row, column, and subgrid, if the only place a
    // value can be in that row, column or subgrid is this cell.
    // This covers for medium puzzles on sudoku.com
}

/** Runner function to iteratively call solveCell method on each cell */
export function solveGridEasy(grid: grid): boolean | void {
    while (!checkIfSolved(grid)) {
        // If the grid ever stops changing without being solved, it can not
        // be solved
        let changed: boolean = false

        for (let yIndex = 0; yIndex < 9; yIndex++) {
            for (let xIndex = 0; xIndex < 9; xIndex++) {
                // If the value is not 0, we don't need to bother about it.
                if (grid[yIndex][xIndex] !== 0) {
                    continue
                }

                const currPosition: position<number> = {
                    xValue: xIndex,
                    yValue: yIndex
                }

                const solution = solveCell(grid, currPosition)
                if (solution) {
                    changed = true
                    console.log(`${xIndex}, ${yIndex}: ${solution}`)
                    grid[yIndex][xIndex] = solution
                }
            }
        }

        printGrid(grid)
        if (!changed) {
            console.log("The algorithm has failed yet again.")
            return false
        }
    }

    console.log("The algorithm has conquered this grid.")
    printGrid(grid)
    return true
}
