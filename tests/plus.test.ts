import { describe, it } from "jsr:@std/testing/bdd";

import { Plus } from "../src/cage/plus.ts";
import { Cell } from "../src/cell.ts";
import { test_cage_generic, test_cage2_generic, SQUARE, TRI, L1, L2, SKEW, T1 } from "./utils.ts"

function test_cage(n: number, cells: Cell[], result: number, gt: number[]) {
    test_cage_generic(Plus, n, cells, result, gt);
}

function test_cage2(n: number, cells: Cell[], result: number, all_gt: number[][]) {
    test_cage2_generic(Plus, n, cells, result, all_gt);
}

describe('testing Squares, N = 4', () => {
    const N = 4;
    it('Square 6+', () => test_cage(N, SQUARE, 6, [1, 2]));
    it('Square 7+', () => test_cage(N, SQUARE, 7, [1, 2, 3]));
    it('Square 8+', () => test_cage(N, SQUARE, 8, [1, 2, 3, 4]));
    it('Square 9+', () => test_cage(N, SQUARE, 9, [1, 2, 3, 4]));
    it('Square 10+', () => test_cage(N, SQUARE, 10, [1, 2, 3, 4]));
    it('Square 11+', () => test_cage(N, SQUARE, 11, [1, 2, 3, 4]));
    it('Square 12+', () => test_cage(N, SQUARE, 12, [1, 2, 3, 4]));
    it('Square 13+', () => test_cage(N, SQUARE, 13, [2, 3, 4]));
    it('Square 14+', () => test_cage(N, SQUARE, 14, [3, 4]));
});

describe('testing Triangle, N = 4', () => {
    const N = 4;
    it('Tri 4+', () =>  test_cage2(N, TRI, 4, [[1], [2], [1]]));
    it('Tri 5+', () =>  test_cage2(N, TRI, 5, [[1, 2], [1, 3], [1, 2]])); // OU 2, 1, 2
    it('Tri 6+', () =>  test_cage2(N, TRI, 6, [[1, 2, 3], [1, 2, 3, 4], [1, 2, 3]])); // OU 1, 4, 1
    it('Tri 7+', () =>  test_cage(N, TRI, 7, [1, 2, 3, 4]));
    it('Tri 8+', () =>  test_cage(N, TRI, 8, [1, 2, 3, 4]));
    it('Tri 9+', () =>  test_cage2(N, TRI, 9, [[2, 3, 4], [1, 2, 3, 4], [2, 3, 4]]));
    it('Tri 10+', () => test_cage2(N, TRI, 10, [[3, 4], [2, 4], [3, 4]]));
    it('Tri 11+', () => test_cage2(N, TRI, 11, [[4], [3], [4]]));
});

describe('testing T, N = 4', () => {
    const N = 4;
    it('T 7+', () => test_cage2(N, T1, 7, [[1, 2, 3], [2, 3], [1, 2, 3], [1]]));
    it('T 8+', () => test_cage2(N, T1, 8, [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2]]));
    it('T 9+', () => test_cage2(N, T1, 9, [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3]]));
    it('T 10+', () => test_cage(N, T1, 10, [1, 2, 3, 4]));
    it('T 11+', () => test_cage2(N, T1, 11, [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [2, 3, 4]]));
    it('T 12+', () => test_cage2(N, T1, 12, [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [3, 4]]));
    it('T 13+', () => test_cage2(N, T1, 13, [[2, 3, 4], [2, 3], [2, 3, 4], [4]]));
});

describe('testing L, N = 4', () => {
    const N = 4;
    it('L 7+', () => test_cage2(N, L1, 7, [[1, 2, 3], [1, 2, 3], [2, 3], [1]]));
    it('L 8+', () => test_cage2(N, L1, 8, [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2]]));
    it('L 9+', () => test_cage2(N, L1, 9, [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3]]));
    it('L 10+', () => test_cage(N, L1, 10, [1, 2, 3, 4]));
    it('L 11+', () => test_cage2(N, L1, 11, [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [2, 3, 4]]));
    it('L 12+', () => test_cage2(N, L1, 12, [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [3, 4]]));
    it('L 13+', () => test_cage2(N, L1, 13, [[2, 3, 4], [2, 3, 4], [2, 3], [4]]));
});

describe('testing L_, N = 4', () => {
    const N = 4;
    it('L_ 9+', () =>  test_cage2(N, L2, 9, [[1, 2], [1, 2], [3], [1, 2], [1, 2]]));
    it('L_ 10+', () => test_cage2(N, L2, 10, [[1, 2, 3], [1, 2, 3], [2, 4], [1, 2, 3], [1, 2, 3]]));
    it('L_ 11+', () => test_cage(N, L2, 11, [1, 2, 3, 4]));
    it('L_ 12+', () => test_cage(N, L2, 12, [1, 2, 3, 4]));
    it('L_ 13+', () => test_cage(N, L2, 13, [1, 2, 3, 4]));
    it('L_ 14+', () => test_cage(N, L2, 14, [1, 2, 3, 4]));
    it('L_ 15+', () => test_cage2(N, L2, 15, [[2, 3, 4], [2, 3, 4], [1, 3], [2, 3, 4], [2, 3, 4]]));
    it('L_ 16+', () => test_cage2(N, L2, 16, [[3, 4], [3, 4], [2], [3, 4], [3, 4]]));
});

describe('testing Skew, N = 4', () => {
    const N = 4;
    it('Skew 6+', () => test_cage(N, SKEW, 6, [1, 2]));
    it('Skew 7+', () => test_cage(N, SKEW, 7, [1, 2, 3]));
    it('Skew 8+', () => test_cage(N, SKEW, 8, [1, 2, 3, 4]));
    it('Skew 9+', () => test_cage(N, SKEW, 9, [1, 2, 3, 4]));
    it('Skew 10+', () => test_cage(N, SKEW, 10, [1, 2, 3, 4]));
    it('Skew 11+', () => test_cage(N, SKEW, 11, [1, 2, 3, 4]));
    it('Skew 12+', () => test_cage(N, SKEW, 12, [1, 2, 3, 4]));
    it('Skew 13+', () => test_cage(N, SKEW, 13, [2, 3, 4]));
    it('Skew 14+', () => test_cage(N, SKEW, 14, [3, 4]));
});
