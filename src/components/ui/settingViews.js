import React, { useState } from "react";
import { Button , FormControl, InputGroup } from "react-bootstrap";
import * as PtqApi from '../api/pqtApi';
import {ApiHelper} from '../api/RestHelper';

export const PianotteqUrlSettingController = ({onClose, dispatch}) => {
    const [ptqUrl = "", setPianoteqUrl] = useState(window.localStorage.getItem("ptqUrl"));
    return (
        <>
            <div><h6>Pianoteq full API address</h6></div>
            <InputGroup className="mb-3">
                <FormControl type="url"
                    placeholder="http://localhost:8081/jsonrpc"
                    aria-label="http://localhost:8081/jsonrpc"
                    aria-describedby="btn1"
                    value={ptqUrl ? ptqUrl : ""}
                    onChange={(e) => {
                        setPianoteqUrl(e.target.value);
                        e.preventDefault();
                    }}
                />
                <Button id="btn1" title="Validate" onClick={(e) => {e.preventDefault(); window.localStorage.setItem("ptqUrl", ptqUrl); ApiHelper.setApiBaseUrl(ptqUrl); PtqApi.refreshCurrentContext(dispatch); onClose();}}>
                    <i className="lead bi bi-arrow-right-circle"></i>
                </Button>
                <small className="text-muted">Make sure to click on the validate button to save any changes</small>
            </InputGroup>
        </>
    );
}