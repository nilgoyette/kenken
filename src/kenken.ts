import { writeAllSync } from "jsr:@std/io";

import { Divide } from "./cage/divide.ts";
import { Cage, Operation } from "./cage/lib.ts"
import { Minus } from "./cage/minus.ts";
import { Plus } from "./cage/plus.ts";
import { Times } from "./cage/times.ts";
import { Cell, Position } from "./cell.ts";

export class KenKen {
    readonly n: number;
    readonly rows: Cell[][];
    readonly cols: Cell[][];
    cells: Cell[][];
    cells_eq: Cell[];
    cages: Cage[];

    constructor(n: number) {
        this.n = n;
        this.cells = [];
        for (let y = 0; y < n; y++) {
            const row: Cell[]  = new Array<Cell>();      
            for (let x = 0; x < n; x++){
                row.push(new Cell([y, x]));
            }
            this.cells.push(row);
        }
        this.cells_eq = [];
        this.cages = [];

        this.rows = this.cells;
        const cols = [];
        for (let x = 0; x < n; x++) {
            const col: Cell[]  = new Array<Cell>();
            for (let y = 0; y < n; y++) {
                col.push(this.cells[y][x]);
            }
            cols.push(col);
        }
        this.cols = cols;
    }

    save(): void {
        for (const cage of this.cages) {
            cage.save();
        }
        // The = cells are not stores in this.cages
        for (const cell of this.cells_eq) {
            cell.save();
        }
    }

    load(): void {
        for (const cage of this.cages) {
            cage.load();
        }
        // The = cells are not stores in this.cages
        for (const cell of this.cells_eq) {
            cell.load();
        }
    }

    add_cell(cells: Cell[], op: Operation, result: number): void {
        // Keep the id of the cage so we can know later if a cell is in the same cage as
        // another (simply compare their cage_id)
        const cage_id = this.cages.length;
        cells.forEach((c) => c.cage_id = cage_id);

        let cage: Cage;
        switch (op) {
            case "+": cage = new Plus(this.n, cells, result); break;
            case "-": cage = new Minus(this.n, cells, result); break;
            case "*": cage = new Times(this.n, cells, result); break;
            case "/": cage = new Divide(this.n, cells, result); break;
        }
        this.cages.push(cage);
    }

    add(positions: Position[], op: Operation, result: number): void {
        for (const p of positions) {
            this.assert_free_cell(p);
        }

        const cells = positions.map(([y, x]) => this.cells[y][x]);
        this.add_cell(cells, op, result);
    }

    add_eq([y, x]: Position, answer: number): void {
        this.assert_free_cell([y, x]);

        const cell = this.cells[y][x];
        cell.possibilities = new Set([answer]);
        this.cells_eq.push(cell);
        // The cell will have cage_id == -1, which is acceptable.
    }

    // Ensure that the position `p` has not already been used by another cage.
    assert_free_cell(p: Position): void {
        for (const cage of this.cages) {
            for (const cell of cage.cells) {
                // Of course there's nothing to compare arrays in fucking JS so we must code it
                // ourselves like dinosaurs
                if (cell.position.every(function(v, index) { return v === p[index]})) {
                    throw new Error('Something bad happened: ' + p);
                }
            }
        }
    }

    remove_cross_at(cell: Cell): void {
        const answer = [cell.answer()];
        this.remove_possibility_on_row([cell], cell.position[0], answer);
        this.remove_possibility_on_col([cell], cell.position[1], answer);
    }

    remove_possibility(safe_cells: Cell[], numbers: number[]): void {
        const [y, x] = safe_cells[0].position;
        if (y == safe_cells[1].position[0]) {
            this.remove_possibility_on_row(safe_cells, y, numbers);
        } else {
            this.remove_possibility_on_col(safe_cells, x, numbers);
        }
    }

    remove_possibility_on_row(safe_cells: Cell[], y: number, numbers: number[]): void {
        for (let x = 0; x < this.n; x++) {
            this.remove_possibility_at([y, x], safe_cells, numbers);
        }
    }

    remove_possibility_on_col(safe_cells: Cell[], x: number, numbers: number[]): void {
        for (let y = 0; y < this.n; y++) {
            this.remove_possibility_at([y, x], safe_cells, numbers);
        }
    }

    remove_possibility_at([y, x]: Position, safe_cells: Cell[], numbers: number[]): void {
        const cell = this.cells[y][x];
        if (!safe_cells.includes(cell)) {
            const possibilities = cell.possibilities;
            numbers.map((i) => possibilities.delete(i));
        }
    }

    print(): void {
        const empty = new TextEncoder().encode(" ");
        const separator = new TextEncoder().encode(" | ");
        for (let y = 0; y < this.n; y++) {
            for (let x = 0; x < this.n; x++) {
                const cell = this.cells[y][x];
                for (let i = 1; i <= this.n; i++) {
                    if (cell.possibilities.has(i)) {
                        const b = new TextEncoder().encode(i.toString());
                        writeAllSync(Deno.stdout, b);
                    } else {
                        writeAllSync(Deno.stdout, empty);
                    }
                }
                if (x < this.n - 1) {
                    writeAllSync(Deno.stdout, separator);
                }
            }
            console.log("");
        }
        console.log();
    }
};
