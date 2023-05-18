import { Routes, Route } from 'react-router-dom';
import { WelcomePage } from './pages/WelcomePage/WelcomePage';
import { ChatPage } from './pages/ChatPage/ChatPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  );
}

export default App;
