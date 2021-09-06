import Phaser from "phaser";
import { isConstructorDeclaration } from "typescript";
import { BlockContext, BlockType, TileData } from "../../state/Definitions";
import { Dirt } from "./Dirt";
import { Grass } from "./Grass";
import { TileFactory } from "./TileFactory";
import { Water } from "./Water";

export abstract class Tile {
    protected actualX: number = 0;
    protected actualY: number = 0;
    protected topSprite: Phaser.GameObjects.Sprite | null = null;
    protected edgeSprites: Phaser.GameObjects.Sprite[] = [];
    protected sideSprites: Phaser.GameObjects.Sprite[] = [];
    protected graphics: Phaser.GameObjects.Graphics | null = null;
    private group: Phaser.GameObjects.Group | null = null;
    constructor(public readonly tileData: TileData) {}

    public static preload(scene: Phaser.Scene): void {
        scene.load.spritesheet({
            key: "tile_tops",
            url: "/Tiles/tile_top_atlas.svg",
            frameConfig: { frameWidth: 100, frameHeight: 60 },
        });
        scene.load.spritesheet("left_sides", "/Tiles/tile_left_atlas.svg", { frameWidth: 50, frameHeight: 50 });
        scene.load.spritesheet("right_sides", "/Tiles/tile_right_atlas.svg", { frameWidth: 50, frameHeight: 50 });
        scene.load.spritesheet("tile_edges", "/Tiles/tile_edge_atlas.svg", { frameWidth: 50, frameHeight: 30 });
    }

    public getX(){
        return this.actualX
    }

    public getY(){
        return this.actualY
    }

    public abstract create(scene: Phaser.Scene, tileData: TileData, context: BlockContext): void;

    public update(hovered: boolean, selected: boolean){
        if (this.graphics != null) {
            this.graphics.clear();
            if (this.tileData.a) {
                this.tileData.a;
                // console.log("Tile has actor:", tileData);
                this.graphics.setDefaultStyles({
                    fillStyle: {
                        color: 0xff0000,
                    },
                });
                this.graphics.fillCircle(this.actualX, this.actualY, 10);
            }
            if (hovered) {
                this.graphics.setDefaultStyles({
                    fillStyle: {
                        color: 0x6666ff,
                        alpha: 0.5,
                    },
                    lineStyle: {
                        color: 0xaaaaff,
                        width: 2,
                    },
                });

                this.graphics.moveTo(this.actualX, this.actualY - 30);
                this.graphics.lineTo(this.actualX + 50, this.actualY);
                this.graphics.lineTo(this.actualX, this.actualY + 30);
                this.graphics.lineTo(this.actualX - 50, this.actualY);
                this.graphics.lineTo(this.actualX, this.actualY - 30);
                this.graphics.fill();
                this.graphics.stroke();
            }
            if (selected) {
                this.graphics.setDefaultStyles({
                    fillStyle: {
                        color: 0x2222ff,
                        alpha: 0.5,
                    },
                    lineStyle: {
                        width: 3,
                        color: 0x0000ff,
                    },
                });

                this.graphics.moveTo(this.actualX, this.actualY - 30);
                this.graphics.lineTo(this.actualX + 50, this.actualY);
                this.graphics.lineTo(this.actualX, this.actualY + 30);
                this.graphics.lineTo(this.actualX - 50, this.actualY);
                this.graphics.lineTo(this.actualX, this.actualY - 30);
                this.graphics.fill();
                this.graphics.stroke();
            }
        }
    }

    protected setDepthSorting(){
        ([this.topSprite, ...this.sideSprites, ...this.edgeSprites] as Phaser.GameObjects.Sprite[])
        .filter(s => s !== null)
        .forEach((s: Phaser.GameObjects.Sprite) => {
            s.setDepth(this.actualY);
        })
        this.graphics?.setDepth(this.getY());
    }

    public destroy(){
        this.topSprite?.destroy();
        this.graphics?.destroy();
        this.edgeSprites.forEach((s) => s.destroy());
        this.sideSprites.forEach((s) => s.destroy());
    }

    public initializeTileEvents() {
        if (this.topSprite != null) {
            this.topSprite.setInteractive(
                new Phaser.Geom.Polygon([
                    { x: this.actualX - 50, y: this.actualY },
                    { x: this.actualX, y: this.actualY - 30 },
                    { x: this.actualX + 50, y: this.actualY },
                    { x: this.actualX, y: this.actualY + 30 },
                ]),
                (bounding, clickX, clickY) => {
                    //  AABB from top left corner of counding box
                    if (clickX < 0 || clickX > 100 || clickY < 0 || clickY > 60) {
                        return false;
                    }
                    // Rect Calc
                    const leftXDelta = 50 - Math.abs(clickX - 50); // distance from the nearest side
                    if (leftXDelta == 0) {
                        return true;
                    }
                    const ratio = Math.abs(clickY - 30) / leftXDelta;
                    const inRange = ratio <= 0.6;
                    return inRange;
                }
            );
        } else {
            console.error("Tile Events uninitialized - top sprite not present.");
        }
    }

    public registerOnClick(callback: (tile: Tile) => void) {
        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => callback(this));
    }

    public registerOnHover(callback: (tile: Tile) => void) {
        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => callback(this));
    }

    public on(event: string | symbol, callback: (tile: Tile) => void) {
        if (this.topSprite) {
            this.topSprite.on(event, () => callback(this));
            return true;
        }
        console.log("Event skipped - sprite unset.");
        return false;
    }
}
