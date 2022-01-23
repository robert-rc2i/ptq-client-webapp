import React from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import * as pqtApi from '../api/pqtApi';
import { ApiHelper } from '../api/RestHelper';
import { versionIsSupported} from './util';

export default class Loading extends React.Component {

    render() {
        const ctx = this.props.context;

        const isError = ctx.error;
        const isLoading = !ctx || !ctx.allInstruments || ctx.allInstruments.presets.length === 0;
        return (
            <>
                {isLoading && <Initializing />}
                {isError && <ErrorMessage />}
                {!isLoading && this.props.children}
            </>
        )
    }

    async componentDidMount() {
        const ctx = pqtApi.refreshCurrentContext(this.props.dispatch)
        console.log("[Loading] Init ctx", ctx);
    }
}

export function ErrorMessage() {
    return (
        <Alert>
            <Alert.Heading>Network error</Alert.Heading>
            <p>Error occured while trying to communicate with Pianoteq.  Pls make sure Pianoteq is started with the <code>--serve ip.address.here:8081</code></p>
            <hr />
            <p>Please, make sure the provided Pianoteq url <i>{ApiHelper.apiBaseUrl}</i> is correct.</p>
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
export function RenderBasedOnApiVersion({ requiredVersion = "7.5.2", currentVersion = "1.0.0", children }) {

    if (versionIsSupported(requiredVersion, currentVersion)) {
        return children;
    }
    return (
        <>
            <p>This feature requires Pianoteq version {requiredVersion}, but the running instance of Pianoteq is version {currentVersion}</p>
            <p>You need to upgrade your Pianote instance to make use of this feature</p>
        </>
    );
}