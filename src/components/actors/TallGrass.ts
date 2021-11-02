import { ActorsState } from "../../redux/SessionState";
import { ActorData, TileData } from "../../state/Definitions";
import { Actor } from "./Actor";

export class TallGrass extends Actor {
    protected sprite: Phaser.GameObjects.Sprite | null = null;
    protected graphics: Phaser.GameObjects.Graphics | null = null;
    protected state: ActorData | null = null;

    constructor(state: ActorData) {
        super(state);
    }

    public static createAnimation(scene: Phaser.Scene){
        return scene.anims.create({
            key: "grass_move",
            repeat: -1,
            frameRate: 1.5,
            yoyo: true,
            frames:scene.anims.generateFrameNames("grass", { start: 0, end: 1 })
        });
    }

    public preload(scene: Phaser.Scene): void{
        scene.load.spritesheet("grass", "/public/Tiles/TallGrass_1.svg", {frameWidth:60, frameHeight: 50});
    }

    public create(scene: Phaser.Scene, data: ActorData, tileData: TileData): void{
        const coords = new Phaser.Geom.Point(tileData.x, tileData.y - 20 * tileData.h);
        this.sprite = scene.add.sprite(coords.x, coords.y, "grass");
        this.sprite.setScale(1,1);
        this.sprite.setDepth(coords.y+11);
        this.sprite.play(scene.anims.get("grass_move"), true);
    }
}
