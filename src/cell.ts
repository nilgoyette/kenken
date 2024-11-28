export type Position = [number, number];

export class Cell {
    position: Position;
    possibilities: Set<number>;
    used: boolean;
    cage_id: number;
    trying: number;

    constructor(position: Position) {
        this.position = position;
        this.possibilities = new Set<number>;
        this.used = false;
        this.cage_id = -1;
        this.trying = 0;
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
