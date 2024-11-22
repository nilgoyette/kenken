import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";

import { Divide } from "../src/cage/divide.ts";
import { Cell } from "../src/cell.ts";

const c1 = new Cell([0, 0]);
const c2 = new Cell([0, 1]);

function test_cage(n: number, result: number, gt: number[]) {
    const set = new Set(gt);
    const cage = new Divide(n, [c1, c2], result);
    if (!cage.cells.every((cell) => cell.possibilities == set)) {
        expect(cage.cells[0].possibilities).toEqual(set);
    }
}

describe('testing /, all N', () => {
    it('4x4, 2/', () => test_cage(4, 2, [1, 2, 4]));

    it('5x5, 2/', () => test_cage(5, 2, [1, 2, 4]));

    it('6x6 2/', () => test_cage(6, 2, [1, 2, 3, 4, 6]));
    it('6x6 3/', () => test_cage(6, 3, [1, 2, 3, 6]));

    it('7x7 2/', () => test_cage(7, 2, [1, 2, 3, 4, 6]));
    it('7x7 3/', () => test_cage(7, 3, [1, 2, 3, 6]));

    it('8x8 2/', () => test_cage(8, 2, [1, 2, 3, 4, 6, 8]));
    it('8x8 3/', () => test_cage(8, 3, [1, 2, 3, 6]));
    it('8x8 4/', () => test_cage(8, 4, [1, 2, 4, 8]));

    it('9x9 2/', () => test_cage(9, 2, [1, 2, 3, 4, 6, 8]));
    it('9x9 3/', () => test_cage(9, 3, [1, 2, 3, 6, 9]));
    it('9x9 4/', () => test_cage(9, 4, [1, 2, 4, 8]));
});
