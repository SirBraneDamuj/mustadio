import { createContext } from 'react';
import type { FftbgContextValue } from '../schemas';

// Note: This default value is only used when a component doesn't have a Provider above it.
// In practice, App.tsx always provides a real value, so this is just for type satisfaction.
const FftbgContext = createContext<FftbgContextValue | null>(null);

export default FftbgContext;
