import { Cage } from "./lib.ts";
import { range } from "../cell.ts";

export class Plus extends Cage {
    init(): void  {
        const all = range(1, this.n + 1);
        for (const cell of this.cells) {
            cell.possibilities = new Set(all);
        }
    }

    solve(): boolean {
        // We save the possibilities
        // - so that`recurse` uses it for bruteforcing
        // - because `recurse` will fill the possibilities with the next ones.
        const current_possibilities: Set<number>[] = [];
        for (const cell of this.cells) {
            current_possibilities.push(structuredClone(cell.possibilities));
            cell.possibilities = new Set<number>;
        }
        return this.recurse(current_possibilities, 0, 0);
    }

    recurse(current_possibilities: Set<number>[], at: number, sum: number): boolean {
        const cell = this.cells[at];
        const c_p = current_possibilities[at];
        if (at == this.cells.length - 1) {
            const ans = this.result - sum;
            const ok = c_p.has(ans) && this.can_use(ans, cell.position);
            if (ok) {
                cell.possibilities.add(ans);
            }
            return ok;
        }
    
        let at_least_one = false;
        for (const i of c_p) {
            if (this.can_use(i, cell.position)) {
                cell.trying = i;
                if (this.recurse(current_possibilities, at + 1, sum + i)) {
                    cell.possibilities.add(i);
                    at_least_one = true;
                }
                cell.trying = 0;
            }
        }
        return at_least_one;
    }
}
