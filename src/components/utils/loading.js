import React from 'react';
import * as pqtApi from '../api/pqtApi';
import { factoryPresets } from '../domain/presets';

export default class Loading extends React.Component {

    render() {
        const isLoading = this.props.context.allInstruments.length > 0;

        return (
            <>
                {isLoading && <Initializing />}
                {!isLoading && this.props.children}
            </>
        )
    }

    async componentDidMount() {
        console.log("Loading...");
        const presets = await pqtApi.postCommand("getListOfPresets").then((response) => {
            return Promise.resolve(factoryPresets(response.result));
        }).catch((err) => {
            console.log("Error loading presets", err);
            return Promise.reject(err);
        });

        const ptqInfo = await pqtApi.postCommand("getInfo").then((response) => {
            return Promise.resolve(response.result[0]);
        }).catch((err) => {
            console.log("Error loading presets", err);
            return Promise.reject(err);
        });

        this.props.dispatch({type: "initContext", presets: presets, ptqInfo: ptqInfo});
    }
}

export function Initializing(props) {
    return (
        <header>Loading...</header>
    );
}