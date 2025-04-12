export interface iUserEditor {
    value: string[];
    onUpdate: (value: string[]) => void;
    onUpdateFinished: () => void;
}
