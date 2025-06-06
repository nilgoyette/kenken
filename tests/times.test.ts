import { describe, it } from "jsr:@std/testing/bdd";

import { Times } from "../src/cage/times.ts";
import { Cell } from "../src/cell.ts";
import { test_cage_generic, test_cage2_generic, SQUARE, TRI, L1 } from "./utils.ts"

function test_cage(n: number, cells: Cell[], result: number, gt: number[]) {
    test_cage_generic(Times, n, cells, result, gt);
}

function test_cage2(n: number, cells: Cell[], result: number, all_gt: number[][]) {
    test_cage2_generic(Times, n, cells, result, all_gt);
}

describe('testing squares', () => {
    it('L 144*', () =>  test_cage(7, SQUARE, 144, [1, 2, 3, 4, 6]));
    it('L 252*', () =>  test_cage(7, SQUARE, 252, [1, 2, 3, 4, 6, 7]));
});

describe('testing Triangle', () => {
    it('Tri 4*', () =>  test_cage2(4, TRI, 4, [[1, 2], [1, 4], [1, 2]]));
    it('Tri 4*', () =>  test_cage2(5, TRI, 4, [[1, 2], [1, 4], [1, 2]]));
    it('Tri 5*', () =>  test_cage2(5, TRI, 5, [[1], [5], [1]]));
    it('Tri 6*', () =>  test_cage(4, TRI, 6, [1, 2, 3]));
    it('Tri 6*', () =>  test_cage(5, TRI, 6, [1, 2, 3]));
    it('Tri 6*', () =>  test_cage2(6, TRI, 6, [[1, 2, 3], [1, 2, 3, 6], [1, 2, 3]]));
    it('Tri 10*', () =>  test_cage(5, TRI, 10, [1, 2, 5]));
    it('Tri 14*', () =>  test_cage(7, TRI, 14, [1, 2, 7]));
    it('Tri 20*', () =>  test_cage2(8, TRI, 20, [[1, 2, 4, 5], [1, 4, 5], [1, 2, 4, 5]]));
    it('Tri 40*', () =>  test_cage(7, TRI, 40, [2, 4, 5]));
    it('Tri 42*', () =>  test_cage(7, TRI, 42, [1, 2, 3, 6, 7]));
    it('Tri 45*', () =>  test_cage2(7, TRI, 45, [[3], [5], [3]]));
    it('Tri 45*', () =>  test_cage2(9, TRI, 45, [[1, 3, 5, 9], [1, 5, 9], [1, 3, 5, 9]]));
    it('Tri 60*', () =>  test_cage(7, TRI, 60, [2, 3, 4, 5, 6]));
    it('Tri 105*', () =>  test_cage(7, TRI, 105, [3, 5, 7]));
    it('Tri 120*', () =>  test_cage(7, TRI, 120, [4, 5, 6]));
    it('Tri 126*', () =>  test_cage(7, TRI, 126, [3, 6, 7]));
    it('Tri 210*', () =>  test_cage(7, TRI, 210, [5, 6, 7]));
    it('Tri 252*', () =>  test_cage2(7, TRI, 252, [[6], [7], [6]]));
});

describe('testing L', () => {
    it('L 84*', () =>  test_cage(7, L1, 84, [1, 2, 3, 4, 6, 7]));
    it('L 105*', () =>  test_cage(7, L1, 105, [1, 3, 5, 7]));
    it('L 210*', () =>  test_cage(7, L1, 210, [1, 2, 3, 5, 6, 7]));
});
