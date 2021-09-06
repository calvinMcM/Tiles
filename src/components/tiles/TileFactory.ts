import Phaser from 'phaser';

import { BlockContext, BlockType, TileData } from '../../state/Definitions';
import { Dirt } from './Dirt';
import { Grass } from './Grass';
import { Tile } from './Tile';
import { Water } from './Water';

export abstract class TileFactory {
    constructor(public readonly tileData: TileData) {}

    public static create(
        scene: Phaser.Scene,
        tileData: TileData,
        context: BlockContext,
        postCreate: (tile: Tile) => void
    ): Tile {
        let t: Tile;
        switch (tileData.t) {
            case BlockType.GRASS:
                t = new Grass(tileData);
                break;
            case BlockType.DIRT:
                t = new Dirt(tileData);
                break;
            case BlockType.WATER:
                t = new Water(tileData);
                break;
            default:
                t = new Dirt(tileData);
                break;
        }
        t.create(scene, tileData, context);
        postCreate(t);
        return t;
    }

    public static update(
        scene: Phaser.Scene,
        tile: Tile,
        tileData: TileData,
        context: BlockContext,
        selected: boolean,
        hovered: boolean,
        postCreate: (tile: Tile) => void
    ): void {
        if (tileData.t != tile.tileData.t) {
            tile = TileFactory.recast(scene, tile, tileData, context, postCreate);
        }
        tile.update(hovered, selected);
    }

    private static recast(
        scene: Phaser.Scene,
        tile: Tile,
        tileData: TileData,
        context: BlockContext,
        postCreate: (tile: Tile) => void
    ): Tile {
        tile.destroy();
        tile = TileFactory.create(scene, tileData, context, postCreate);
        return tile;
    }
}
