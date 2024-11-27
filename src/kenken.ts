import { writeAllSync } from "jsr:@std/io";

import { Divide } from "./cage/divide.ts";
import { Equal } from "./cage/equal.ts";
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

    add_cell(cells: Cell[], op: Operation, result: number): void {
        let cage: Cage;
        switch (op) {
            case "+": cage = new Plus(this.n, cells, result); break;
            case "-": cage = new Minus(this.n, cells, result); break;
            case "*": cage = new Times(this.n, cells, result); break;
            case "/": cage = new Divide(this.n, cells, result); break;
            case "=": cage = new Equal(this.n, cells, result); break;
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
        this.add_cell([cell], "=", answer);
    }

    // Ensure that the position `p` has not already been used by another cage.
    assert_free_cell(p: Position): void {
        for (const cage of this.cages) {
            for (const cell of cage.cells) {
                if (p === cell.position) {
                    throw new Error('Something bad happened');
                }
            }
        }
    }

    solve(): void {
        const cage_eq = this.cages.filter((c) => c instanceof Equal);
        const cages = this.cages.filter((c) => !(c instanceof Equal));

        // Only run the = once
        for (const cage of cage_eq) {
            this.remove_cross_at(cage.cells[0]);
        }
        this.print();
        
        let last_nb_unknown = 0;
        let new_nb_unknown = this.nb_unknown();
        do {
            last_nb_unknown = new_nb_unknown;

            // 1 Solve the cages
            if (this.solve_cages(cages)) {
                console.log(">>> 1");
                this.print();
            }

            new_nb_unknown = this.nb_unknown();
            if (new_nb_unknown == 0) {
                break;
            }
        } while (new_nb_unknown < last_nb_unknown);
    }

    solve_cages(cages: Cage[]): boolean {
        let at_least_one = true;
        for (const cage of cages) {
            cage.solve();
            for (const cell of cage.cells) {
                const answer = cell.answer();
                if (answer) {
                    this.remove_cross_at(cell);
                }
            }
        }
        return at_least_one;
    }

    remove_cross_at(cell: Cell): void {
        const answer = [cell.answer()];
        this.remove_possibility_on_row([cell], cell.position[0], answer);
        this.remove_possibility_on_col([cell], cell.position[1], answer);
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
            const removed = numbers.map((i) => possibilities.delete(i));
            /*if (removed.some((b) => b) && cell.possibilities.size == 1) {
                const [number] = cell.possibilities;
                this.remove_possibility(cage, new Removal([y, x], 'row', [number]));
            }*/
        }
    }

    nb_unknown(): number {
        let nb = 0;
        for (const cage of this.cages) {
            nb += cage.cells.filter((c) => c.answer() == 0).length;
        }
        return nb;
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
