import React from 'react';
import * as pqtApi from '../api/pqtApi';

export default class Loading extends React.Component {

    render() {
        const isLoading = this.props.context.allInstruments.presets.length === 0;
        return (
            <>
                {isLoading && <Initializing />}
                {!isLoading && this.props.children}
            </>
        )
    }

    async componentDidMount() {
        const ctx = pqtApi.refreshCurrentContext(this.props.dispatch)
        console.log("[Loading] Init ctx", ctx);
    }
}

export function Initializing(props) {
    return (
        <header>Loading...</header>
    );
}