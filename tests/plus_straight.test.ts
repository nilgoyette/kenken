import { describe, it } from "jsr:@std/testing/bdd";

import { Plus } from "../src/cage/plus.ts";
import { Cell } from "../src/cell.ts";
import { test_cage_generic } from "./utils.ts"

const _c1 = new Cell([0, 0]);
const _c2 = new Cell([0, 1]);
const _c3 = new Cell([0, 2]);
const _c4 = new Cell([0, 3]);
const _c5 = new Cell([0, 4]);
const _c6 = new Cell([0, 5]);
const _c7 = new Cell([0, 6]);
const c2 = [_c1, _c2];
const c3 = [_c1, _c2, _c3];
const c4 = [_c1, _c2, _c3, _c4];
const c5 = [_c1, _c2, _c3, _c4, _c5];
const c6 = [_c1, _c2, _c3, _c4, _c5, _c6];
const c7 = [_c1, _c2, _c3, _c4, _c5, _c6, _c7];

function test_cage(n: number, cells: Cell[], result: number, gt: number[]) {
    test_cage_generic(Plus, n, cells, result, gt);
}

describe('testing +, N = 3', () => {
    const N = 3;
    it('2 cells 3+', () => test_cage(N, c2, 3, [1, 2]));
    it('2 cells 4+', () => test_cage(N, c2, 4, [1, 3]));
    it('2 cells 5+', () => test_cage(N, c2, 5, [2, 3]));

    it('3 cells 6+', () => test_cage(N, c3, 6, [1, 2, 3]));
});

describe('testing +, N = 4', () => {
    const N = 4;
    it('2 cells 3+', () => test_cage(N, c2, 3, [1, 2]));
    it('2 cells 4+', () => test_cage(N, c2, 4, [1, 3]));
    it('2 cells 5+', () => test_cage(N, c2, 5, [1, 2, 3, 4]));
    it('2 cells 6+', () => test_cage(N, c2, 6, [2, 4]));
    it('2 cells 7+', () => test_cage(N, c2, 7, [3, 4]));

    it('3 cells 6+', () => test_cage(N, c3, 6, [1, 2, 3]));
    it('3 cells 7+', () => test_cage(N, c3, 7, [1, 2, 4]));
    it('3 cells 8+', () => test_cage(N, c3, 8, [1, 3, 4]));
    it('3 cells 9+', () => test_cage(N, c3, 9, [2, 3, 4]));
    
    it('4 cells 10+', () => test_cage(N, c4, 10, [1, 2, 3, 4]));
});

describe('testing +, N = 5', () => {
    const N = 5;
    it('2 cells 3+', () => test_cage(N, c2, 3, [1, 2]));
    it('2 cells 4+', () => test_cage(N, c2, 4, [1, 3]));
    it('2 cells 5+', () => test_cage(N, c2, 5, [1, 2, 3, 4]));
    it('2 cells 6+', () => test_cage(N, c2, 6, [1, 2, 4, 5]));
    it('2 cells 7+', () => test_cage(N, c2, 7, [2, 3, 4, 5]));
    it('2 cells 8+', () => test_cage(N, c2, 8, [3, 5]));
    it('2 cells 9+', () => test_cage(N, c2, 9, [4, 5]));

    it('3 cells 6+', () => test_cage(N, c3, 6, [1, 2, 3]));
    it('3 cells 7+', () => test_cage(N, c3, 7, [1, 2, 4]));
    it('3 cells 8+', () => test_cage(N, c3, 8, [1, 2, 3, 4, 5]));
    it('3 cells 9+', () => test_cage(N, c3, 9, [1, 2, 3, 4, 5]));
    it('3 cells 10+', () => test_cage(N, c3, 10, [1, 2, 3, 4, 5]));
    it('3 cells 11+', () => test_cage(N, c3, 11, [2, 4, 5]));
    it('3 cells 12+', () => test_cage(N, c3, 12, [3, 4, 5]));

    it('4 cells 10+', () => test_cage(N, c4, 10, [1, 2, 3, 4]));
    it('4 cells 11+', () => test_cage(N, c4, 11, [1, 2, 3, 5]));
    it('4 cells 12+', () => test_cage(N, c4, 12, [1, 2, 4, 5]));
    it('4 cells 13+', () => test_cage(N, c4, 13, [1, 3, 4, 5]));
    it('4 cells 14+', () => test_cage(N, c4, 14, [2, 3, 4, 5]));

    it('5 cells 15+', () => test_cage(N, c5, 15, [1, 2, 3, 4, 5]));
});

describe('testing +, N = 6', () => {
    const N = 6;
    it('2 cells 3+', () => test_cage(N, c2, 3, [1, 2]));
    it('2 cells 4+', () => test_cage(N, c2, 4, [1, 3]));
    it('2 cells 5+', () => test_cage(N, c2, 5, [1, 2, 3, 4]));
    it('2 cells 6+', () => test_cage(N, c2, 6, [1, 2, 4, 5]));
    it('2 cells 7+', () => test_cage(N, c2, 7, [1, 2, 3, 4, 5, 6]));
    it('2 cells 8+', () => test_cage(N, c2, 8, [2, 3, 5, 6]));
    it('2 cells 9+', () => test_cage(N, c2, 9, [3, 4, 5, 6]));

    it('3 cells 6+', () => test_cage(N, c3, 6, [1, 2, 3]));
    it('3 cells 7+', () => test_cage(N, c3, 7, [1, 2, 4]));
    it('3 cells 8+', () => test_cage(N, c3, 8, [1, 2, 3, 4, 5]));
    it('3 cells 9+', () => test_cage(N, c3, 9, [1, 2, 3, 4, 5, 6]));
    it('3 cells 10+', () => test_cage(N, c3, 10, [1, 2, 3, 4, 5, 6]));
    it('3 cells 11+', () => test_cage(N, c3, 11, [1, 2, 3, 4, 5, 6]));
    it('3 cells 12+', () => test_cage(N, c3, 12, [1, 2, 3, 4, 5, 6]));
    it('3 cells 13+', () => test_cage(N, c3, 13, [2, 3, 4, 5, 6]));
    it('3 cells 14+', () => test_cage(N, c3, 14, [3, 5, 6]));
    it('3 cells 15+', () => test_cage(N, c3, 15, [4, 5, 6]));

    it('4 cells 10+', () => test_cage(N, c4, 10, [1, 2, 3, 4]));
    it('4 cells 11+', () => test_cage(N, c4, 11, [1, 2, 3, 5]));
    it('4 cells 12+', () => test_cage(N, c4, 12, [1, 2, 3, 4, 5, 6]));
    it('4 cells 13+', () => test_cage(N, c4, 13, [1, 2, 3, 4, 5, 6]));
    it('4 cells 14+', () => test_cage(N, c4, 14, [1, 2, 3, 4, 5, 6]));
    it('4 cells 15+', () => test_cage(N, c4, 15, [1, 2, 3, 4, 5, 6]));
    it('4 cells 16+', () => test_cage(N, c4, 16, [1, 2, 3, 4, 5, 6]));
    it('4 cells 17+', () => test_cage(N, c4, 17, [2, 4, 5, 6]));
    it('4 cells 18+', () => test_cage(N, c4, 18, [3, 4, 5, 6]));

    it('5 cells 15+', () => test_cage(N, c5, 15, [1, 2, 3, 4, 5]));
    it('5 cells 16+', () => test_cage(N, c5, 16, [1, 2, 3, 4, 6]));
    it('5 cells 17+', () => test_cage(N, c5, 17, [1, 2, 3, 5, 6]));
    it('5 cells 18+', () => test_cage(N, c5, 18, [1, 2, 4, 5, 6]));
    it('5 cells 19+', () => test_cage(N, c5, 19, [1, 3, 4, 5, 6]));
    it('5 cells 20+', () => test_cage(N, c5, 20, [2, 3, 4, 5, 6]));

    it('6 cells 21+', () => test_cage(N, c6, 21, [1, 2, 3, 4, 5, 6]));
});

describe('testing +, N = 7', () => {
    const N = 7;
    it('2 cells 3+', () => test_cage(N, c2, 3, [1, 2]));
    it('2 cells 4+', () => test_cage(N, c2, 4, [1, 3]));
    it('2 cells 5+', () => test_cage(N, c2, 5, [1, 2, 3, 4]));
    it('2 cells 6+', () => test_cage(N, c2, 6, [1, 2, 4, 5]));
    it('2 cells 7+', () => test_cage(N, c2, 7, [1, 2, 3, 4, 5, 6]));
    it('2 cells 8+', () => test_cage(N, c2, 8, [1, 2, 3, 5, 6, 7]));
    it('2 cells 9+', () => test_cage(N, c2, 9, [2, 3, 4, 5, 6, 7]));
    it('2 cells 10+', () => test_cage(N, c2, 10, [3, 4, 6, 7]));
    it('2 cells 11+', () => test_cage(N, c2, 11, [4, 5, 6, 7]));
    it('2 cells 12+', () => test_cage(N, c2, 12, [5, 7]));
    it('2 cells 13+', () => test_cage(N, c2, 13, [6, 7]));

    it('3 cells 6+', () => test_cage(N, c3, 6, [1, 2, 3]));
    it('3 cells 7+', () => test_cage(N, c3, 7, [1, 2, 4]));
    it('3 cells 8+', () => test_cage(N, c3, 8, [1, 2, 3, 4, 5]));
    it('3 cells 9+', () => test_cage(N, c3, 9, [1, 2, 3, 4, 5, 6]));
    it('3 cells 10+', () => test_cage(N, c3, 10, [1, 2, 3, 4, 5, 6, 7]));
    it('3 cells 11+', () => test_cage(N, c3, 11, [1, 2, 3, 4, 5, 6, 7]));
    it('3 cells 12+', () => test_cage(N, c3, 12, [1, 2, 3, 4, 5, 6, 7]));
    it('3 cells 13+', () => test_cage(N, c3, 13, [1, 2, 3, 4, 5, 6, 7]));
    it('3 cells 14+', () => test_cage(N, c3, 14, [1, 2, 3, 4, 5, 6, 7]));
    it('3 cells 15+', () => test_cage(N, c3, 15, [2, 3, 4, 5, 6, 7]));
    it('3 cells 16+', () => test_cage(N, c3, 16, [3, 4, 5, 6, 7]));
    it('3 cells 17+', () => test_cage(N, c3, 17, [4, 6, 7]));
    it('3 cells 18+', () => test_cage(N, c3, 18, [5, 6, 7]));

    it('4 cells 10+', () => test_cage(N, c4, 10, [1, 2, 3, 4]));
    it('4 cells 11+', () => test_cage(N, c4, 11, [1, 2, 3, 5]));
    it('4 cells 12+', () => test_cage(N, c4, 12, [1, 2, 3, 4, 5, 6]));
    it('4 cells 13+', () => test_cage(N, c4, 13, [1, 2, 3, 4, 5, 6, 7]));
    it('4 cells 14+', () => test_cage(N, c4, 14, [1, 2, 3, 4, 5, 6, 7]));
    it('4 cells 15+', () => test_cage(N, c4, 15, [1, 2, 3, 4, 5, 6, 7]));
    it('4 cells 16+', () => test_cage(N, c4, 16, [1, 2, 3, 4, 5, 6, 7]));
    it('4 cells 17+', () => test_cage(N, c4, 17, [1, 2, 3, 4, 5, 6, 7]));
    it('4 cells 18+', () => test_cage(N, c4, 18, [1, 2, 3, 4, 5, 6, 7]));
    it('4 cells 19+', () => test_cage(N, c4, 19, [1, 2, 3, 4, 5, 6, 7]));
    it('4 cells 20+', () => test_cage(N, c4, 20, [2, 3, 4, 5, 6, 7]));
    it('4 cells 21+', () => test_cage(N, c4, 21, [3, 5, 6, 7]));
    it('4 cells 22+', () => test_cage(N, c4, 22, [4, 5, 6, 7]));

    it('5 cells 15+', () => test_cage(N, c5, 15, [1, 2, 3, 4, 5]));
    it('5 cells 16+', () => test_cage(N, c5, 16, [1, 2, 3, 4, 6]));
    it('5 cells 17+', () => test_cage(N, c5, 17, [1, 2, 3, 4, 5, 6, 7]));
    it('5 cells 18+', () => test_cage(N, c5, 18, [1, 2, 3, 4, 5, 6, 7]));
    it('5 cells 19+', () => test_cage(N, c5, 19, [1, 2, 3, 4, 5, 6, 7]));
    it('5 cells 20+', () => test_cage(N, c5, 20, [1, 2, 3, 4, 5, 6, 7]));
    it('5 cells 21+', () => test_cage(N, c5, 21, [1, 2, 3, 4, 5, 6, 7]));
    it('5 cells 22+', () => test_cage(N, c5, 22, [1, 2, 3, 4, 5, 6, 7]));
    it('5 cells 23+', () => test_cage(N, c5, 23, [1, 2, 3, 4, 5, 6, 7]));
    it('5 cells 24+', () => test_cage(N, c5, 24, [2, 4, 5, 6, 7]));
    it('5 cells 25+', () => test_cage(N, c5, 25, [3, 4, 5, 6, 7]));

    it('6 cells 21+', () => test_cage(N, c6, 21, [1, 2, 3, 4, 5, 6]));
    it('6 cells 22+', () => test_cage(N, c6, 22, [1, 2, 3, 4, 5, 7]));
    it('6 cells 23+', () => test_cage(N, c6, 23, [1, 2, 3, 4, 6, 7]));
    it('6 cells 24+', () => test_cage(N, c6, 24, [1, 2, 3, 5, 6, 7]));
    it('6 cells 25+', () => test_cage(N, c6, 25, [1, 2, 4, 5, 6, 7]));
    it('6 cells 26+', () => test_cage(N, c6, 26, [1, 3, 4, 5, 6, 7]));
    it('6 cells 27+', () => test_cage(N, c6, 27, [2, 3, 4, 5, 6, 7]));

    it('7 cells 28+', () => test_cage(N, c7, 28, [1, 2, 3, 4, 5, 6, 7]));
});

describe('testing +, N = 8', () => {
    const N = 8;
    it('2 cells 3+', () => test_cage(N, c2, 3, [1, 2]));
    it('2 cells 4+', () => test_cage(N, c2, 4, [1, 3]));
    it('2 cells 5+', () => test_cage(N, c2, 5, [1, 2, 3, 4]));
    it('2 cells 6+', () => test_cage(N, c2, 6, [1, 2, 4, 5]));
    it('2 cells 7+', () => test_cage(N, c2, 7, [1, 2, 3, 4, 5, 6]));
    it('2 cells 8+', () => test_cage(N, c2, 8, [1, 2, 3, 5, 6, 7]));
    it('2 cells 9+', () => test_cage(N, c2, 9, [1, 2, 3, 4, 5, 6, 7, 8]));
    it('2 cells 10+', () => test_cage(N, c2, 10, [2, 3, 4, 6, 7, 8]));
    it('2 cells 11+', () => test_cage(N, c2, 11, [3, 4, 5, 6, 7, 8]));
    it('2 cells 12+', () => test_cage(N, c2, 12, [4, 5, 7, 8]));
    it('2 cells 13+', () => test_cage(N, c2, 13, [5, 6, 7, 8]));
    it('2 cells 14+', () => test_cage(N, c2, 14, [6, 8]));
    it('2 cells 15+', () => test_cage(N, c2, 15, [7, 8]));

    it('3 cells 6+', () => test_cage(N, c3, 6, [1, 2, 3]));
    it('3 cells 7+', () => test_cage(N, c3, 7, [1, 2, 4]));
    it('3 cells 8+', () => test_cage(N, c3, 8, [1, 2, 3, 4, 5]));
    it('3 cells 9+', () => test_cage(N, c3, 9, [1, 2, 3, 4, 5, 6]));
    it('3 cells 10+', () => test_cage(N, c3, 10, [1, 2, 3, 4, 5, 6, 7]));
    it('3 cells 11+', () => test_cage(N, c3, 11, [1, 2, 3, 4, 5, 6, 7, 8]));
    it('3 cells 12+', () => test_cage(N, c3, 12, [1, 2, 3, 4, 5, 6, 7, 8]));
    it('3 cells 13+', () => test_cage(N, c3, 13, [1, 2, 3, 4, 5, 6, 7, 8]));
    it('3 cells 14+', () => test_cage(N, c3, 14, [1, 2, 3, 4, 5, 6, 7, 8]));
    it('3 cells 15+', () => test_cage(N, c3, 15, [1, 2, 3, 4, 5, 6, 7, 8]));
    it('3 cells 16+', () => test_cage(N, c3, 16, [1, 2, 3, 4, 5, 6, 7, 8]));
    it('3 cells 17+', () => test_cage(N, c3, 17, [2, 3, 4, 5, 6, 7, 8]));
    it('3 cells 18+', () => test_cage(N, c3, 18, [3, 4, 5, 6, 7, 8]));
    it('3 cells 19+', () => test_cage(N, c3, 19, [4, 5, 6, 7, 8]));
    it('3 cells 20+', () => test_cage(N, c3, 20, [5, 7, 8]));
    it('3 cells 21+', () => test_cage(N, c3, 21, [6, 7, 8]));
});
