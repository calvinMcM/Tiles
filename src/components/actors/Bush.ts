import { ActorsState } from "../../redux/SessionState";
import { ActorData, TileData } from "../../state/Definitions";
import { Actor } from "./Actor";

export class Bush extends Actor {
    protected sprite: Phaser.GameObjects.Sprite | null = null;
    protected graphics: Phaser.GameObjects.Graphics | null = null;
    protected state: ActorData | null = null;

    constructor(state: ActorData) {
        super(state);
    }

    public preload(scene: Phaser.Scene): void{
        scene.load.spritesheet("bush", "/public/Tiles/bush1.svg", {frameWidth:60, frameHeight: 50})
    }

    public create(scene: Phaser.Scene, data: ActorData, tileData: TileData): void{
        const coords = new Phaser.Geom.Point(tileData.x, tileData.y - 20 * tileData.h);
        this.sprite = scene.add.sprite(coords.x, coords.y, "bush")
        this.sprite.setScale(1,1)
        this.sprite.setDepth(coords.y+11)
    }
}
