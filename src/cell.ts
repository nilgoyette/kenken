export type Position = [number, number];

export class Cell {
    position: Position;
    possibilities: Set<number>;
    saved_state: Set<number>;
    used: boolean;
    cage_id: number;

    constructor(position: Position) {
        this.position = position;
        this.possibilities = new Set;
        this.saved_state = new Set;
        this.used = false;
        this.cage_id = -1;
    }

    save(): void {
        this.saved_state = new Set(this.possibilities);
    }

    load(): void {
        this.possibilities = this.saved_state;
        this.saved_state = new Set;
    }

    answer(): number {
        if (this.possibilities.size == 1) {
            const [answer] = this.possibilities;
            return answer;
        }
        return 0;
    }
};

export function range(start: number, end: number): number[] {
    return Array.from({ length: (end - start) }, (_v, k) => k + start);
}
