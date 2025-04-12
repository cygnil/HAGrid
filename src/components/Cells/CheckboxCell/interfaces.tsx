import {iCell} from '../interfaces';

export interface iCheckboxCell extends iCell {
    value: boolean;
    opts?: {
        onUpdate?: (value: boolean) => void;
    }
}
