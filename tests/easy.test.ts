import { expect } from "jsr:@std/expect";

import { KenKen } from "../src/kenken.ts"
import { Solver } from "../src/solver.ts";

Deno.test("7025 +", () => {
    const k = new KenKen(5);
    k.add([[0, 0], [1, 0]], "+", 9);
    k.add([[2, 0], [3, 0]], "+", 5);
    k.add([[0, 1], [0, 2], [1, 2]], "+", 9);
    k.add([[1, 1], [2, 1]], "+", 9);
    k.add([[4, 0], [4, 1], [3, 1]], "+", 5);
    k.add([[2, 2], [2, 3], [3, 3]], "+", 7);
    k.add([[3, 2], [4, 2]], "+", 7);
    k.add([[1, 3], [1, 4], [0, 4]], "+", 7);
    k.add([[2, 4], [3, 4]], "+", 9);
    k.add([[4, 3], [4, 4]], "+", 7);
    k.add_eq([0, 3], 1);
    const s = new Solver(k, false);
    expect(s.solve()).toEqual([
        [4, 2, 5, 1, 3],
        [5, 4, 2, 3, 1],
        [3, 5, 1, 2, 4],
        [2, 1, 3, 4, 5],
        [1, 3, 4, 5, 2]
    ]);
});

Deno.test("7062 +", () => {
    const k = new KenKen(5);
    k.add([[0, 0], [1, 0], [2, 0]], "+", 9);
    k.add([[0, 1], [1, 1]], "+", 3);
    k.add([[0, 2], [1, 2]], "+", 9);
    k.add([[2, 1], [2, 2]], "+", 5);
    k.add([[4, 0], [3, 1], [4, 1]], "+", 11);
    k.add([[1, 3], [2, 3]], "+", 9);
    k.add([[3, 2], [3, 3]], "+", 5);
    k.add([[0, 4], [1, 4]], "+", 5);
    k.add([[2, 4], [3, 4], [4, 4], [4, 3]], "+", 13);
    k.add_eq([3, 0], 4);
    k.add_eq([0, 3], 1);
    k.add_eq([4, 2], 1);
    const s = new Solver(k, false);
    expect(s.solve()).toEqual([
        [5, 2, 4, 1, 3],
        [3, 1, 5, 4, 2],
        [1, 3, 2, 5, 4],
        [4, 5, 3, 2, 1],
        [2, 4, 1, 3, 5]
    ]);
});

Deno.test("94855 +-/*", () => {
    const k = new KenKen(5);
    k.add([[0, 0], [1, 0], [1, 1]], "*", 16);
    k.add([[0, 1], [0, 2], [1, 2]], "+", 9);
    k.add([[0, 3], [1, 3]], "-", 1);
    k.add([[0, 4], [1, 4]], "*", 10);
    k.add([[2, 0], [3, 0], [4, 0], [3, 1]], "+", 13);
    k.add([[2, 1], [2, 2]], "/", 2);
    k.add([[4, 1], [4, 2]], "/", 2);
    k.add([[2, 3], [2, 4]], "+", 4);
    k.add([[3, 3], [3, 4]], "+", 5);
    k.add([[4, 3], [4, 4]], "+", 9);
    k.add_eq([3, 2], 5);
    const s = new Solver(k, false);
    expect(s.solve()).toEqual([
        [4, 5, 1, 3, 2],
        [1, 4, 3, 2, 5],
        [5, 2, 4, 1, 3],
        [2, 3, 5, 4, 1],
        [3, 1, 2, 5, 4]
    ]);
});
