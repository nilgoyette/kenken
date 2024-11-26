import { Cage, Removal } from "./lib.ts";

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

    solve(): Removal[] {
        return [];
    }
}
