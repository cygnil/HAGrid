import {iUriCell} from './interfaces';

// Render a URI as a link
export function UriCell(props: iUriCell) {
  const {value, opts = {}} = props;

  return (
    <span className="uri-cell"><a href={value} {...(opts.newTab ? {target: "_blank", rel: "noopener noreferrer"} : {})}>{value}</a></span>
  )
}
