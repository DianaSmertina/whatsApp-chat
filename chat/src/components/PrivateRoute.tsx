import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { ChatPage } from '../pages/ChatPage/ChatPage';

export function PrivateRoute() {
  const idInstance = useSelector((state: RootState) => state.user.idInstance);

  return idInstance ? <ChatPage /> : <Navigate to="/" />;
}
