export default function Link(props) {
    return (
        <a href={props.href} target={props.self ? "_self" : "_blank"} rel="noreferrer noopener">
            {props.children}
        </a>
    );
} 