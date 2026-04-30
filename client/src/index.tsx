import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import MustadioRouter from './components/app/MustadioRouter';

const root = createRoot(document.getElementById('root'));
root.render(<MustadioRouter />);
