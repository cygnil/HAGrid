import {iUriCell} from './interfaces';

// Render a URI as a link
export function UriCell(props: iUriCell) {
    // TODO: Add option for opening in a new tab
    return (
        <span className="uri-cell"><a href={props.value}>{props.value}</a></span>
    )
}
