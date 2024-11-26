import { Cell, Position } from "../cell.ts";

export type Direction = "row" | "col";

export type Operation = "+" | "-" | "*" | "/" | "=";

export class Removal {
    readonly position: Position;
    readonly direction: Direction;
    readonly numbers: number[];

    constructor(position: Position, direction: Direction, numbers: number[]) {
        this.position = position;
        this.direction = direction;
        this.numbers = numbers;
    }
}

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

    abstract init(): void;
    abstract solve(): Removal[];

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
