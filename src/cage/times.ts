import { Cage, Removal } from "./lib.ts";

const FACTORS = new Map<number, number[]>([
    [4, [2, 4]],
    [6, [2, 3, 6]],
    [8, [2, 4, 8]],
    [9, [3, 9]],
    [10, [2, 5]],
    [12, [2, 3, 4, 6]],
    [14, [2, 7]],
    [15, [3, 5]],
    [16, [2, 4, 8]],
    [18, [2, 3, 6, 9]],
    [20, [2, 4, 5]],
    [21, [3, 7]],
    [24, [2, 3, 4, 6, 8]],
    [25, [5]],
    [27, [3, 9]],
    [28, [2, 4, 7]],
    [30, [2, 3, 5, 6]],
    [32, [2, 4, 8]],
    [35, [3, 7]],
    [36, [2, 3, 4, 6, 9]],
    [40, [2, 4, 5, 8]],
    [42, [2, 3, 6, 7]],
    [45, [3, 5, 9]],
    [48, [2, 3, 4, 6, 8]],
    [49, [7]],
    [50, [2, 5]],
    [54, [2, 3, 6, 9]],
    [56, [2, 4, 7]],
    [60, [2, 3, 4, 5, 6]],
    [63, [3, 7]],
    [64, [2, 4, 8]],
    [70, [2, 5, 7]],
    [72, [2, 3, 4, 6, 9]],
    [75, [3, 5]],
    [80, [2, 4, 5, 8]],
    [81, [3]],
    [84, [2, 3, 4, 6, 7]],
    [90, [2, 3, 5, 6]],
    [93, [3, 7]],
    [96, [2, 3, 4, 6, 8]],
    [98, [2, 7]],
    [100, [2, 4, 5]],
    [105, [3, 5, 7]],
    [108, [2, 3, 4, 6, 9]],
    [112, [2, 4, 7]],
    [120, [2, 3, 4, 5, 6]],
    [125, [5]],
    [126, [2, 3, 6, 7]],
    [128, [2, 4, 8]],
    [135, [3, 5, 9]],
    [140, [2, 4, 5, 7]],
    [144, [2, 3, 4, 6, 9]],
    [147, [3, 7]],
    [150, [2, 3, 5, 6]],
    [160, [2, 4, 5, 8]],
    [168, [2, 3, 4, 6, 7]],
    [210, [2, 3, 5, 6, 7]],
    [252, [2, 3, 4, 6, 7]],
]);

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
        let factors = FACTORS.get(this.result);
        if (!factors) {
            // We got a prime number.
            factors = [this.result];
        } else {
            factors = factors.filter((n) => n <= this.n)
        }
        this.recursive([1].concat(factors), 0, 1);
        return [];
    }

    recursive(factors: number[], at: number, product: number): boolean {
        const cell = this.cells[at];
        if (at == this.cells.length - 1) {
            const ans = this.result / product;
            const ok = ans > 0 && ans <= this.n
                && Number.isInteger(ans)
                && this.can_use(ans, cell.position);
            if (ok) {
                cell.possibilities.add(ans);
            }
            return ok;
        }

        let at_least_one = false;
        for (const f of factors) {
            if (this.can_use(f, cell.position)) {
                cell.trying = f;
                if (this.recursive(factors, at + 1, product * f)) {
                    cell.possibilities.add(f);
                    at_least_one = true;
                }
                cell.trying = 0;
            }
        }
        return at_least_one;
    }
}
