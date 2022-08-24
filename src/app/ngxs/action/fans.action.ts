import { Fan } from "../model/fans.model";

export class SetFans {
    static readonly type = 'Set fans';
    constructor(public payload : Fan[]) {}
}


