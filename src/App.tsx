import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/join" element={<RegisterPage />} />
        <Route path="/login" element={<div>Login Page</div>} /> {/* Placeholder */}
      </Routes>
    </Router>
  );
}

export default App;
