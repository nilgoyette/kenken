import { Cage, Removal } from "./lib.ts";

export class Equal extends Cage {
    init(): void  {
        // There's only one cell
        this.cells[0].possibilities = new Set([this.result]);
    }

    solve(): Removal[] {
        return [];
    }
}
