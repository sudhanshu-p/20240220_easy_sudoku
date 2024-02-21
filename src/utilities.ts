// The methods common in both approaches

// Used everywhere to represent the sudoku grid.
export type grid = Array<Array<number>>

// This Interface is used to represent x and y co-ordinates.
export interface position<T> {
    xValue: T,
    yValue: T
}

/** Checks if a grid is solved or not. */
export function checkIfSolved(grid: grid): boolean {
    // If there is any value 0 left in the entire grid, it is not solved.
    for (const gridLine of grid) {
        for (const value of gridLine) {
            if (value === 0) {
                return false
            }
        }
    }
    return true
}

/** Prettify print a Sudoku Grid */
export function printGrid(grid: grid): void {
    let printableChars: string = ""

    // Line at the top
    for (const i of Array(19)) {
        printableChars += "_"
    }

    // Numbers
    for (const gridLine of grid) {
        printableChars += "\n"
        printableChars += "|"
        for (const value of gridLine) {
            printableChars += value
            printableChars += "|"
        }
    }
    // Line at the bottom
    printableChars += "\n"
    for (const i of Array(19)) {
        printableChars += "‾"
    }

    console.log(printableChars)
}

/** Helper function to get the 3x3 subgrid of any position */
export function getSubgrid(grid: grid, currPosition: position<number>): Array<number> {

    const subgrid: Array<number> = []

    // The position of this subgrid in the context of subgrids.
    // This position * 3 serves as base index for getting the grid.
    // We can get +0, +1 and +2 from this position for the entire subgrid.
    const subgridPosition: position<number> = {
        xValue: Math.floor(currPosition.xValue / 3),
        yValue: Math.floor(currPosition.yValue / 3)
    }

    // Looping for finding neighbours
    for (let yIndex = 0; yIndex < 3; yIndex++) {
        for (let xIndex = 0; xIndex < 3; xIndex++) {
            // Check if it points at current position.
            if (yIndex === currPosition.yValue % 3
                && xIndex === currPosition.xValue % 3) {
                continue
            }

            const newPosition: position<number> = {
                xValue: xIndex,
                yValue: yIndex
            }

            subgrid.push(grid
            [subgridPosition.yValue * 3 + newPosition.yValue]
            [subgridPosition.xValue * 3 + newPosition.xValue])
        }
    }

    return subgrid
}

export function getAllNeighbourValuesSet(grid: grid, currPosition: position<number>)
    : Set<number> {
    // Getting all values inside the row
    const rowValues: Array<number> = grid[currPosition.yValue]
    // Getting all values inside the column
    const columnValues: Array<number> = []
    for (const index in grid) {
        columnValues.push(grid[index][currPosition.xValue])
    }

    // Getting all values inside the subgrid
    const subgrid: Array<number> = getSubgrid(grid, currPosition)


    /* Using a set to keep track of all the values that exist in this cell's.
    row, column, or subgrid. */
    const valuesSet: Set<number> = new Set()

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

    return valuesSet
}