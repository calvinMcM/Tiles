import { ActorsState } from "../../redux/SessionState";
import { ActorData, TileData } from "../../state/Definitions";

export abstract class Actor {
    protected sprite: Phaser.GameObjects.Sprite | null = null;
    protected graphics: Phaser.GameObjects.Graphics | null = null;
    protected state: ActorData | null = null;

    constructor(state: ActorData) {
        this.state = state;
        this.sprite = null;
        this.graphics = null;
    }

    public abstract preload(scene: Phaser.Scene): void;

    public abstract create(scene: Phaser.Scene, data: ActorData, tileData: TileData): void;

    public update() {
        if (this.graphics != null) {
            this.graphics.clear();
        }
    }

    protected setDepthSorting(position: Phaser.Geom.Point) {
        const y = position?.y;
        if (y !== undefined) {
            ([this.sprite] as Phaser.GameObjects.Sprite[])
                .filter((s) => s !== null)
                .forEach((s: Phaser.GameObjects.Sprite) => {
                    s.setDepth(y);
                });
            this.graphics?.setDepth(y);
        }
    }
}
