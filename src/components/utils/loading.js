import React from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import * as pqtApi from '../api/pqtApi';
import { ApiHelper } from '../api/RestHelper';

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