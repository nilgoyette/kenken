import { CageMore } from "./lib.ts";

export class Times extends CageMore {
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

    ops(a: number, b: number): number {
        return a * b;
    }

    whatsLeft(total: number): number {
        return this.result / total;
    }
}
