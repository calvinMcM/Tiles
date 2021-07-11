import { createAction } from "typesafe-actions";
import { TileData } from "../../state/Definitions";

export const MAP_SET = createAction("map/set", //).map(
    resolve => {
        return (data: TileData[][]) => resolve(data)
    }
);

export const MAP_SEL_SET = createAction("map/selection/set", resolve => {
    return (data: TileData) => resolve(data)
});

export const MAP_ROT_SET = createAction("map/rotation/set", resolve => {
    return (rotation: number) => resolve(rotation)
});