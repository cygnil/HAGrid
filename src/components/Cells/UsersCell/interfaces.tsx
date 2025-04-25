import {iCell} from '../interfaces';

export interface iUsersCell extends iCell {
    value: string[];
    opts?: {
        maxUsers?: number;
    }
}
