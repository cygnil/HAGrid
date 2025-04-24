import {useState} from "react";
import {TextField} from "@mui/material";
import {iSimpleEditor} from "./interfaces";
import './index.css';

export function SimpleEditor(props: iSimpleEditor) {
    const {value, validate, onUpdate, onUpdateFinished} = props;
    const [inputValue, setInputValue] = useState(value);
    const [isValueValid, setIsValueValid] = useState(true);

    // Handle input change and update the state
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInputValue(newValue);
    };

    // Handle blur event and update if input is valid or no validator function is provided
    const handleBlur = async () => {
        if (!validate || validate(inputValue)) {
            const success = await onUpdate(inputValue);
            onUpdateFinished(success, inputValue);
        }
    };

    // Handle key up event for Enter and Escape keys, and validate the input value
    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (validate) {
            if (validate(inputValue)) {
                setIsValueValid(true);
            } else {
                setIsValueValid(false);
            }
        }
        if (event.key === "Enter") {
            handleBlur();
        }
        if (event.key === "Escape") {
            setInputValue(value); // Reset to original value on escape
            setIsValueValid(true);
            onUpdateFinished(false, null); // Signal that editing is finished without sending a new value
        }
    };

    return (
        <>
            <TextField
                className={`simple-editor ${isValueValid ? "" : "invalid"}`}
                size="small"
                error={!isValueValid}
                value={inputValue}
                onChange={handleChange}
                slotProps={{
                    htmlInput: {
                        onBlur: handleBlur,
                        onKeyUp: handleKeyUp
                    }
                }}
            />
        </>
    );
}
