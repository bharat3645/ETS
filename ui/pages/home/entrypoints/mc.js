import React from 'react';
import {createRoot} from 'react-dom/client';
import Cards from '../components/main.jsx';
const rootElement = document.getElementById('mc');
const root = createRoot(rootElement);
root.render(<Cards/>)