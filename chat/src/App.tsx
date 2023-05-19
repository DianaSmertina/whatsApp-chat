import { Routes, Route } from 'react-router-dom';
import { WelcomePage } from './pages/WelcomePage/WelcomePage';
import { PrivateRoute } from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/chat" element={<PrivateRoute />} />
    </Routes>
  );
}

export default App;
