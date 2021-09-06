import * as React from 'react';

import { BlockContext, TileData } from '../../state/Definitions';
import { Tile } from './Tile';

export class Stone extends Tile {
    public create(scene: Phaser.Scene, tileData: TileData, context: BlockContext): void {
        const coords = new Phaser.Geom.Point(tileData.x, tileData.y - 20 * tileData.h + 10);
        const leftGap = tileData.h - (context.S?.h || 0);
        const rightGap = tileData.h - (context.E?.h || 0);
        for (let i = 0; i < leftGap; i++) {
            this.sideSprites.push(scene.add.sprite(tileData.x - 25, tileData.y + 35 - 20 * (tileData.h - i), "left_sides", 0));
        }
        for (let i = 0; i < rightGap; i++) {
            this.sideSprites.push(scene.add.sprite(tileData.x + 25, tileData.y + 35 - 20 * (tileData.h - i), "right_sides", 0));
        }
        const top = scene.add.sprite(coords.x, coords.y, "tile_tops", tileData.variant);
        if (context.N === null || context.N.h < tileData.h || context.N.t != tileData.t) {
            this.edgeSprites.push(scene.add.sprite(coords.x + 25, coords.y - 15, "tile_edges", 2));
        }
        if (context.W === null || context.W.h < tileData.h || context.W.t != tileData.t) {
            this.edgeSprites.push(scene.add.sprite(coords.x - 25, coords.y - 15, "tile_edges", 3));
        }
        if (context.S === null || context.S.h < tileData.h || context.S.t != tileData.t) {
            this.edgeSprites.push(scene.add.sprite(coords.x - 25, coords.y + 15, "tile_edges", 1));
        }
        if (context.E === null || context.E.h < tileData.h || context.E.t != tileData.t) {
            this.edgeSprites.push(scene.add.sprite(coords.x + 25, coords.y + 15, "tile_edges", 0));
        }
        const g = scene.add.graphics();
        this.actualX = coords.x;
        this.actualY = coords.y;
        this.topSprite = top;
        this.graphics = g;
        this.setDepthSorting();
        this.initializeTileEvents();
    }

    public update(hovered: boolean, selected: boolean): void {
        super.update(hovered, selected);
    }

}