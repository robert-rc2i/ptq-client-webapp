import React from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import { ApiHelper } from '../api/RestHelper';
import { useInstrumentContext } from './instrumentContext';
import { versionIsSupported} from './util';

export function Loading({children}) {
    const [ctx] = useInstrumentContext();

        const isError =  ctx.error;
        const isLoading = !ctx || !ctx.allInstruments || ctx.allInstruments.presets.length === 0;

        if (isError) {
            return (<ErrorMessage/>);
        } else if (isLoading) {
            return (<Initializing />);
        }

        return children;
}

export function ErrorMessage() {
    return (
        <Alert variant='danger'>
            <Alert.Heading>Network error</Alert.Heading>
            <p>Error occured while trying to communicate with Pianoteq.  Pls make sure Pianoteq is started with the option <code>--serve ip.address.here:8081</code></p>
            <hr />
            <p>Please, make sure the provided Pianoteq url <i>{ApiHelper.apiBaseUrl}</i> is correct.  If not the right address, pls click on the menu button and change it.</p>
            <p>The expected format is: http://ip.address.here:8081/jsonrpc</p>
        </Alert>
    )
}

export function Initializing() {
    return (
        <div className="d-flex justify-content-center">
            <span>Loading... <Spinner animation="border" role="status" /></span>
        </div>
    );
}

/**
 * @returns the children components if the required version is met, otherwise a text message
 */
export function RenderBasedOnApiVersion({ requiredVersion = "7.5.2", currentVersion = "1.0.0", children, message=null}) {

    if (versionIsSupported(requiredVersion, currentVersion)) {
        return children ? children : null;
    }

    //Return the provided message if presetn
    if (message) {
        return message;
    }

    //Otherwise, return the default message
    return (
        <>
            <p>This feature requires Pianoteq version {requiredVersion}, but the running instance of Pianoteq is version {currentVersion}</p>
            <p>You need to upgrade your Pianote instance to make use of this feature</p>
        </>
    );
}

/**
 * 
 * @param {boolean} params.predicate true or false value 
 * @returns the children if the provided predicate is true, otherwise null
 */
export function RenderIfTrue({predicate = false, children}) {
    if (predicate) {
        return children;
    }

    return null;
}