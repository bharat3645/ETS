import React from 'react';
import {createRoot} from 'react-dom/client';
import SignUp from '../components/signup.jsx';
const rootElement = document.getElementById('form');
const root = createRoot(rootElement);
root.render(<SignUp/>)