import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <React.StrictMode>
                    <App/>
                    <ReactQueryDevtools initialIsOpen={false} />
                </React.StrictMode>
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>
);
