import {iCell} from '../interfaces';

export interface iNumberCell extends iCell {
    value: number;
    opts?: {
        min?: number;
        max?: number;
        visualize?: boolean;
    }
}
