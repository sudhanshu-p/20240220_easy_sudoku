import fs from "fs";
import { solveGridEasy } from "./src/solveGridEasy"
import { printGrid, grid } from "./src/utilities";

const PATH_TO_PUZZLE = "./puzzles/puzzle1.txt"
const SIDELENGTH = 9

/** Reads a file and returns it's contents */
function readFile(path: string): string {
    const fileContents = fs.readFileSync(path,
        {
            encoding: 'utf8',
            flag: 'r'
        })

    return fileContents
}

/** Converts a given string format grid into an array of array of numbers grid */
function gridParser(puzzleString: string): grid {
    // Get each seperate line
    const linesOfStrings: Array<string> = puzzleString.split("\r\n")
    const outputGrid: grid = []

    // For each line, split into each char and map into numeric values.
    for (const stringLine of linesOfStrings) {
        const arrayOfValues = stringLine.split(" ").map(
            (charachter) => +charachter
        )
        outputGrid.push(arrayOfValues)
    }

    return outputGrid
}

function testingFunction() {
    const grid = gridParser(readFile(PATH_TO_PUZZLE))
    printGrid(grid)
    return solveGridEasy(grid)
}

testingFunction()
