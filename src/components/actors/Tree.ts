import { ActorsState } from "../../redux/SessionState";
import { ActorData, TileData } from "../../state/Definitions";
import { Actor } from "./Actor";

export class Tree extends Actor {
    protected sprite: Phaser.GameObjects.Sprite | null = null;
    protected graphics: Phaser.GameObjects.Graphics | null = null;
    protected state: ActorData | null = null;

    constructor(state: ActorData) {
        super(state);
    }

    public static createAnimation(scene: Phaser.Scene){
        scene.anims.create({
            key: "tree_move",
            repeat: -1,
            frameRate: .5,
            yoyo: true,
            frames:scene.anims.generateFrameNumbers("tree", { start: 0, end: 1 })
        });
    }

    public preload(scene: Phaser.Scene): void{
        scene.load.spritesheet("tree", "/public/Tiles/Tree_1.svg", {frameWidth:120, frameHeight: 150});
    }

    public create(scene: Phaser.Scene, data: ActorData, tileData: TileData): void{
        const coords = new Phaser.Geom.Point(tileData.x, tileData.y - 20 * tileData.h - 45);
        this.sprite = scene.add.sprite(coords.x, coords.y, "tree");
        this.sprite.setScale(1,1);
        this.sprite.setDepth(coords.y+56);
        this.sprite.play("tree_move");
    }
}
