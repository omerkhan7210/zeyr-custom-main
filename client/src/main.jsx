import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/css/index.css'
import "./assets/css/font-awesome.min.css"
import "./assets/css/bootstrap.css"
import "./assets/css/animate.css"
import "./assets/css/style.css";
import ErrorBoundary from './Components/ErrorBoundary.jsx/ErrorBoundary.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
