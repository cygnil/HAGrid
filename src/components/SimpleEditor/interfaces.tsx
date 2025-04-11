export interface iSimpleEditor {
    value: any;
    validate?: Function;
    onUpdate: Function;
    onUpdateFinished: Function;
}