export interface iSimpleEditor {
    value: any;
    validate?: (value: any) => boolean;
    onUpdate: (value: any) => Promise<boolean>;
    onUpdateFinished: (success: boolean, value: any) => false | void;
}