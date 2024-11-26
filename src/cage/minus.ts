import { Cage, Removal } from "./lib.ts";
import { range } from "../cell.ts";

export class Minus extends Cage {
    init(): void  {
        const all = range(1, this.n + 1);
        for (const cell of this.cells) {
            cell.possibilities = new Set(all);
        }
    }

    solve(): Removal[] {
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
        return [];
    }
}
