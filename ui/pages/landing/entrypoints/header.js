import React from 'react';
import {createRoot} from 'react-dom/client';
import Card from '../components/card.jsx';
const rootElement = document.getElementById('cards');
const root = createRoot(rootElement);
root.render(<Card/>)
