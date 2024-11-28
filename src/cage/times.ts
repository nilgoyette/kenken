import { Cage, Removal } from "./lib.ts";

export class Times extends Cage {
    init(): void  {
        const factors = new Set<number>;
        for (let f = 1; f <= this.n; f++) {
            const d = this.result / f;
            if (Number.isInteger(d)) {
                factors.add(f);
            }
        }
        this.set_to_all_cells(factors);
    }

    solve(): Removal[] {
        // We save the possibilities
        // - so that`recurse` uses it for bruteforcing
        // - because `recurse` will fill the possibilities with the next ones.
        const current_possibilities: Set<number>[] = [];
        for (const cell of this.cells) {
            current_possibilities.push(structuredClone(cell.possibilities));
            cell.possibilities = new Set<number>;
        }
        this.recurse(current_possibilities, 0, 1);
        return [];
    }

    recurse(current_possibilities: Set<number>[], at: number, product: number): boolean {
        const cell = this.cells[at];
        const c_p = current_possibilities[at];
        if (at == this.cells.length - 1) {
            const ans = this.result / product;
            const ok = c_p.has(ans) && this.can_use(ans, cell.position);
            if (ok) {
                cell.possibilities.add(ans);
            }
            return ok;
        }

        let at_least_one = false;
        for (const f of c_p) {
            if (this.can_use(f, cell.position)) {
                cell.trying = f;
                if (this.recurse(current_possibilities, at + 1, product * f)) {
                    cell.possibilities.add(f);
                    at_least_one = true;
                }
                cell.trying = 0;
            }
        }
        return at_least_one;
    }
}
