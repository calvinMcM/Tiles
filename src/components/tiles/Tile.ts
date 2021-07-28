import Phaser from "phaser";

export abstract class Tile{
    constructor(
        public readonly u: number,
        public readonly v: number,
        public readonly topSprite: Phaser.GameObjects.Image,
        public readonly graphics: Phaser.GameObjects.Graphics,
        public readonly actualX: number,
        public readonly actualY: number,
    ){}

    public preload(scene: Phaser.Scene){

    }

    public create(scene: Phaser.Scene){

    }

    public update(scene: Phaser.Scene){

    }

    private initializeTileEvents(u: number, v: number){
        this.graphics.setDefaultStyles({
            lineStyle: {
                width: 2,
                color: 0x006f00,
            },
        });
        this.topSprite.setInteractive(new Phaser.Geom.Polygon([
            {x: this.actualX - 50, y: this.actualY},
            {x: this.actualX, y: this.actualY - 30},
            {x: this.actualX + 50, y: this.actualY},
            {x: this.actualX, y: this.actualY + 30}
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
    }

    public registerOnClick(callback: (tile:Tile) => void){
        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => callback(this));
    }

    public registerOnHover(callback: (tile:Tile) => void){
        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => callback(this));
    }

    public on(event: string | symbol, callback: (tile:Tile) => void){
        if(this.topSprite){
            this.topSprite.on(event, () => callback(this));
            return true;
        }
        return false;
    }

}