import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import MustadioRouter from './components/app/MustadioRouter';

const root = createRoot(document.getElementById('root'));
root.render(<MustadioRouter />);
