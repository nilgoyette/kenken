import { Cell } from "../cell.ts";
import { Cage } from "./lib.ts";

export class Equal extends Cage {
    init(): void  {
        // There's only one cell
        this.cells[0].possibilities = new Set([this.result]);
    }

    solve(): boolean {
        return false;
    }

    force(cells: Cell[], i: number): boolean {
        return false;
    }
}
