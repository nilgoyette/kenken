import { Cell, Position } from "../cell.ts";

export type Direction = "row" | "col";

export type Operation = "+" | "-" | "*" | "/" | "=";

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

    is_straight_line(): boolean {
        const [Y, X] = this.cells[0].position;
        return this.cells.every((c) => c.position[0] == Y)
            || this.cells.every((c) => c.position[1] == X);
    }

    can_use(number: number, at: Position): boolean {
        for (let i = 0; i < this.cells.length; i++) {
            const cell = this.cells[i];
            if (cell.trying == 0) {
                return true;
            }
    
            const same_col_row = cell.position[0] == at[0] || cell.position[1] == at[1];
            if (number == cell.trying && same_col_row) {
                return false;
            }
        }
        return true;
    }

    set_to_all_cells(possibilities: Set<number>): void {
        for (const cell of this.cells) {
            cell.possibilities = new Set([...possibilities]);
        }
    }

    reset_trying() {
        for (const cell of this.cells) {
            cell.trying = 0;
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
}
