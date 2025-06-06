import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// @ts-ignore
import App from './app/App.tsx'
import './index.css'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<App />
	</StrictMode>
)
