import { Cage } from "./lib.ts";
import { range } from "../cell.ts";

export class Plus extends Cage {
    init(): void  {
        const all = range(1, this.n + 1);
        for (const cell of this.cells) {
            cell.possibilities = new Set(all);
        }
    }

    neutral(): number {
        return 0;
    }

    ordered(): boolean {
        return false;
    }

    apply_ops(a: number, b: number): number {
        return a + b;
    }

    apply_reverse_ops(a: number, b: number): number {
        return a - b;
    }
}
