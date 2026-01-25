import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default function MustadioTooltip({
    side,
    content,
    children,
}) {
    const tooltip = (<Tooltip>{content}</Tooltip>);
    return (
        <OverlayTrigger
            placement={side}
            overlay={tooltip}
        >
            {children}
        </OverlayTrigger>
    );
}