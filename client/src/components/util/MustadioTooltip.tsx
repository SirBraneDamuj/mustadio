import { ReactElement } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

type Placement = 'auto' | 'top' | 'bottom' | 'left' | 'right';

interface MustadioTooltipProps {
    side: Placement;
    content: string;
    children: ReactElement;
}

export default function MustadioTooltip({ side, content, children }: MustadioTooltipProps) {
    const tooltip = <Tooltip id={`tooltip-${content.slice(0, 20)}`}>{content}</Tooltip>;
    return (
        <OverlayTrigger
            placement={side}
            overlay={tooltip}
        >
            {children}
        </OverlayTrigger>
    );
}
