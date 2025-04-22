import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App.jsx'
import { HashRouter } from 'react-router-dom';
import { UserProvider } from './components/userContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </HashRouter>
);
