import { Cage } from "./lib.ts";

// Only for straight lines
const MIN_ADD = [0, 1, 3, 6, 10, 15, 21, 28, 36, 45];
const MAX_ADD = [
    [], // 1x1
    [], // 2x2
    [3, 5, 6],
    [4, 7, 9, 10],
    [5, 9, 12, 14, 15],
    [6, 11, 15, 18, 20, 21],
    [7, 13, 18, 22, 25, 27, 28],
    [8, 15, 21, 26, 30, 33, 35, 36],
    [9, 17, 24, 30, 35, 39, 42, 44, 45]
];

export class Plus extends Cage {
    init(): void {
        if (this.is_straight_line()) {
            const taken = new Set<number>;
            init_straight_line(this.n, this.cells.length, this.result, taken);
            this.set_to_all_cells(taken);
        } else {
            this.init_complex(0, 0);
        }
    }

    init_complex(at: number, sum: number): boolean {
        const cell = this.cells[at];
        if (at == this.cells.length - 1) {
            const ans = this.result - sum;
            const ok = ans > 0 && ans <= this.n && this.can_use(ans, cell.position);
            if (ok) {
                cell.possibilities.add(ans);
            }
            return ok;
        }
    
        let at_least_one = false;
        const max = Math.min(this.n, this.result); // TODO minus number of other cells
        for (let i = 1; i <= max; i++) {
            if (this.can_use(i, cell.position)) {
                cell.trying = i;
                if (this.init_complex(at + 1, sum + i)) {
                    cell.possibilities.add(i);
                    at_least_one = true;
                }
                cell.trying = 0;
            }
        }
        return at_least_one;
    }
}

function init_straight_line(
    n: number, nb_cells: number, result: number, taken: Set<number>
): void {
    // The min/max the other cell(s) can attain
    const lower = MIN_ADD[nb_cells - 1];
    const upper = MAX_ADD[n - 1][nb_cells - 2];

    const min = Math.max(result - upper, 1);
    const max = Math.min(n, result - lower - 1);

    if (nb_cells == 2) {
        for (let i = min; i <= max; i++) {
            const d = result - i;
            if (!taken.has(i) && !taken.has(d) && d <= upper && i != d) {
                taken.add(i);
                taken.add(d);
            }
        }
    } else {
        const previous_token = new Set([...taken]);
        for (let i = min; i <= max; i++) {
            if (taken.has(i)) {
                continue;
            }

            const tmp_taken = new Set([...previous_token, i]);
            init_straight_line(n, nb_cells - 1, result - i, tmp_taken);
            if (tmp_taken.size > previous_token.size + 1) {
                // TODO A one-liner to copy the damn set
                for (const k of tmp_taken) {
                    taken.add(k);
                }
            }
        }
    }
}
