import { expect } from "jsr:@std/expect";

import { Cell } from "../src/cell.ts";
import { Cage } from "../src/cage/lib.ts";

/*
c1 c2 c3
c4 c5 c6
c7 c8 c9
*/
const _c1 = new Cell([0, 0]);
const _c2 = new Cell([0, 1]);
const _c3 = new Cell([0, 2]);
const _c4 = new Cell([1, 0]);
const _c5 = new Cell([1, 1]);
const _c6 = new Cell([1, 2]);
const _c7 = new Cell([2, 0]);
const _c8 = new Cell([2, 1]);
const _c9 = new Cell([2, 2]);
export const SQUARE = [_c1, _c2, _c4, _c5];
export const TRI = [_c1, _c4, _c5];
export const L1 = [_c1, _c4, _c7, _c8];
export const T1 = [_c1, _c2, _c3, _c5]
export const T2 = [_c1, _c2, _c3, _c5, _c8]
export const M1 = [_c7, _c4, _c5, _c6, _c2];
export const P = [_c1, _c2, _c4, _c5, _c6];
export const L2 = [_c1, _c4, _c7, _c8, _c9];
export const SKEW = [_c4, _c5, _c2, _c3];

export function test_cage_generic<T extends Cage>(
    c: new (n: number, cells: Cell[], result: number) => T,
    n: number,
    cells: Cell[],
    result: number,
    gt: number[]
) {
    const cage = new c(n, cells, result);
    cage.solve();

    const set = new Set(gt);
    for (let i = 0; i < cells.length; i++) {
        expect(cage.cells[i].possibilities).toEqual(set);
    }
}

export function test_cage2_generic<T extends Cage>(
    c: new (n: number, cells: Cell[], result: number) => T,
    n: number, cells: Cell[], result: number, all_gt: number[][]
) {
    const cage = new c(n, cells, result);
    cage.solve();
    
    for (let i = 0; i < all_gt.length; i++) {
        const cell = cage.cells[i];
        const gt = new Set(all_gt[i]);
        expect(cell.possibilities).toEqual(gt);
    }
}
