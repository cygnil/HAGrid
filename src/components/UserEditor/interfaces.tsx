export interface iUserEditor {
    value: string[];
    onUpdate: (value: string[]) => Promise<boolean>;
    onUpdateFinished: (success: boolean, value: string[]) => false | void;
}
