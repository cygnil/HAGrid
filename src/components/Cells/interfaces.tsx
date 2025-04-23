export interface iCell {
    dataId: number;
    columnId: string;
    value: any;
    type: string;
    editable?: boolean;
    opts?: object;
};