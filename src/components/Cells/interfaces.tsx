export interface iCellOptions {
    onUpdate?: Function;
}

export interface iCell {
    columnId: string;
    value: any;
    type: string;
    opts?: iCellOptions;
};