import React from 'react';

export function AppVersionView({appVersion="1.0.0", apiVersion="7.5.3"}) {
    return (
        <div className="text-center mt-2">
            <span className="text-muted">Version {appVersion}</span>
        </div>
    );
}