import React, { useState } from 'react';

export function AppVersionView({appVersion="1.1.1", apiVersion="7.5.3"}) {
    return (
        <div className="text-center mt-2">
            <span className="text-muted">Version {appVersion}</span>
        </div>
    );
}