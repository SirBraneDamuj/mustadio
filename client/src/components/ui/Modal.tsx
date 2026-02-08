import { Fragment, ReactNode } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';

interface ModalProps {
    show: boolean;
    onHide: () => void;
    title?: string;
    children: ReactNode;
    size?: 'sm' | 'md' | 'lg';
}

export default function Modal({ show, onHide, title, children, size = 'md' }: ModalProps) {
    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-2xl',
    };

    return (
        <Transition show={show} as={Fragment}>
            <Dialog onClose={onHide} className="relative z-50">
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                </TransitionChild>

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <DialogPanel className={`${sizeClasses[size]} w-full rounded-lg bg-white p-6 shadow-xl dark-theme:bg-zinc-800`}>
                            {title && (
                                <div className="flex items-center justify-between mb-4">
                                    <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
                                    <button
                                        onClick={onHide}
                                        className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                                    >
                                        &times;
                                    </button>
                                </div>
                            )}
                            {children}
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    );
}
