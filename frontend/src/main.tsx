import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { QueryClientProvider } from './react-query';
import { ThemeStateProvider } from './theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ThemeStateProvider>
			<QueryClientProvider>
				<App />
			</QueryClientProvider>
		</ThemeStateProvider>
	</React.StrictMode>,
);
