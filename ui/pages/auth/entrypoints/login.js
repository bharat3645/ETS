import React from 'react';
import {createRoot} from 'react-dom/client';
import Login from '../components/login.jsx';
try{
    const rootElement = document.getElementById('auth');
    const root = createRoot(rootElement);
    root.render(<Login/>)
}
catch(e){
}