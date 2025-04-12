import {iAvatar} from "./interfaces";
import "./index.css";

//One of the most atomic components, an avatar image with alt for accessaibility
export function Avatar(props: iAvatar) {
    const style: {[key: string]: string} = {};
    if (props.bgColor) {
        style["backgroundColor"] = props.bgColor;
    }

    return (
        <img className="avatar" src={props.imageUri} alt={props.name} style={style} />
    )
}
