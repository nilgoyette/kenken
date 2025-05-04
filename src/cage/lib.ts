import { Cell, Position } from "../cell.ts";

export type Direction = "row" | "col";

export type Operation = "+" | "-" | "*" | "/";

export abstract class Cage {
    readonly n: number;
    readonly result: number;
    cells: Cell[];

    constructor(n: number, cells: Cell[], result: number) {
        this.n = n;
        this.result = result;
        this.cells = cells;

        this.init();
    }

    save(): void {
        for (const cell of this.cells) {
            cell.save();
        }
    }

    load(): void {
        for (const cell of this.cells) {
            cell.load();
        }
    }

    /**
     * Initialize the cage with possible numbers.
     * 
     * Doesn't check any other cells, cages or lines. It's simply an heuristic to fill the cells'
     * `possibilities` sets.
     */
    abstract init(): void;

    /**
     * Force a specific number to appear in one of many cells.
     */
    force(cells: Cell[], i: number): boolean {
        if (this.cells.length == 2) {
            // There can only be 2 cells, so all cells are in the cage
            let at_least_one = false;
            for (const cell of cells) {
                const new_possibilities = new Set([i]);
                for (const p of cell.possibilities) {
                    const a = this.apply_ops(i, p);
                    const b = this.apply_ops(p, i);
                    if (a == this.result || b == this.result) {
                        new_possibilities.add(p);
                        at_least_one = true;
                    }
                }
                cell.possibilities = new_possibilities;
            }
            return at_least_one;
        }
        return false;
    }
    
    abstract neutral(): number;
    abstract ordered(): boolean;
    abstract apply_ops(a: number, b: number): number;
    abstract apply_reverse_ops(a: number, b: number): number;

    /**
     * Remove most possibilities from the cells.
     * 
     * Ensures coherency **only** in the cage. Doesn't check the other cages or lines. This method
     * can be somewhat "slow" because it starts a bruteforce for all cells and all their
     * possibilities.
     */
    solve(): boolean {
        if (this.cells.length == 2) {
            return this.#solve_2();
        } else {
            return this.#solve_n();
        }
    }

    /**
     * Remove most possibilities from a 2-cells cage.
     */
    #solve_2(): boolean {
        const c1 = this.cells[0];
        const c2 = this.cells[1];
        const prev_len1 = c1.possibilities.size;
        const prev_len2 = c2.possibilities.size;
        c1.possibilities = this.#solve_side(c1.possibilities, c2.possibilities);
        c2.possibilities = this.#solve_side(c2.possibilities, c1.possibilities);
        return (c1.possibilities.size != prev_len1) || (c2.possibilities.size != prev_len2);
    }

    /**
     * Returns the possibilities in `p1` with respect to the possibilities in `p2`.
     */
    #solve_side(p1: Set<number>, p2: Set<number>): Set<number> {
        const new_possibilities = new Set<number>;
        for (const n1 of p1) {
            // Unordered operations (+ and *) are simple: they require a single math operation
            // (the reverse) to discover the unknown element. For example:
            // 1 + 3 = 4 => 4 - 1 = 3
            // 2 * 4 = 8 => 8 / 2 = 4
            const a = this.apply_reverse_ops(this.result, n1);
            let ok = n1 != a && p2.has(a)
            if (this.ordered()) {
                // However, ordered operations are more complex: they require a second check For example:
                // 5 - 1 = 4 => 4 + 1 = 5   OR   5 - 4 = 1
                // 6 / 3 = 2 => 2 * 3 = 6   OR   6 / 2 = 3
                const b = this.apply_ops(n1, this.result);
                ok = ok || n1 != b && p2.has(b);
            }
            if (ok) {
                new_possibilities.add(n1);
            }
        }
        return new_possibilities;
    }

    /**
     * Remove most possibilities from a 3+ cells cage.
     */
    #solve_n(): boolean {
        const cells_values = Array(this.cells.length);
        cells_values.fill(0);

        // We save the possibilities
        // - so that `recurse` uses it for bruteforcing
        // - because `recurse` will fill `possibilities` with the next ones.
        const current_possibilities: Set<number>[] = [];
        for (const cell of this.cells) {
            current_possibilities.push(new Set(cell.possibilities));
            cell.possibilities = new Set<number>;
        }

        const recurse = (at: number, acc: number) => {
            const cell = this.cells[at];
            const c_p = current_possibilities[at];
            if (at == this.cells.length - 1) {
                const ans = this.apply_reverse_ops(this.result, acc);
                const ok = c_p.has(ans) && this.can_use(ans, cell.position, cells_values);
                if (ok) {
                    cell.possibilities.add(ans);
                }
                return ok;
            }

            let at_least_one = false;
            for (const i of c_p) {
                if (this.can_use(i, cell.position, cells_values)) {
                    cells_values[at] = i;
                    if (recurse(at + 1, this.apply_ops(acc, i))) {
                        cell.possibilities.add(i);
                        at_least_one = true;
                    }
                    cells_values[at] = 0;
                }
            }
            return at_least_one;
        };

        return recurse(0, this.neutral());
    }

    /**
     * Return `true` if it's possible to use `number` at `position`.
     */
    can_use(number: number, at: Position, cells_values: number[]): boolean {
        for (let i = 0; i < this.cells.length; i++) {
            const cell = this.cells[i];
            if (cells_values[i] == 0) {
                return true;
            }

            const same_col_row = cell.position[0] == at[0] || cell.position[1] == at[1];
            if (number == cells_values[i] && same_col_row) {
                return false;
            }
        }
        return true;
    }

    /**
     * Return `true` if all cells in the cage are in a straight line.
     */
    is_straight_line(): boolean {
        const [Y, X] = this.cells[0].position;
        return this.cells.every((c) => c.position[0] == Y)
            || this.cells.every((c) => c.position[1] == X);
    }

    /**
     * Apply the same set of possibilities to all cells in the cage.
     */
    set_to_all_cells(possibilities: Set<number>): void {
        for (const cell of this.cells) {
            cell.possibilities = new Set([...possibilities]);
        }
    }
}
