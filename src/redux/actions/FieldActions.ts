import { createAction } from 'typesafe-actions';

import { PositionInformation } from '../SessionState';

export const FIELD_SET = createAction("field/set", (resolve) => {
    return (data: PositionInformation) => resolve(data);
});
export const FIELD_REPLACE = createAction("field/replaceall", (resolve) => {
    return (data: PositionInformation[]) => resolve(data);
});
