import { useContext } from 'react';
import FftbgContext from '../contexts/FftbgContext';
import type { FftbgContextValue } from '../schemas';

export function useFftbgContext(): FftbgContextValue {
    const context = useContext(FftbgContext);
    if (context === null) {
        throw new Error('useFftbgContext must be used within an FftbgContext.Provider');
    }
    return context;
}
