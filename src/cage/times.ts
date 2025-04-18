import { Cage } from "./lib.ts";

export class Times extends Cage {
    init(): void  {
        const factors = new Set<number>;
        for (let f = 1; f <= this.n; f++) {
            if (Number.isInteger(this.result / f)) {
                factors.add(f);
            }
        }
        this.set_to_all_cells(factors);
    }

    neutral(): number {
        return 1;
    }

    apply_ops(a: number, b: number): number {
        return a * b;
    }

    apply_reverse_ops(total: number): number {
        return this.result / total;
    }
}
