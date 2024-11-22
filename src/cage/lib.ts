import { Cell, Position } from "../cell.ts";

export type Direction = "row" | "colunn";

export type Operation = "+" | "-" | "*" | "/" | "=";

export class Removal {
    readonly asked_by: Cage;
    readonly direction: Direction;
    readonly numbers: number[];

    constructor(asked_by: Cage, direction: Direction, numbers: number[]) {
        this.asked_by = asked_by;
        this.direction = direction;
        this.numbers = numbers;
    }
}

export abstract class Cage {
    readonly n: number;
    cells: Cell[];
    result: number;

    constructor(n: number, cells: Cell[], result: number) {
        this.n = n;
        this.cells = cells;
        this.result = result;

        // This is only useful in the tests where we often re-use the cells
        for (const cell of this.cells) {
            cell.possibilities = new Set;
        }

        this.init();
    }

    abstract init(): void;

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
