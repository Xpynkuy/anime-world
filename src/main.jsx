import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './shared/styles/index.scss'
import 'react-loading-skeleton/dist/skeleton.css';

import App from './app/routes/App';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
)
