import {iCell} from '../interfaces';

export interface iUriCell extends iCell {
    value: string;
    opts?: {
        newTab?: boolean;
    }
}
