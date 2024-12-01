import { Equal } from "./cage/equal.ts";
import { Cage } from "./cage/lib.ts";
import { Cell } from "./cell.ts";
import { KenKen } from "./kenken.ts";

export class Solver {
    readonly debug: boolean;
    readonly n: number;
    kenken: KenKen;
    

    constructor(kenken: KenKen, debug: boolean) {
        this.debug = debug;
        this.n = kenken.n;
        this.kenken = kenken;

        // Apply the strategies that can only run once
        for (const cage of kenken.cages) {
            if (cage instanceof Equal) {
                kenken.remove_cross_at(cage.cells[0]);
            }
        }
        if (this.debug) {
            this.kenken.print();
        }
    }

    solve(): number[][] {
        const cages = this.kenken.cages.filter((c) => !(c instanceof Equal));
        
        let at_least_one = false;
        do {
            // 1 Solve the cages
            if (this.solve_cages(cages)) {
                at_least_one = true;
                if (this.debug) {
                    console.log(">>> 1");
                    this.kenken.print();
                }
            }

            // 2 Find unique
            if (this.find_unique()) {
                at_least_one = true;
                if (this.debug) {
                    console.log(">>> 2");
                    this.kenken.print();
                }
            }

            // 3 Find double and triple
            if (this.find_double()) {
                at_least_one = true;
                if (this.debug) {
                    console.log(">>> 3");
                    this.kenken.print();
                }
            }

            if (this.nb_unknown() == 0) {
                break;
            }
        } while (at_least_one);

        const answer: number[][] = [];
        for (const row of this.kenken.rows) {
            answer.push(row.map((c) => c.answer()));
        }
        return answer;
    }

    solve_cages(cages: Cage[]): boolean {
        let at_least_one = false;
        for (const cage of cages) {
            if (cage.solve()) {
                at_least_one = true;
            }

            // TODO Do we actually need this? Won't it be done by `find_unique`?
            for (const cell of cage.cells) {
                const answer = cell.answer();
                if (answer) {
                    this.kenken.remove_cross_at(cell);
                }
            }
        }
        return at_least_one;
    }

    find_unique(): boolean {
        let at_least_one = false;
        for (const row of this.kenken.rows) {
            if (this.find_unique_in_line(row)) {
                at_least_one = true;
            }
        }
        for (const col of this.kenken.cols) {
            if (this.find_unique_in_line(col)) {
                at_least_one = true;
            }
        }
        return at_least_one;
    }

    find_unique_in_line(line: Cell[]): boolean {
        let at_least_one = false;
        for (let i = 1; i <= this.n; i++) {
            const has_it = line.map(
                (c) => c.possibilities.has(i)
            );
            if (has_it.filter((c) => c).length == 1) {
                const cell = line[has_it.findIndex((c) => c)];
                // This is to avoid catching cell which we already have the answer
                if (cell.possibilities.size > 1) {
                    cell.possibilities = new Set([i]);
                    this.kenken.remove_cross_at(cell);
                    at_least_one = true;
                }
            }
        }
        return at_least_one;
    }

    find_double(): boolean {
        let at_least_one = false;
        for (const row of this.kenken.rows) {
            if (this.find_double_in_line(row)) {
                at_least_one = true;
            }
        }
        for (const col of this.kenken.cols) {
            if (this.find_double_in_line(col)) {
                at_least_one = true;
            }
        }
        return at_least_one;
    }

    find_double_in_line(line: Cell[]): boolean {
        let at_least_one = false;
        for (const c1 of line) {
            if (c1.possibilities.size < 2) {
                continue;
            }

            const safe_cells = [c1];
            for (const c2 of line) {
                if (c1 != c2) {
                    if (c2.possibilities.isSubsetOf(c1.possibilities)) {
                        safe_cells.push(c2);
                    }
                }
            }
            if (safe_cells.length == c1.possibilities.size) {
                const numbers = [...c1.possibilities];
                if (c1.position[0] == safe_cells[1].position[0]) {
                    const y = c1.position[0];
                    this.kenken.remove_possibility_on_row(safe_cells, y, numbers);
                } else {
                    const x = c1.position[1];
                    this.kenken.remove_possibility_on_col(safe_cells, x, numbers);
                }
                at_least_one = true;
            }
        }
        return at_least_one;
    }

    nb_unknown(): number {
        let nb = 0;
        for (const cage of this.kenken.cages) {
            nb += cage.cells.filter((c) => c.answer() == 0).length;
        }
        return nb;
    }
}
