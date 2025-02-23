import React from 'react';
import {createRoot} from 'react-dom/client';
import Ticket from '../components/ticket.jsx';
const rootElement = document.getElementById('ticket');
const root = createRoot(rootElement);
root.render(<Ticket/>)