import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { EventsPage } from './pages/EventsPage';
import { EventDetailsPage } from './pages/EventDetailsPage';
import { CreateEventPage } from './pages/CreateEventPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/join" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:slug" element={<EventDetailsPage />} />
        <Route path="/admin/create-event" element={<CreateEventPage />} />
      </Routes>
    </Router>
  );
}

export default App;
