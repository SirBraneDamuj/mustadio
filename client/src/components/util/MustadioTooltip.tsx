import { ReactElement } from 'react';
import { Tooltip } from '../ui';

type Placement = 'top' | 'bottom' | 'left' | 'right';

interface MustadioTooltipProps {
    side: Placement;
    content: string;
    children: ReactElement;
}

export default function MustadioTooltip({ side, content, children }: MustadioTooltipProps) {
    return (
        <Tooltip placement={side} content={content}>
            {children}
        </Tooltip>
    );
}
