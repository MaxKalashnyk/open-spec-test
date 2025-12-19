import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Dashboard } from './components/dashboard/Dashboard';
import { Contacts } from './pages/Contacts';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <nav className="border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-6">
              <Link to="/" className="text-lg font-semibold">
                Crypto Projects
              </Link>
              <div className="flex gap-4">
                <Link
                  to="/"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/contacts"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contacts
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
