import React from 'react';
import {createRoot} from 'react-dom/client';
import L2 from '../components/about.jsx';
const rootElement = document.getElementById('about');
const root = createRoot(rootElement);
root.render(<L2/>)