import { Cage, Removal } from "./lib.ts";
import { range } from "../cell.ts";

export class Minus extends Cage {
    init(): void  {
        const N = this.n + 1;
        if (this.result >= N / 2) {
            const stop =  this.n - this.result;
            const x1 = range(1, stop + 1);
            const x2 = range(N - stop, N);
            const set = new Set(x1.concat(x2));
            this.set_to_all_cells(set);
        } else {
            this.set_to_all_cells(new Set(range(1, N)));
        }
    }

    solve(): Removal[] {
        const c1 = this.cells[0];
        const c2 = this.cells[1];
        c1.possibilities = solve_side(c1.possibilities, c2.possibilities, this.result);
        c2.possibilities = solve_side(c2.possibilities, c1.possibilities, this.result);
        return [];
    }
}

function solve_side(p1: Set<number>, p2: Set<number>, result: number): Set<number> {
    const new_possibilities = new Set<number>;
    for (const n1 of p1) {
        let at_least_one = false;
        for (const n2 of p2) {
            const d = Math.abs(n1 - n2);
            if (d == result) {
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
