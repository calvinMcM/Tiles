import { createAction } from 'typesafe-actions';

import { ActorData } from '../../state/Definitions';

export const CHAR_SET = createAction(
    "char/set",
    (resolve) => {
        return (actor: ActorData) => resolve(actor);
    }
);

export const CHAR_REPLACE = createAction(
    "char/replaceall",
    (resolve) => {
        return (actors: ActorData[]) => resolve(actors);
    }
);
