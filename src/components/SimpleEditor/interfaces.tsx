export interface iSimpleEditor {
    value: any;
    validate?: (value: any) => {isValid: boolean, message?: string};
    onUpdate: (value: any) => Promise<boolean>;
    onUpdateFinished: (success: boolean, value: any) => false | void;
}