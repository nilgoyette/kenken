import { Cage } from "./lib.ts";
import { range } from "../cell.ts";

export class Minus extends Cage {
    init(): void  {
        const N = this.n + 1;
        if (this.result >= N / 2) {
            const stop =  this.n - this.result;
            const x1 = range(1, stop + 1);
            const x2 = range(N - stop, N);
            const set = new Set(x1.concat(x2));
            this.set_to_all_cells(set);
        } else {
            this.set_to_all_cells(new Set(range(1, N)));
        }
    }

    neutral(): number {
        return 0;
    }

    ops(a: number, b: number): number {
        return a - b;
    }

    whatsLeft(total: number): number {
        return this.result + total;
    }
}
