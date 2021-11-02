import Phaser from 'phaser';
import { Unsubscribe } from 'redux';

import { MAP_HOV_SET, MAP_SEL_SET } from '../redux/actions/MapActions';
import { SessionState } from '../redux/SessionState';
import store from '../redux/SessionStore';
import { BlockContext, TileData } from '../state/Definitions';
import { Actor } from './actors/Actor';
import { Boulder } from './actors/Boulder';
import { Bush } from './actors/Bush';
import { TallGrass } from './actors/TallGrass';
import { Tree } from './actors/Tree';
import { Tile } from './tiles/Tile';
import { TileFactory } from './tiles/TileFactory';

export const SCREEN_DIM: Phaser.Geom.Point = new Phaser.Geom.Point(800, 600);
const FRINGE_WIDTH = 50;

export class ActorSpriteMemo {
    constructor(public readonly sprite: Phaser.GameObjects.Sprite) {}
}

export function drawKnightActor(scene: Phaser.Scene, tileData: TileData, context: BlockContext) {
    const coords = new Phaser.Geom.Point(tileData.x, tileData.y - 20 * tileData.h + 10);
    const leftGap = tileData.h - (context.S?.h || 0);
    const rightGap = tileData.h - (context.E?.h || 0);
    const top = scene.add.image(coords.x, coords.y - 150, "knight", 0);
    const g = scene.add.graphics();
    // return new TileSpriteMemo(top, g, coords.x, coords.y);
}

export class MapScene extends Phaser.Scene {
    private state: SessionState = null as any;
    private offset: Phaser.Geom.Point;
    private bounds: { minx: number; miny: number; maxx: number; maxy: number };
    private tileSprites: { [v: number]: { [u: number]: Tile } } = {};
    private actorSprites: { [name: string]: Actor } = {};
    private storeUnsubscribe: Unsubscribe | null = null;

    constructor() {
        super("GameScene");
        this.offset = new Phaser.Geom.Point(0, 0);
        this.bounds = null as any;
    }

    preload() {
        Tile.preload(this);
        this.load.spritesheet("bush", "/public/Tiles/bush1.svg", { frameWidth: 60, frameHeight: 50 });
        this.load.spritesheet("boulder", "/public/Tiles/Boulder1.svg", { frameWidth: 60, frameHeight: 50 });
        this.load.spritesheet("grass", "/public/Tiles/TallGrass_1.svg", { frameWidth: 60, frameHeight: 50 });
        this.load.spritesheet("tree", "/public/Tiles/Tree_1.svg", { frameWidth: 120, frameHeight: 150 });
        this.load.spritesheet("knight", "/Tiles/Knight2.svg", { frameWidth: 80, frameHeight: 160 });
    }

    protected initializeTileEvents(u: number, v: number) {
        const tile = this.tileSprites[v][u];
        tile.registerOnClick((tile) => {
            store.dispatch(MAP_SEL_SET(tile.tileData));
        });
        tile.registerOnHover((tile) => {
            store.dispatch(MAP_HOV_SET(new Phaser.Geom.Point(u, v)));
        });
    }

    create() {
        this.storeUnsubscribe = store.subscribe(() => {
            this.state = store.getState();
            // Update is being run continuously in the background, so the state will automatically percolate through.
        });
        this.state = store.getState();
        Tree.createAnimation(this);
        TallGrass.createAnimation(this);

        this.bounds = {
            minx: 50 * this.state.map.length + 20,
            miny: -50 - 20 * this.state.map.length * 2,
            maxx: -50 * this.state.map.length - 20,
            maxy: 200,
        };
        this.offset = new Phaser.Geom.Point(0, 0);

        this.state.map.forEach((row, y) => {
            row.forEach((tileData, x) => {
                const context = BlockContext.fromMapContext(this.state.map, x, y);
                if (this.tileSprites[tileData.v] == undefined) {
                    this.tileSprites[tileData.v] = {};
                }
                TileFactory.create(this, tileData, context, this.createTile.bind(this));
            });
        });
        this.state.actors.forEach((actor) => {
            console.log("Actor:", actor.id);
            const actorState = this.state.actors.find((a) => a.id == actor.id);
            switch (actor.name) {
                case "bush":
                    this.actorSprites[actor.id] = new Bush(actor);
                    break;
                case "boulder":
                    this.actorSprites[actor.id] = new Boulder(actor);
                    break;
                case "grass":
                    this.actorSprites[actor.id] = new TallGrass(actor);
                    break;
                case "tree":
                    this.actorSprites[actor.id] = new Tree(actor);
                    break;
                default:
                    this.actorSprites[actor.id] = new Bush(actor);
            }
            const pos = this.state.fieldState.find((fs) => fs.id === actor.id);
            const tile = !!pos ? this.state.map[pos.y][pos.x] : null;
            if (tile) {
                this.actorSprites[actor.id].create(this, actor, tile);
            }
        });
        this.cameras.main.setBounds(-1000, -500, 2000, 1500);
    }

    update() {
        if (this.input.isOver) {
            if (this.input.activePointer.x < FRINGE_WIDTH && this.input.activePointer.x >= 0) {
                this.offset.x += 5;
            }
            if (
                this.input.activePointer.x > SCREEN_DIM.x - FRINGE_WIDTH &&
                this.input.activePointer.x <= SCREEN_DIM.x
            ) {
                this.offset.x -= 5;
            }
            if (this.input.activePointer.y < FRINGE_WIDTH && this.input.activePointer.y >= 0) {
                this.offset.y += 5;
            }
            if (
                this.input.activePointer.y > SCREEN_DIM.y - FRINGE_WIDTH &&
                this.input.activePointer.y <= SCREEN_DIM.y
            ) {
                this.offset.y -= 5;
            }
            // console.log(this.offset);

            this.cameras.main.setScroll(-this.offset.x, -this.offset.y);
        }
        // this.selectionLayer.clear();
        Object.values(this.tileSprites).forEach((row, v) => [
            Object.values(row).forEach((tile, u) => {
                const tileData = this.state.map[v][u];
                const selected =
                    this.state?.selection?.u == tile.tileData.u && this.state?.selection?.v == tile.tileData.v;
                const hovered = u == this.state?.hover?.x && v == this.state?.hover?.y;
                TileFactory.update(
                    this,
                    tile,
                    tileData,
                    BlockContext.fromMapContext(this.state.map, u, v),
                    selected,
                    hovered,
                    this.createTile.bind(this)
                );
            }),
        ]);
    }

    destroy() {
        this.storeUnsubscribe && this.storeUnsubscribe();
    }

    protected createTile(tile: Tile) {
        const tileData = tile.tileData;
        this.tileSprites[tileData.v][tileData.u] = tile;
        this.initializeTileEvents(tile.tileData.u, tile.tileData.v);
        // this.state.actors

        // if (tileData.a && this.state.actors[tileData.a]) {
        //     console.log("Putting in actor")
        //     // const actor = this.state.actors[tileData.a].actor;
        //     this.actorSprites[tileData.a] = new Bush(this.state.actors[tileData.a]);
        //     // if (tileData.a == "A01") {
        //     //     console.log("Adding Knight!");
        //     //     const s = this.add.sprite(tile.tileData.x, tile.tileData.y - 50, "knight", 0);
        //     //     s.setDepth(tileData.y + 1);
        //     //     s.setScale(0.7, 0.7);
        //     //     this.actorSprites[tileData.a] = new ActorSpriteMemo(s);
        //     // } else {
        //     //     console.log("Not Rendering", actor.name);
        //     // }
        // }
    }
}
