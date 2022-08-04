export default function Link(props) {
    return (
        <a
            className={props.className}
            href={props.href} 
            target={props.self ? "_self" : "_blank"} 
            rel="noreferrer noopener"
        >
            {props.children}
        </a>
    );
} 