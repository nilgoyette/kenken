export type Position = [number, number];

export class Cell {
    position: Position;
    possibilities: Set<number>;
    used: boolean
    trying: number

    constructor(position: Position) {
        this.position = position;
        this.possibilities = new Set<number>;
        this.used = false;
        this.trying = 0;
    }
};

export function range(start: number, end: number): number[] {
    return Array.from({ length: (end - start) }, (_v, k) => k + start);
}
