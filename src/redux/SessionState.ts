import { ActorData, TileData } from '../state/Definitions';

export class ActorsState {
    constructor(
        public readonly id: string,
        public readonly actor: ActorData,
        public readonly position: { x: number; y: number } | null
    ) {}
}
export type ActorMapping = { [k: string]: ActorsState };

export class PositionInformation {
    constructor(
        public readonly x: number,
        public readonly y: number,
        public readonly id: string,
        public readonly type: string
    ) {}
}

export class SessionState {
    constructor(
        public readonly map: TileData[][] = [[]],
        public readonly actors: ActorData[] = [],
        public readonly fieldState: PositionInformation[] = [],
        public readonly hover: Phaser.Geom.Point | null = null,
        public readonly selection: TileData | null = null,
        public readonly rotation: number = 0
    ) {}
}
