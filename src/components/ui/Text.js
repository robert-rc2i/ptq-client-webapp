import React from 'react';
import { A, setLinkProps } from 'hookrouter';
import { Nav, Alert, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

/**
 * Provides a convenient way to display link
 * 
 * @param {String} props.href is the url to link to
 * @param {boolean} props.clearHistory To clear the breadcrum history or not
 * @param {React.Component} children to display as a link
 */
export function NavLink({ href = "", disabled = false, children, ...others }) {
    return (<Nav.Link {...setLinkProps({ href, ...others })} disabled={disabled}>{children}</Nav.Link>);
}

/**
 * Display a standard text link to point to the provided href
 * @param {Object} props.href is the page to link to 
 */
export function Link({ href = "#", ...others }) {
    return (
        <span style={{ fontFamily: "Arial, sans-serif" }}>
            <A {...others} href={href} />
        </span>
    );
}

/**
 * Display a button link to point to the provided href
 * @param {Object} props.href is the page to link to 
 */
export function ButtonLink({ href = "#", variant = "primary", ...others }) {
    return (
        <Button variant={variant}>
            <A className="text-white" {...others} href={href} />
        </Button>
    );
}

/**
 * Display a button to execute a function on click
 * @param {Object} props.onClick is the function to execute on click event
 */
export function ButtonClick({ onClick = null, variant = "primary", translate = true, children, ...others }) {
    return (
        <Button {...others} variant={variant} onClick={onClick} >
            {translate && <TranslateLabel>{children}</TranslateLabel>}
            {!translate && children}
        </Button>
    );
}

/**
 * Render a cliakable element with a callback function on click
 * @param {function} onClick will be called when the user click on this element 
 * @param {function} children will be displayed as a clickable element
 */
export function Clickable({ onClick = null, title = "", children }) {
    if (onClick) {
        return (<a href="#top" title={title} onClick={onClick}>{children}</a>);
    }
    return "";
}

export function Lead(props) {
    return genericText("lead", props);
}

/**
 * Display an icon from the font awesome project.
 * @param {String} props.solid Set to true to use solid font (fas), otherwise false (far)
 * @param {String} props.iconName set the name of the font awesome icon to use
 * @param {String} props.children set the name of the font awesome icon to use, when not present as iconName
 */
export function FontAwesome(props) {
    const cName = `${props.className ? props.className : ""} ${props.solid ? "fas" : "far"} ${props.iconName ? props.iconName : props.children}`;

    return (<i className={cName}></i>);
}

export function genericText(cName, props) {
    const { className, children } = props;
    return (
        <span className={cName + ' ' + className}>{children}</span>
    );
}

/**
 * Translate the provided key usign the current lang
 * 
 * @param {String} props.keyId is the key to translate into the provided language above
 */
export function TranslateLabel(props) {
    const key = props.keyId ? props.keyId : props.children;
    return TranslateKey("labels", key);
}

/**
 * Translate the provided key using the current lang
 * 
 * @param {String} props.key is the key to translate into the provided language above
 */
export function TranslateMessage(props) {
    const key = props.keyId ? props.keyId : props.children;
    return TranslateKey("messages", key)
}

/**
 * Returns the translated key.  when key is not found, it returns the key surrounded by "-"
 * like the following: key = "myKey" -> "-myKey-"
 * @param {String} ns name space 
 * @param {String} key key to translate
 */
export function TranslateKey(ns, key) {
    const { t } = useTranslation();
    return t(`${ns}:${key}`, `-${key}-`);
}

export function AlertMessageView({ type = null, children }) {

    if (children) {
        if (type) {
            return (
                <Alert variant={type}>
                    <Alert.Heading><TranslateLabel>{type}</TranslateLabel></Alert.Heading>
                    <hr />
                    {children}
                </Alert>
            );
        }
    }

    return (<span />);
}