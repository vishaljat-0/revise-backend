import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App/index.css'
import App from './App/App.jsx'
import { Provider } from 'react-redux'
import store from './App/App.store.js'

createRoot(document.getElementById('root')).render(
<Provider store={store}>
    <App/>
  </Provider>
)
