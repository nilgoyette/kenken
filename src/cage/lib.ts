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
     * Remove as much possibilities as possible from the cells.
     * 
     * Ensures coherency **only** in the cage. Doesn't check the other cages or lines. This method
     * can be somewhat "slow" because it starts a bruteforce for all cells and all their
     * possibilities.
     */
    abstract solve(): boolean;

    /**
     * Force a specific number to appear in one of many cells.
     */
    abstract force(cells: Cell[], i: number): boolean;

    is_straight_line(): boolean {
        const [Y, X] = this.cells[0].position;
        return this.cells.every((c) => c.position[0] == Y)
            || this.cells.every((c) => c.position[1] == X);
    }

    set_to_all_cells(possibilities: Set<number>): void {
        for (const cell of this.cells) {
            cell.possibilities = new Set([...possibilities]);
        }
    }
};

export abstract class CageDouble extends Cage {
    solve(): boolean {
        const c1 = this.cells[0];
        const c2 = this.cells[1];
        const nb_before_1 = c1.possibilities.size;
        const nb_before_2 = c2.possibilities.size;
        c1.possibilities = this.solve_side(c1.possibilities, c2.possibilities);
        c2.possibilities = this.solve_side(c2.possibilities, c1.possibilities);
        return (c1.possibilities.size != nb_before_1) || (c2.possibilities.size != nb_before_2);
    }

    abstract ops(a: number, b: number): number;

    solve_side(p1: Set<number>, p2: Set<number>): Set<number> {
        const new_possibilities = new Set<number>;
        for (const n1 of p1) {
            let at_least_one = false;
            for (const n2 of p2) {
                const a = this.ops(n1, n2);
                const b = this.ops(n2, n1);
                if (a == this.result || b == this.result) {
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

    force(cells: Cell[], i: number): boolean {
        // There can only be 2 cells, so all cells are in the cage
        let at_least_one = false;
        for (const cell of cells) {
            const new_possibilities = new Set([i]);
            for (const p of cell.possibilities) {
                const a = this.ops(i, p);
                const b = this.ops(p, i);
                if (a == this.result || b == this.result) {
                    new_possibilities.add(p);
                    at_least_one = true;
                }
            }
            cell.possibilities = new_possibilities;
        }
        return at_least_one;
    }
}

export abstract class CageMore extends Cage {
    abstract neutral(): number;
    abstract ops(a: number, b: number): number;
    abstract whatsLeft(total: number): number;

    solve(): boolean {
        const trying = Array.from({length: this.cells.length}, () => 0);

        // We save the possibilities
        // - so that `recurse` uses it for bruteforcing
        // - because `recurse` will fill `possibilities` with the next ones.
        const current_possibilities: Set<number>[] = [];
        for (const cell of this.cells) {
            current_possibilities.push(structuredClone(cell.possibilities));
            cell.possibilities = new Set<number>;
        }

        const recurse = (at: number, running: number) => {
            const cell = this.cells[at];
            const c_p = current_possibilities[at];
            if (at == this.cells.length - 1) {
                const ans = this.whatsLeft(running);
                const ok = c_p.has(ans) && this.can_use(ans, cell.position, trying);
                if (ok) {
                    cell.possibilities.add(ans);
                }
                return ok;
            }

            let at_least_one = false;
            for (const i of c_p) {
                if (this.can_use(i, cell.position, trying)) {
                    trying[at] = i;
                    if (recurse(at + 1, this.ops(running, i))) {
                        cell.possibilities.add(i);
                        at_least_one = true;
                    }
                    trying[at] = 0;
                }
            }
            return at_least_one;
        };

        return recurse(0, this.neutral());
    }

    force(cells: Cell[], i: number): boolean {
        return false;
    }

    private can_use(number: number, at: Position, trying: number[]): boolean {
        const [at_y, at_x] = at;
        for (let i = 0; i < this.cells.length; i++) {
            const cell = this.cells[i];
            if (trying[i] == 0) {
                return true;
            }
    
            const [cell_y, cell_x] = cell.position;
            const same_col_row = cell_y == at_y || cell_x == at_x;
            if (number == trying[i] && same_col_row) {
                return false;
            }
        }
        return true;
    }
}
