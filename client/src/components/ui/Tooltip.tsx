import { ReactElement, cloneElement, useState } from 'react';

type Placement = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
    content: string;
    placement?: Placement;
    children: ReactElement;
}

export default function Tooltip({ content, placement = 'top', children }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);

    const placementClasses: Record<Placement, string> = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };

    return (
        <div className="relative inline-block">
            {cloneElement(children, {
                onMouseEnter: () => setIsVisible(true),
                onMouseLeave: () => setIsVisible(false),
            })}
            {isVisible && (
                <div
                    className={`absolute z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded shadow-lg whitespace-pre-wrap max-w-xl ${placementClasses[placement]}`}
                    role="tooltip"
                >
                    {content}
                </div>
            )}
        </div>
    );
}
