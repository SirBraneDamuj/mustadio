import { Fragment, ReactNode } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';

interface DropdownProps {
    trigger: ReactNode;
    children: ReactNode;
}

export function Dropdown({ trigger, children }: DropdownProps) {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="inline-flex items-center px-3 py-2 text-gray-700 hover:text-gray-900 focus:outline-none dark-theme:text-gray-200 dark-theme:hover:text-white">
                {trigger}
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </MenuButton>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <MenuItems className="absolute left-0 mt-2 w-48 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 dark-theme:bg-zinc-800 dark-theme:ring-gray-600">
                    <div className="py-1">
                        {children}
                    </div>
                </MenuItems>
            </Transition>
        </Menu>
    );
}

interface DropdownItemProps {
    href?: string;
    onClick?: () => void;
    children: ReactNode;
}

export function DropdownItem({ href, onClick, children }: DropdownItemProps) {
    const className = "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark-theme:text-gray-200 dark-theme:hover:bg-zinc-700 dark-theme:hover:text-white";

    if (href) {
        return (
            <MenuItem>
                <a href={href} className={className}>
                    {children}
                </a>
            </MenuItem>
        );
    }

    return (
        <MenuItem>
            <button onClick={onClick} className={className}>
                {children}
            </button>
        </MenuItem>
    );
}
