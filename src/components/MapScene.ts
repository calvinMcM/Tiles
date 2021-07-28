import Phaser from "phaser";
import { MAP_SEL_SET } from "../redux/actions/MapActions";
import { SessionState } from "../redux/SessionState";
import store from "../redux/SessionStore";
import { BlockContext, BlockType, TileData } from "../state/Definitions";

export const SCREEN_DIM: Phaser.Geom.Point = new Phaser.Geom.Point(800, 600);
const FRINGE_WIDTH = 50;
export class TileSpriteMemo{
    constructor(
        public readonly topSprite: Phaser.GameObjects.Image,
        public readonly graphics: Phaser.GameObjects.Graphics,
        public readonly actualX: number,
        public readonly actualY: number,
    ){}
}

export class ActorSpriteMemo{
    constructor(
        public readonly sprite: Phaser.GameObjects.Sprite,
    ){}
}

export function drawGrassTile(scene: Phaser.Scene, tileData: TileData, context: BlockContext) {
    const coords = new Phaser.Geom.Point(tileData.x, tileData.y - 20 * tileData.h + 10);
    const leftGap = tileData.h - (context.S?.h || 0);
    const rightGap = tileData.h - (context.E?.h || 0);
    for (let i = 0; i < leftGap; i++) {
        scene.add.image(tileData.x - 25, tileData.y + 35 - 20 * (tileData.h - i), "left_sides", 0);
    }
    for (let i = 0; i < rightGap; i++) {
        scene.add.image(tileData.x + 25, tileData.y + 35 - 20 * (tileData.h - i), "right_sides", 0);
    }
    const top = scene.add.image(coords.x, coords.y, "tile_tops", tileData.variant);
    if (context.N === null || context.N.h < tileData.h || context.N.t != tileData.t) {
        scene.add.image(coords.x+25, coords.y-15, "tile_edges", 2);
    }
    if (context.W === null || context.W.h < tileData.h || context.W.t != tileData.t) {
        scene.add.image(coords.x-25, coords.y-15, "tile_edges", 3);
    }
    if (context.S === null || context.S.h < tileData.h || context.S.t != tileData.t) {
        scene.add.image(coords.x-25, coords.y+15, "tile_edges", 1);
    }
    if (context.E === null || context.E.h < tileData.h || context.E.t != tileData.t) {
        scene.add.image(coords.x+25, coords.y+15, "tile_edges", 0);
    }
    const g = scene.add.graphics();
    return new TileSpriteMemo(top, g, coords.x, coords.y);
}

export function drawDirtTile(scene: Phaser.Scene, tileData: TileData, context: BlockContext) {
    const coords = new Phaser.Geom.Point(tileData.x, tileData.y - 20 * tileData.h + 10);
    const leftGap = tileData.h - (context.S?.h || 0);
    const rightGap = tileData.h - (context.E?.h || 0);
    for (let i = 0; i < leftGap; i++) {
        scene.add.image(tileData.x - 25, tileData.y + 35 - 20 * (tileData.h - i), "left_sides", 0);
    }
    for (let i = 0; i < rightGap; i++) {
        scene.add.image(tileData.x + 25, tileData.y + 35 - 20 * (tileData.h - i), "right_sides", 0);
    }
    const top = scene.add.image(coords.x, coords.y, "tile_tops", 4 + tileData.variant);
    if (context.N === null || context.N.h < tileData.h || context.N.t != tileData.t) {
        scene.add.image(coords.x+25, coords.y-15, "tile_edges", 4 + 2);
    }
    if (context.W === null || context.W.h < tileData.h || context.W.t != tileData.t) {
        scene.add.image(coords.x-25, coords.y-15, "tile_edges", 4 + 3);
    }
    if (context.S === null || context.S.h < tileData.h || context.S.t != tileData.t) {
        scene.add.image(coords.x-25, coords.y+15, "tile_edges", 4 + 1);
    }
    if (context.E === null || context.E.h < tileData.h || context.E.t != tileData.t) {
        scene.add.image(coords.x+25, coords.y+15, "tile_edges", 4 + 0);
    }
    const g = scene.add.graphics();
    return new TileSpriteMemo(top, g, coords.x, coords.y);
}

export function drawWaterTile(scene: Phaser.Scene, tileData: TileData, context: BlockContext) {
    const coords = new Phaser.Geom.Point(tileData.x, tileData.y - 20 * tileData.h + 10);
    const leftGap = tileData.h - (context.S?.h || 0);
    const rightGap = tileData.h - (context.E?.h || 0);
    for (let i = 0; i < leftGap; i++) {
        scene.add.image(tileData.x - 25, tileData.y + 35 - 20 * (tileData.h - i), "left_sides", 24);
    }
    for (let i = 0; i < rightGap; i++) {
        scene.add.image(tileData.x + 25, tileData.y + 35 - 20 * (tileData.h - i), "right_sides", 24);
    }
    const top = scene.add.image(coords.x, coords.y, "tile_tops", 20 + tileData.variant);
    if (context.N === null || context.N.h < tileData.h || context.N.t != tileData.t) {
        scene.add.image(coords.x+25, coords.y-15, "tile_edges", 8 + 2);
    }
    if (context.W === null || context.W.h < tileData.h || context.W.t != tileData.t) {
        scene.add.image(coords.x-25, coords.y-15, "tile_edges", 8 + 3);
    }
    if (context.S === null || context.S.h < tileData.h || context.S.t != tileData.t) {
        scene.add.image(coords.x-25, coords.y+15, "tile_edges", 8 + 1);
    }
    if (context.E === null || context.E.h < tileData.h || context.E.t != tileData.t) {
        scene.add.image(coords.x+25, coords.y+15, "tile_edges", 8 + 0);
    }
    const g = scene.add.graphics();
    return new TileSpriteMemo(top, g, coords.x, coords.y);
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
    // private selectionLayer: Phaser.GameObjects.Graphics;
    private tileSprites: {[v: number]: {[u: number]: TileSpriteMemo}} = {};
    private actorSprites: {[name: string]: ActorSpriteMemo} = {};
    private tileHovered: Phaser.Geom.Point = null as any;

    constructor() {
        super("GameScene");
        this.offset = new Phaser.Geom.Point(0, 0);
        this.bounds = null as any;
        // this.selectionLayer = null as any;
    }

    preload() {
        this.load.spritesheet({
            key: "tile_tops",
            url: "/Tiles/tile_top_atlas.svg",
            frameConfig: { frameWidth: 100, frameHeight: 60 },
        });
        this.load.spritesheet("left_sides", "/Tiles/tile_left_atlas.svg", { frameWidth: 50, frameHeight: 50 });
        this.load.spritesheet("right_sides", "/Tiles/tile_right_atlas.svg", { frameWidth: 50, frameHeight: 50 });
        this.load.spritesheet("tile_edges", "/Tiles/tile_edge_atlas.svg", { frameWidth: 50, frameHeight: 30 });
        this.load.spritesheet("knight", "/Tiles/Knight2.svg", { frameWidth: 80, frameHeight: 160 });
    }

    private initializeTileEvents(u: number, v: number){
        const {topSprite, graphics, actualX, actualY} = this.tileSprites[v][u];
        // console.log("Initialized:", u, v)
        graphics.setDefaultStyles({
            lineStyle: {
                width: 2,
                color: 0x006f00,
            },
        });
        topSprite.setInteractive(new Phaser.Geom.Polygon([
            {x: actualX - 50, y: actualY},
            {x: actualX, y: actualY - 30},
            {x: actualX + 50, y: actualY},
            {x: actualX, y: actualY + 30}
        ]), (bounding, clickX, clickY) => {
            //  AABB from top left corner of counding box
            if (clickX < 0 || clickX > 100 || clickY < 0 || clickY > 60){ return false}
            // Rect Calc
            const leftXDelta = 50 - Math.abs(clickX - 50); // distance from the nearest side
            if(leftXDelta == 0){ return true; }
            const ratio = Math.abs(clickY - 30) / leftXDelta;
            const inRange = ratio <= .60;
            return inRange
        });
        topSprite.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, (ev: any, clickX: number, clickY: number) => {
            const tileData = this.state.map[v][u];
            console.log(tileData, clickX, clickY)
            store.dispatch(MAP_SEL_SET(tileData));
        });
        topSprite.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, (ev: any, clickX: number, clickY: number) => {
            this.tileHovered = new Phaser.Geom.Point(u, v)
        });
    }

    createTile(tileData: TileData, context: BlockContext, selected: boolean) {
        const coords = new Phaser.Geom.Point(tileData.x, tileData.y - 20 * tileData.h + 10);
        if(this.tileSprites[tileData.v] == undefined){
            this.tileSprites[tileData.v] = {};
        }
        switch (tileData.t) {
            case BlockType.GRASS:
                this.tileSprites[tileData.v][tileData.u] = drawGrassTile(this, tileData, context);
                break;
            case BlockType.DIRT:
                this.tileSprites[tileData.v][tileData.u] = drawDirtTile(this, tileData, context);
                break;
            case BlockType.ROCK:
                this.tileSprites[tileData.v][tileData.u] = drawWaterTile(this, tileData, context);
                break;
            case BlockType.SAND:
                this.tileSprites[tileData.v][tileData.u] = drawWaterTile(this, tileData, context);
                break;
            case BlockType.WATER:
                this.tileSprites[tileData.v][tileData.u] = drawWaterTile(this, tileData, context);
                break;
            case BlockType.CASTLE:
                this.tileSprites[tileData.v][tileData.u] = drawWaterTile(this, tileData, context);
                break;
            default:
                this.tileSprites[tileData.v][tileData.u] = drawWaterTile(this, tileData, context);
                break;
        }
        
        if(tileData.a && this.state.actors[tileData.a]) {
            const actor = this.state.actors[tileData.a].actor;
            if(tileData.a == "A01"){
                console.log("Adding Knight!");
                const s = this.add.sprite(coords.x, coords.y - 30, "knight", 0);
                s.setScale(.5, .5);
                this.actorSprites[tileData.a] = new ActorSpriteMemo(s);
            }
            else{
                console.log("Not Rendering", actor.name)
            }
        }
    }

    create() {
        const unsub = store.subscribe(() => {
            this.state = store.getState();
        });
        this.state = store.getState();

        this.bounds = {
            minx: 50 * this.state.map.length + 20,
            miny: -50 - 20 * this.state.map.length * 2,
            maxx: -50 * this.state.map.length - 20,
            maxy: 200,
        };
        this.offset = new Phaser.Geom.Point(0, 0);

        this.state.map.forEach((row, y) => {
            row.forEach((tile, x) => {
                const context = BlockContext.fromMapContext(this.state.map, x, y);
                this.createTile(tile, context, TileData.equal(this.state.selection, tile));
                this.initializeTileEvents(tile.u, tile.v);
            });
        });
        // const data = Array.from({length: 16}, () => Array.from({length: 16}, () => 0))
        // const tiles = this.make.tilemap({tileWidth: 100, tileHeight: 60, width:16, height: 16, orientation: "staggered"} as any);
        // // const tiles = this.add.tilemap(undefined, 100, 60, 16, 16, data);
        // const tileset = tiles.addTilesetImage("water", "logo")
        // const layer = tiles.createBlankLayer("base", tileset);
        // layer.fill(0)
        // console.log(tiles, layer, Phaser.Tilemaps.ISOMETRIC)
        // layer.
        const t = this.add.text(0, 0, "0,0", { color: "white" });
        this.add.text(800, 400, "800,400", { color: "white" });
        this.add.text(-800, 400, "-800,400", { color: "white" });
        this.add.text(0, 800, "0,800", { color: "white" });
        // this.grp.add(t);

        this.cameras.main.setBounds(-1000, -500, 2000, 1500);

        // this.selectionLayer = this.add.graphics();

        // this.tweens.add({
        //     targets: logo,
        //     y: 350,
        //     duration: 1500,
        //     ease: 'Sine.inOut',
        //     yoyo: true,
        //     repeat: -1
        // });
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
                tile.graphics.clear();
                const tileData = this.state.map[v][u];
                if(tileData.a && this.state.actors[tileData.a]){
                    tileData.a
                    // console.log("Tile has actor:", tileData);
                    tile.graphics.setDefaultStyles({
                        fillStyle: {
                            color: 0xff0000
                        }
                    })
                    tile.graphics.fillCircle(tile.actualX,tile.actualY, 10);
                }
            })
        ])
        if (this.tileHovered != null){
            const tile = this.state.map[this.tileHovered.y][this.tileHovered.x];
            const coords = new Phaser.Geom.Point(tile.x, tile.y - 20 * tile.h + 10);
            const selectionLayer = this.tileSprites[tile.v][tile.u].graphics;
            selectionLayer.setDefaultStyles({
                fillStyle: {
                    color: 0x6666ff,
                    alpha: .5,
                },
                lineStyle: {
                    color: 0xaaaaff,
                    width: 2,
                },
            });
            
            selectionLayer.moveTo(coords.x, coords.y - 30);
            selectionLayer.lineTo(coords.x + 50, coords.y);
            selectionLayer.lineTo(coords.x, coords.y + 30);
            selectionLayer.lineTo(coords.x - 50, coords.y);
            selectionLayer.lineTo(coords.x, coords.y - 30);
            selectionLayer.fill();
            selectionLayer.stroke();

        }
        if (this.state.selection != null){
            const coords = new Phaser.Geom.Point(this.state.selection.x, this.state.selection.y - 20 * this.state.selection.h + 10);
            const selectionLayer = this.tileSprites[this.state.selection.v][this.state.selection.u].graphics;
            selectionLayer.setDefaultStyles({
                fillStyle: {
                    color: 0x2222ff,
                    alpha: .5,
                },
                lineStyle: {
                    width: 3,
                    color: 0x0000ff,
                },
            });
            
            selectionLayer.moveTo(coords.x, coords.y - 30);
            selectionLayer.lineTo(coords.x + 50, coords.y);
            selectionLayer.lineTo(coords.x, coords.y + 30);
            selectionLayer.lineTo(coords.x - 50, coords.y);
            selectionLayer.lineTo(coords.x, coords.y - 30);
            selectionLayer.fill();
            selectionLayer.stroke();
        }
    }
}
