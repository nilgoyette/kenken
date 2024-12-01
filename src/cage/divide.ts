import { Cage } from "./lib.ts";

const SAME_AS = [
    0, 0, 0, 0, 4, 4, 6, 6, 8, 9
];

const DIVISORS = new Map<string, Set<number>>([
    ["4,2", new Set([1, 2, 4])],
    ["6,2", new Set([1, 2, 3, 4, 6])],
    ["6,3", new Set([1, 2, 3, 6])],
    ["8,2", new Set([1, 2, 3, 4, 6, 8])],
    ["8,4", new Set([1, 2, 4, 8])],
    ["9,3", new Set([1, 2, 3, 6, 9])],
]);

export class Divide extends Cage {
    init(): void  {
        const at = SAME_AS[this.n];
        const key = [at, this.result].join(",");
        const divisors = DIVISORS.get(key);
        if (divisors) {
            this.set_to_all_cells(divisors);
            return;
        }

        // It's hidden in the previous divisors
        const prev = (this.n == 9) ? at - 1 : at - 2;
        const key2 = [prev, this.result].join(",");
        this.set_to_all_cells(DIVISORS.get(key2)!);
    }

    solve(): boolean {
        const c1 = this.cells[0];
        const c2 = this.cells[1];
        const nb_before_1 = c1.possibilities.size;
        const nb_before_2 = c2.possibilities.size;
        c1.possibilities = solve_side(c1.possibilities, c2.possibilities, this.result);
        c2.possibilities = solve_side(c2.possibilities, c1.possibilities, this.result);
        return (c1.possibilities.size != nb_before_1) || (c2.possibilities.size != nb_before_2);
    }
}

function solve_side(p1: Set<number>, p2: Set<number>, result: number): Set<number> {
    const new_possibilities = new Set<number>;
    for (const n1 of p1) {
        let at_least_one = false;
        for (const n2 of p2) {
            const a = n1 / n2;
            const b = n2 / n1;
            if (a == result || b == result) {
                at_least_one = true;
                break;
            }
        }
        if (at_least_one) {
            new_possibilities.add(n1);
        }
    }
    return new_possibilities;
}
