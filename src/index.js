import React from 'react';
import { createRoot } from 'react-dom/client';
// import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from '../client/App';
// import store from '../client/store/store';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);
