import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";

import { Minus } from "../src/cage/minus.ts";
import { Cell } from "../src/cell.ts";

const c1 = new Cell([0, 0]);
const c2 = new Cell([0, 1]);

function test_cage(n: number, result: number, gt: number[]) {
    const set = new Set(gt);
    const cage = new Minus(n, [c1, c2], result);
    if (!cage.cells.every((cell) => cell.possibilities == set)) {
        expect(cage.cells[0].possibilities).toEqual(set);
    }
}

describe('testing cage file, N = 5, -', () => {
    it('2 cells 2-', () => test_cage(5, 2, [1, 2, 3, 4, 5]));
    it('2 cells 3-', () => test_cage(5, 3, [1, 2, 4, 5]));
    it('2 cells 4-', () => test_cage(5, 4, [1, 5]));
});
describe('testing cage file, N = 6, -', () => {
    it('2 cells 1-', () => test_cage(6, 1, [1, 2, 3, 4, 5, 6]));
    it('2 cells 2-', () => test_cage(6, 2, [1, 2, 3, 4, 5, 6]));
    it('2 cells 3-', () => test_cage(6, 3, [1, 2, 3, 4, 5, 6]));
    it('2 cells 4-', () => test_cage(6, 4, [1, 2, 5, 6]));
    it('2 cells 5-', () => test_cage(6, 5, [1, 6]));
});